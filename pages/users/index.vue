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
        ><LazyPagesUsersUserFilters
      /></FiltersAppFilter>
    </template>

    <AppTable
      url="/users"
      :loading="pending"
      :columns="userColumns"
      :list-data="items?.data"
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
} from '~/components/pages/users/UserInit';
import { useFiltersStore } from '~/stores/filters';
import AppList from '~/components/AppList.vue';
import { useApi } from '~/composables/useApi';

const filters = useFiltersStore();
const currentPage = ref(1);
const { items, pending, fetchListData, handleDeleteItem } = useApi(userApiUrl);

onMounted(() => {
  fetchListData(currentPage, userFilterName);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchListData(currentPage, userFilterName);
};

const handleDelete = async (id: number) => {
  //todo if handleDeleteItem is not successful we don't need to call fetchListData
  try {
    await handleDeleteItem(id);
    await fetchListData(currentPage, userFilterName);
  } catch (err) {
    // TODO: handle error
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchListData(currentPage, userFilterName);
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilter(userFilterName, userFiltersInit);
  fetchListData(currentPage, userFilterName);
};
</script>
