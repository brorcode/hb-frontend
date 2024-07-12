import { useFiltersStore } from '~/stores/filters';
import { useNotificationsStore } from '~/stores/notifications';
import type { Ref } from 'vue';

export const useApi = (url: string) => {
  const notifications = useNotificationsStore();
  const filters = useFiltersStore();
  const pending = ref(false);
  const items = ref<BaseListResponse<Row> | null>(null);
  const item = ref<BaseGetResponse<Row> | null>(null);
  const limit = ref(10);

  const fetchListData = async (currentPage: Ref<number>, filterName: string) => {
    try {
      pending.value = true;
      items.value = await $fetch(url, {
        method: 'POST',
        body: {
          page: currentPage.value,
          limit: limit.value,
          filters: filters.getFilters(filterName)
        }
      });
    } catch {
      notifications.addNotification(false, 'Error', 'Something went wrong');
    } finally {
      pending.value = false;
    }
  };

  const fetchItem = async (id: number) => {
    try {
      pending.value = true;
      item.value = await $fetch<BaseGetResponse<Row>>(`${url}/${id}`, {
        method: 'GET'
      });
    } catch {
      notifications.addNotification(false, 'Error', 'Something went wrong');
    } finally {
      pending.value = false;
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      pending.value = true;
      await $fetch(`${url}/${id}`, {
        method: 'DELETE'
      });

      notifications.addNotification(true, 'Success', 'User deleted successfully');
    } catch {
      notifications.addNotification(false, 'Error', 'Something went wrong');
    } finally {
      pending.value = false;
    }
  };

  // todo it needs to remove from here form manipulations
  // todo don't need to do redirect here it should in component level
  const handleCreateItem = async (form: Form, action: string, redirectTo?: string) => {
    try {
      pending.value = true;

      Object.entries(form).forEach(([key]) => {
        form[key].errors = [];
      });

      const body = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.value])
      );

      await $fetch(`${url}/${action}`, {
        method: 'POST',
        body: body
      });

      notifications.addNotification(true, 'Success', 'Item created successfully');
      if (redirectTo) {
        navigateTo(redirectTo);
      }
    } catch (e: any) {
      let message = 'Something went wrong';
      if (e.response.status === 422) {
        // add validation errors
        Object.entries(e.response._data.error.details).forEach(([key, value]) => {
          form[key].errors = value as string[];
        });
        message = 'Validation error';
      }

      notifications.addNotification(false, 'Error', message);
    } finally {
      pending.value = false;
    }
  };

  const handleUpdateItem = async (form: Form, id: number) => {
    try {
      pending.value = false;

      // clear validation errors
      Object.entries(form).forEach(([key]) => {
        form[key as keyof CategoryForm].errors = [];
      });

      const body = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.value])
      );

      await $fetch(`${url}/${id}`, {
        method: 'POST',
        body: body
      });

      notifications.addNotification(true, 'Success', 'Item updated successfully');
    } catch (e: any) {
      let message = 'Something went wrong';
      if (e.response.status === 422) {
        // add validation errors
        Object.entries(e.response._data.error.details).forEach(([key, value]) => {
          form[key].errors = value as string[];
        });
        message = 'Validation error';
      }

      notifications.addNotification(false, 'Error', message);
    } finally {
      pending.value = false;
    }
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
