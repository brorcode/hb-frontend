<template>
  <div class="space-y-5">
    <AppCard>
      <div class="flex justify-between items-center">
        <div>{{ title }}</div>
        <div class="flex justify-end">
          <NuxtLink
            class="rounded bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Import Transactions TODO
          </NuxtLink>
        </div>
      </div>
    </AppCard>

    <AppCard>
      <AppFilter
        :init-filters="initFilters"
        :filter-name="filterName"
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
      >
        <component :is="filtersComponent" />
      </AppFilter>
    </AppCard>

    <AppCard>
      <AppTable
        :path="path"
        :title-singular="titleSingular"
        :loading="pending"
        :columns="columns"
        :per-page="perPage"
        :list-data="items?.data"
        :meta="items?.meta"
        :table-actions="tableActions"
        @page-change="handlePageChange"
        @per-page-change="handlePerPageChange"
        @delete-item="handleDelete"
        @apply-sorting="applySorting"
      />
    </AppCard>
  </div>
</template>
<script setup lang="ts">
import AppTable from '~/components/table/AppTable.vue';
import { useFiltersStore } from '~/stores/filters';
import { useApi } from '~/composables/useApi';
import type { Component } from 'vue';
import AppFilter from '~/components/filters/AppFilter.vue';
import { defaultSorting } from '~/utils/constants';

const props = defineProps<{
  title: string;
  titleSingular: string;
  path: string;
  apiUrl: string;
  columns: Column[];
  filterName: string;
  initFilters: Filters;
  filtersComponent: Component;
  tableActions?: TableAction[];
}>();

const filters = useFiltersStore();
const currentPage = ref(1);
const perPage = ref(10);
const { items, pending, fetchListData, handleDeleteItem } = useApi();

onMounted(() => {
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName, defaultSorting);
});

const handlePageChange = (newPage: number, sorting: Sorting) => {
  currentPage.value = newPage;
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName, sorting);
};

const handlePerPageChange = (newPerPage: number) => {
  perPage.value = newPerPage;
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName, defaultSorting);
};

const handleDelete = async (id: number) => {
  try {
    await handleDeleteItem(props.apiUrl, id);
    await fetchListData(props.apiUrl, currentPage, perPage, props.filterName);
  } catch (err) {
    // TODO: handle error
    console.log(err);
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName);
};

const applySorting = (sorting: Sorting) => {
  currentPage.value = 1;
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName, sorting);
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilters(props.filterName, props.initFilters);
  fetchListData(props.apiUrl, currentPage, perPage, props.filterName, defaultSorting);
};
</script>
