<template>
  <AppList
    :title="title"
    :title-singular="titleSingular"
    :path="path"
    :api-url="apiUrl"
    :api-delete-url="apiDeleteUrl"
    :columns="columns"
    :filter-name="filterName"
    :init-filters="initFilters"
    :table-actions="tableActions"
    :is-relation="true"
    :default-sort="defaultSort"
  />
</template>

<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters';

const props = defineProps<{
  title: string;
  titleSingular: string;
  path: string;
  apiUrl: string;
  apiDeleteUrl?: string;
  columns: Column[];
  filterKey?: string;
  filterName: string;
  initFilters: Filters<unknown>;
  tableActions?: TableAction[];
  defaultSort?: Sorting;
  isIdYearMonth?: boolean;
}>();

if (props.filterKey) {
  const filters = useFiltersStore();
  const route = useRoute();
  const { id } = route.params as { id: string };

  filters.initFilters(props.filterName, props.initFilters);

  if (props.isIdYearMonth) {
    const year = parseInt(id.substring(0, 4), 10);
    const month = parseInt(id.substring(4), 10) - 1; // Subtract 1 because months are 0-indexed in JS
    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
      throw new Error('Invalid date format');
    }

    filters.setFilterValue(props.filterName, props.filterKey, { year, month });
  }
  else {
    filters.setFilterValue(props.filterName, props.filterKey, [{ id: parseInt(id), name: '' }]);
  }
}
</script>
