import { useFiltersStore } from '~/stores/filters';
import { useNotificationsStore } from '~/stores/notifications';
import type { Ref } from 'vue';

export const useApi = (url: string) => {
  const notifications = useNotificationsStore();
  const filters = useFiltersStore();
  const pending = ref(false);
  const items = ref<BaseItemsResponse<Row> | null>(null);
  const item = ref<BaseItemResponse<Row> | null>(null);
  const limit = ref(10);

  const fetchListData = async (currentPage: Ref<number>, filterName: string) => {
    pending.value = false;
    items.value = await $fetch<BaseItemsResponse<Row>>(url, {
      method: 'POST',
      body: {
        page: currentPage.value,
        limit: limit.value,
        filters: filters.getFilters(filterName)
      }
    })
      .catch((e) => {
        notifications.addNotification(item.value?.notification);
        return e.response?._data || null;
      })
      .finally(() => {
        pending.value = false;
      });
  };

  const fetchItem = async (id: number) => {
    pending.value = true;
    item.value = await $fetch<BaseItemResponse<Row>>(`${url}/${id}`, {
      method: 'GET'
    })
      .catch((e) => {
        notifications.addNotification(item.value?.notification);
        return e.response?._data || null;
      })
      .finally(() => {
        pending.value = false;
      });
  };

  const handleDeleteItem = async (id: number) => {
    pending.value = true;
    item.value = await $fetch<BaseItemResponse<Row>>(`${url}/${id}`, {
      method: 'DELETE'
    })
      .catch((e) => {
        return e.response?._data || null;
      })
      .finally(() => {
        pending.value = false;
      });

    notifications.addNotification(item.value?.notification);
  };

  const handleCreateItem = async (body: { [p: string]: any }) => {
    pending.value = true;
    item.value = await $fetch<BaseItemResponse<Row>>(`${url}/create`, {
      method: 'POST',
      body: body
    })
      .catch((e) => {
        return e.response?._data || null;
      })
      .finally(() => {
        pending.value = false;
      });

    notifications.addNotification(item.value?.notification);
  };

  const handleUpdateItem = async (body: { [p: string]: any }, id: number) => {
    pending.value = true;
    item.value = await $fetch<BaseItemResponse<Row>>(`${url}/${id}`, {
      method: 'POST',
      body: body
    })
      .catch((e) => {
        return e.response?._data || null;
      })
      .finally(() => {
        pending.value = false;
      });

    notifications.addNotification(item.value?.notification);
  };

  return {
    items,
    item,
    pending,
    fetchListData,
    fetchItem,
    handleCreateItem,
    handleUpdateItem,
    handleDeleteItem
  };
};
