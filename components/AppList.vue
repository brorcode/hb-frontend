<template>
  <div class="space-y-5">
    <AppCard>
      <div class="flex justify-between items-center">
        <div>{{ title }}</div>
        <div class="justify-end">
          <NuxtLink
            :to="`${url}/create`"
            class="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add {{ titleSingular }}
          </NuxtLink>
        </div>
      </div>
    </AppCard>

    <AppCard>
      <FiltersAppFilter
        :init-filters="initFilters"
        :filter-name="filterName"
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
      >
        <slot name="filters"></slot>
      </FiltersAppFilter>
    </AppCard>

    <AppCard>
      <AppTable
        :url="url"
        :loading="pending"
        :columns="columns"
        :list-data="items?.data"
        :meta="items?.meta"
        @page-change="handlePageChange"
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

const props = defineProps<{
  title: string;
  titleSingular: string;
  url: string;
  apiUrl: string;
  columns: Column[];
  filterName: string;
  initFilters: Filters;
}>();

const filters = useFiltersStore();
const currentPage = ref(1);
const { items, pending, fetchListData, handleDeleteItem } = useApi();

onMounted(() => {
  fetchListData(props.apiUrl, currentPage, props.filterName);
});

const handlePageChange = (newPage: number, sorting: Sorting) => {
  currentPage.value = newPage;
  fetchListData(props.apiUrl, currentPage, props.filterName, sorting);
};

const handleDelete = async (id: number) => {
  try {
    await handleDeleteItem(props.apiUrl, id);
    await fetchListData(props.apiUrl, currentPage, props.filterName);
  } catch (err) {
    // TODO: handle error
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchListData(props.apiUrl, currentPage, props.filterName);
};

const applySorting = (sorting: Sorting) => {
  currentPage.value = 1;
  fetchListData(props.apiUrl, currentPage, props.filterName, sorting);
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilter(props.filterName, props.initFilters);
  fetchListData(props.apiUrl, currentPage, props.filterName);
};
</script>
