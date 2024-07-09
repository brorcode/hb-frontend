<template>
  <AppList>
    <template #header
      ><div class="flex justify-between items-center">
        <div>Users</div>
        <div class="justify-end">
          <NuxtLink
            to="users/create"
            class="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add User
          </NuxtLink>
        </div>
      </div>
    </template>

    <template #filters>
      <FiltersAppFilter
        :init-filters="userFiltersInit"
        :filter-name="userFilterName"
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
        ><LazyUsersUserFilters
      /></FiltersAppFilter>
    </template>

    <AppTable
      :loading="pending"
      :columns="userColumns"
      :list-data="list?.data"
      @page-change="handlePageChange"
    />
  </AppList>
</template>

<script setup lang="ts">
import AppTable from '~/components/table/AppTable.vue';
import { userColumns, userFilterName, userFiltersInit } from '~/components/users/UserInit';
import { useNotificationsStore } from '~/stores/notifications';
import { useFiltersStore } from '~/stores/filters';
import AppList from '~/components/AppList.vue';

const notifications = useNotificationsStore();
const filters = useFiltersStore();

const list = ref<UserListResponse>();
const pending = ref(false);
const currentPage = ref(1);
const limit = ref(10);

// GET request
// const { pending, data } = await useAsyncData<UserListResponse>(() =>
//   $fetch('http://localhost:8081/api/v1/users/')
// );

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

const applyFilters = async () => {
  currentPage.value = 1;
  list.value = await fetchData();
};

const clearFilters = async () => {
  currentPage.value = 1;
  filters.clearFilter(userFilterName, userFiltersInit);
  list.value = await fetchData();
};
</script>
