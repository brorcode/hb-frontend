<template>
  <AppPage>
    <template #header>Users Page</template>

    <FiltersAppFilter @filter-data="handleFilters"><LazyUsersUserFilters /></FiltersAppFilter>

    <AppTable
      :loading="pending"
      :columns="userColumns"
      :list-data="list?.data"
      @page-change="handlePageChange"
    />
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '~/components/AppPage.vue';
import AppTable from '~/components/table/AppTable.vue';
import { userColumns, userFilterName } from '~/components/users/UserInit';
import { useNotificationsStore } from '~/stores/notifications';
import { useFiltersStore } from '~/stores/filters';

const notifications = useNotificationsStore();
const filters = useFiltersStore();

const list = ref<UserListResponse>();
const pending = ref(false);
const currentPage = ref(1);
const limit = ref(2);

// GET request
// const { pending, data } = await useAsyncData<UserListResponse>(() =>
//   $fetch('http://localhost:8081/api/v1/users/')
// );

// const data = await $fetch<UserListResponse>('http://localhost:8081/api/v1/users/', {
//   method: 'POST',
//   body: {
//     page: 1,
//     limit: 10
//   }
// }).finally(() => (pending.value = false));

const fetchData = async () => {
  pending.value = true;

  return await $fetch<UserListResponse>('http://localhost:8081/api/v1/users/', {
    method: 'POST',
    body: {
      page: currentPage.value,
      limit: limit.value,
      filters: filters.getFilters(userFilterName)
    }
  })
    .catch(() => {
      notifications.addNotification(false, 'Error', 'Something went wrong');

      return {};
    })
    .finally(() => {
      pending.value = false;
    });
};

onMounted(async () => {
  list.value = await fetchData();
});

const handlePageChange = async (newPage: number) => {
  currentPage.value = newPage;
  list.value = await fetchData();
};

const handleFilters = async () => {
  currentPage.value = 1;
  list.value = await fetchData();
};
</script>
