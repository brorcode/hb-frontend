import { useFiltersStore } from '~/stores/filters';
import { useNotificationsStore } from '~/stores/notifications';
import { useCookie } from '#app';
import { usePersistentState } from '~/composables/usePersistentState';
import { UNAUTHENTICATED_STATUSES } from '~/constants/statusCodes';

type ListDataRequestBody = {
  page: number;
  limit: number;
  sorting?: Sorting;
  filters?: { [p: string]: Filter<Record<string, InputValue>, string> };
};

export const useApi = () => {
  const config = useRuntimeConfig();
  const notifications = useNotificationsStore();
  const list = useListStore();
  const [, setUser] = usePersistentState<User>('user');
  const filters = useFiltersStore();
  const pending = ref(false);
  const items = ref<BaseItemsResponse<Row> | null>(null);
  const item = ref<BaseItemResponse<Row> | null>(null);

  const apiFetch = async <T>(method: HttpMethod, endpoint: string, body?: Record<string, unknown>) => {
    pending.value = true;

    try {
      return await $fetch<T>(endpoint, {
        method,
        body: body,
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value || '',
        },
        credentials: 'include',
        baseURL: config.public.apiUrl,
        onResponse: ({ response }) => {
          // if successful response
          if (response.status >= 200 && response.status < 300) {
            if (response._data?.message) {
              notifications.addNotification({
                type: 'success',
                message: response._data.message,
              } as ApiNotification);
            }
          }
        },
        onResponseError: ({ response }) => {
          // todo if manually refresh page some flash page shows and next redirect
          // it should not show backend page at all without auth user
          if (UNAUTHENTICATED_STATUSES.has(response.status)) {
            setUser(null);
            navigateTo(config.public.apiLoginUrl, { replace: true });
          }
        },
      });
    }
    catch (e) {
      const error = e as ApiResponseError;
      notifications.addNotification({
        message: error.response?._data.message,
      } as ApiNotification);
      throw e;
    }
    finally {
      pending.value = false;
    }
  };

  const fetchListData = async (
    endpoint: string,
    currentPage: number,
    perPage: number,
    filterName: string,
    sorting?: Sorting,
  ) => {
    const body: ListDataRequestBody = {
      page: currentPage,
      limit: perPage,
    };

    if (sorting && sorting.column && sorting.direction) {
      body.sorting = sorting;
    }

    const filtersData = filters.getFilters(filterName);
    if (filtersData) {
      body.filters = filtersData;
    }

    items.value = await apiFetch<BaseItemsResponse<Row>>('POST', endpoint, body).finally(() => {
      list.needResetSelectedRows(true);
      list.needRefresh(false);
    });
  };

  const fetchData = async (endpoint: string, body: Record<string, unknown>) => {
    items.value = await apiFetch<BaseItemsResponse<Row>>('POST', endpoint, body);
  };

  const handleDeleteItem = async (endpoint: string, id: number) => {
    await apiFetch('DELETE', `${endpoint}/${id}`);
  };

  const handleListAction = async (endpoint: string, body: Record<string, unknown>) => {
    try {
      return await apiFetch('POST', endpoint, body);
    }
    catch (e) {
      return e;
    }
  };

  return {
    items,
    item,
    pending,
    fetchListData,
    fetchData,
    handleDeleteItem,
    apiFetch,
    handleListAction,
  };
};
