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
      :list-data="data?.data"
      @page-change="handlePageChange"
      @delete-item="handleDelete"
    />
  </AppList>
</template>

<script setup lang="ts">
import AppTable from '~/components/table/AppTable.vue';
import {
  userApiUrl,
  userColumns,
  userFilterName,
  userFiltersInit
} from '~/components/users/UserInit';
import { useFiltersStore } from '~/stores/filters';
import AppList from '~/components/AppList.vue';
import { useApi } from '~/composables/useApi';

const filters = useFiltersStore();
const currentPage = ref(1);
const { data, pending, fetchListData, handleDeleteItem } = useApi(userApiUrl, userFilterName);

onMounted(() => {
  fetchListData(currentPage);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchListData(currentPage);
};

const handleDelete = (id: number) => {
  handleDeleteItem(id, currentPage);
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchListData(currentPage);
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilter(userFilterName, userFiltersInit);
  fetchListData(currentPage);
};
</script>
