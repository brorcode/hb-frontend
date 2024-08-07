import { useFiltersStore } from '~/stores/filters';
import { useNotificationsStore } from '~/stores/notifications';
import type { Ref } from 'vue';
import { useCookie } from '#app';
import { usePersistentState } from '~/composables/usePersistentState';
import { UNAUTHENTICATED_STATUSES } from '~/constants/statusCodes';

export const useApi = (url?: string) => {
  const config = useRuntimeConfig();
  const notifications = useNotificationsStore();
  const [, setUser] = usePersistentState<User>('user');
  const filters = useFiltersStore();
  const pending = ref(false);
  const items = ref<BaseItemsResponse<Row> | null>(null);
  const item = ref<BaseItemResponse<Row> | null>(null);
  const limit = ref(10);

  const apiFetch = async <T>(method: HttpMethod, endpoint: string, body?: Record<string, any>) => {
    pending.value = true;

    try {
      return await $fetch<T>(endpoint, {
        method,
        body: body,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value || ''
        },
        credentials: 'include',
        baseURL: config.public.apiUrl,
        onResponse: ({ response }) => {
          // if successful response
          if (response.status >= 200 && response.status < 300) {
            if (response._data?.message) {
              notifications.addNotification({
                type: 'success',
                message: response._data.message
              } as ApiNotification);
            }
          }
        },
        onResponseError: ({ response }) => {
          // todo if manually refresh page some flash page shows and next redirect
          // it should not show backend page at all without auth user
          if (UNAUTHENTICATED_STATUSES.has(response.status)) {
            setUser(null);
            navigateTo(config.public.loginUrl, { replace: true });
          }
        }
      });
    } catch (e) {
      const error = e as ApiResponseError;
      notifications.addNotification({
        message: error.response?._data.message
      } as ApiNotification);
      throw e;
    } finally {
      pending.value = false;
    }
  };

  const fetchListData = async (
    endpoint: string,
    currentPage: Ref<number>,
    filterName: string,
    sorting?: Sorting
  ) => {
    items.value = await apiFetch<BaseItemsResponse<Row>>('POST', endpoint, {
      page: currentPage.value,
      limit: limit.value,
      filters: filters.getFilters(filterName),
      sorting: sorting ?? {
        column: null,
        direction: null
      }
    });
  };

  const fetchItem = async (endpoint: string, id: number) => {
    item.value = await apiFetch<BaseItemResponse<Row>>('GET', `${endpoint}/${id}/edit`);
  };

  const handleDeleteItem = async (endpoint: string, id: number) => {
    await apiFetch('DELETE', `${endpoint}/${id}`);
  };

  // const handleCreateItem = async (endpoint: string, body: { [p: string]: any }) => {
  //   item.value = await apiFetch<BaseItemResponse<Row>>('POST', `${endpoint}/create`, body);
  //   notifications.addNotification(item.value?.notification);
  // };

  const handleUpdateItem = async (body: { [p: string]: any }, id: number) => {
    item.value = await apiFetch<BaseItemResponse<Row>>('POST', `${url}/${id}`, body);
    notifications.addNotification(item.value?.notification);
  };

  return {
    items,
    item,
    pending,
    fetchListData,
    fetchItem,
    // handleCreateItem,
    handleUpdateItem,
    handleDeleteItem,
    apiFetch
  };
};
