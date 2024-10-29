import type { FetchResponse } from 'ofetch';
import { useCookie } from '#app';
import { usePersistentState } from '~/composables/usePersistentState';
import { UNAUTHENTICATED_STATUSES } from '~/constants/statusCodes';
import { useFiltersStore } from '~/stores/filters';
import { useFlashMessagesStore } from '~/stores/flashMessages';

type ListDataRequestBody = {
  page: number;
  limit: number;
  sorting?: Sorting;
  filters?: { [p: string]: Filter<Record<string, InputValue>, string> };
};

export const useApi = () => {
  const config = useRuntimeConfig();
  const flashMessages = useFlashMessagesStore();
  const list = useListStore();
  const [, setUser] = usePersistentState<User>('user');
  const filters = useFiltersStore();
  const pending = ref(false);
  const items = ref<BaseItemsResponse<Row> | null>(null);
  const item = ref<BaseItemResponse<Row> | null>(null);

  const apiFetch = async <T>(method: HttpMethod, endpoint: string, body?: Record<string, unknown> | FormData) => {
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
        onResponse: ({ response }: { response: FetchResponse<BaseResponse> }) => {
          // if successful response
          if (response.status >= 200 && response.status < 300) {
            if (response._data?.message) {
              flashMessages.addMessage({
                type: 'success',
                message: response._data.message,
              });
            }
          }
        },
        onResponseError: ({ response }: { response: FetchResponse<BaseResponse> }) => {
          flashMessages.addMessage({
            message: response._data?.message,
          });

          if (UNAUTHENTICATED_STATUSES.has(response.status)) {
            setUser(null);
            navigateTo(config.public.loginUrl, { replace: true });
          }

          // @todo if not found???
          // if (response.status === NOT_FOUND_STATUS) {
          // showError({
          //   statusCode: 404,
          //   statusMessage: 'Page Not Found',
          // });
          // }
        },
      });
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

    try {
      items.value = await apiFetch<BaseItemsResponse<Row>>('POST', endpoint, body).finally(() => {
        list.needResetSelectedRows(true);
        list.needRefresh(false);
      });
    }
    catch (e) {
      return e;
    }
  };

  const fetchData = async (endpoint: string, body: Record<string, unknown>) => {
    try {
      items.value = await apiFetch<BaseItemsResponse<Row>>('POST', endpoint, body);
    }
    catch (e) {
      return e;
    }
  };

  const getData = async (endpoint: string, method: HttpMethod = 'GET', body?: Record<string, unknown>) => {
    try {
      return await apiFetch<BaseItemResponse<Row>>(method, endpoint, body)
        .then(({ data }) => data);
    }
    catch (e) {
      return e;
    }
  };

  const handleDeleteItem = async (endpoint: string, id: number) => {
    try {
      await apiFetch('DELETE', `${endpoint}/${id}`);
      list.needRefresh(true);
    }
    catch (e) {
      return e;
    }
  };

  const handleListAction = async (endpoint: string, body: Record<string, unknown>, method: HttpMethod = 'POST') => {
    try {
      return await apiFetch(method, endpoint, body);
    }
    catch (e) {
      return e;
    }
  };

  const handleRowsImport = async (endpoint: string, body: FormData, method: HttpMethod = 'POST') => {
    try {
      return await apiFetch(method, endpoint, body);
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
    handleRowsImport,
    getData,
  };
};
