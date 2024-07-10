import { useFiltersStore } from '~/stores/filters';
import { useNotificationsStore } from '~/stores/notifications';
import type { Ref } from 'vue';

export const useApi = (url: string, filterName: string) => {
  const notifications = useNotificationsStore();
  const filters = useFiltersStore();
  const pending = ref(false);
  const data = ref<BaseListResponse<Row> | null>(null);
  const limit = ref(10);

  const fetchListData = async (currentPage: Ref<number>) => {
    try {
      pending.value = true;
      data.value = await $fetch(url, {
        method: 'POST',
        body: {
          page: currentPage.value,
          limit: limit.value,
          filters: filters.getFilters(filterName)
        }
      });
    } catch (e) {
      notifications.addNotification(false, 'Error', 'Something went wrong');
    } finally {
      pending.value = false;
    }
  };

  const handleDeleteItem = async (id: number, currentPage: Ref<number>) => {
    try {
      pending.value = true;

      await $fetch(`${url}/${id}`, {
        method: 'DELETE'
      });

      notifications.addNotification(true, 'Success', 'User deleted successfully');
      await fetchListData(currentPage);
    } catch {
      notifications.addNotification(false, 'Error', 'Something went wrong');
    } finally {
      pending.value = false;
    }
  };

  return { data, pending, fetchListData, handleDeleteItem };
};
