<template>
  <AppList
    :title="title"
    :title-singular="titleSingular"
    :path="path"
    :api-url="apiUrl"
    :columns="columns"
    :filter-name="filterName"
    :init-filters="initFilters"
    :is-relation="true"
  />
</template>

<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters';

const props = defineProps<{
  title: string;
  titleSingular: string;
  path: string;
  apiUrl: string;
  columns: Column[];
  filterKey: string;
  filterName: string;
  initFilters: Filters<unknown>;
}>();

const filters = useFiltersStore();
const route = useRoute();
const { id } = route.params as { id: string };

filters.initFilters(props.filterName, props.initFilters);
filters.setFilterValue(props.filterName, props.filterKey, [{ id: parseInt(id), name: '' }]);
</script>
