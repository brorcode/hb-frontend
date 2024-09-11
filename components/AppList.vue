<template>
  <div class="space-y-5">
    <AppCard v-if="!isRelation">
      <div class="flex justify-between items-center">
        <div>{{ title }}</div>
        <div class="flex justify-end">
          <TransactionImport />
        </div>
      </div>
    </AppCard>

    <AppCard v-if="filtersComponent">
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
        :loading="pending"
        :title="title"
        :title-singular="titleSingular"
        :columns="columns"
        :per-page="perPage"
        :list-data="items?.data ?? []"
        :meta="items?.meta"
        :table-actions="tableActions"
        :is-relation="isRelation"
        @page-change="handlePageChange"
        @per-page-change="handlePerPageChange"
        @delete-item="handleDelete"
        @apply-sorting="applySorting"
      />
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import AppTable from '~/components/table/AppTable.vue';
import { useApi } from '~/composables/useApi';
import AppFilter from '~/components/filters/AppFilter.vue';
import { defaultSorting } from '~/utils/constants';
import AppCard from '~/components/AppCard.vue';
import TransactionImport from '~/components/pages/transactions/TransactionImport.vue';

const props = defineProps<{
  title: string;
  titleSingular: string;
  path: string;
  apiUrl: string;
  columns: Column[];
  filterName: string;
  initFilters: Filters<unknown>;
  filtersComponent?: Component;
  tableActions?: TableAction[];
  isRelation?: boolean;
}>();

const config = useRuntimeConfig();
const filters = useFiltersStore();
const list = useListStore();
const currentPage = ref(1);
const perPage = ref(config.public.perPage);
const sorting = reactive<Sorting>(defaultSorting);
const { items, pending, fetchListData, handleDeleteItem } = useApi();

onMounted(() => {
  fetchListData(props.apiUrl, currentPage.value, perPage.value, props.filterName, defaultSorting);
});

watch(() => list.refresh, refresh => refresh && refreshList());

const refreshList = () => {
  fetchListData(props.apiUrl, currentPage.value, perPage.value, props.filterName, sorting);
};

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
  refreshList();
};

const handlePerPageChange = (newPerPage: number) => {
  perPage.value = newPerPage;
  refreshList();
};

const handleDelete = async (id: number) => {
  await handleDeleteItem(props.apiUrl, id);
};

const applyFilters = () => {
  currentPage.value = 1;
  refreshList();
};

const applySorting = (values: Sorting) => {
  currentPage.value = 1;
  sorting.column = values.column;
  sorting.direction = values.direction;
  refreshList();
};

const clearFilters = () => {
  currentPage.value = 1;
  filters.clearFilters(props.filterName, props.initFilters);
  refreshList();
};
</script>
