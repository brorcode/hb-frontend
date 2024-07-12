<template>
  <AppList>
    <template #header
      ><div class="flex justify-between items-center">
        <div>Categories</div>
        <div class="justify-end">
          <NuxtLink
            to="categories/create"
            class="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Category
          </NuxtLink>
        </div>
      </div>
    </template>

    <template #filters>
      <FiltersAppFilter
        :init-filters="categoryFiltersInit"
        :filter-name="categoryFilterName"
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
        ><LazyPagesCategoriesCategoryFilters
      /></FiltersAppFilter>
    </template>

    <AppTable
      url="/categories"
      :loading="pending"
      :columns="categoryColumns"
      :list-data="items?.data"
      @page-change="handlePageChange"
      @delete-item="handleDelete"
    />
  </AppList>
</template>

<script setup lang="ts">
import AppTable from '~/components/table/AppTable.vue';
import { useFiltersStore } from '~/stores/filters';
import AppList from '~/components/AppList.vue';
import { useApi } from '~/composables/useApi';
import {
  categoryApiUrl,
  categoryColumns,
  categoryFilterName,
  categoryFiltersInit
} from '~/components/pages/categories/CategoryInit';

const filters = useFiltersStore();
const currentPage = ref(1);
const { items, pending, fetchListData, handleDeleteItem } = useApi(categoryApiUrl);

onMounted(() => {
  fetchListData(currentPage, categoryFilterName);
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchListData(currentPage, categoryFilterName);
};

const handleDelete = async (id: number) => {
  await handleDeleteItem(id);
  await fetchListData(currentPage, categoryFilterName);
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchListData(currentPage, categoryFilterName);
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilter(categoryFilterName, categoryFiltersInit);
  fetchListData(currentPage, categoryFilterName);
};
</script>
