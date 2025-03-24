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
        :sum="items?.sum"
        :table-actions="tableActions"
        :default-sort="defaultSort"
        :editable="editable"
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
import AppCard from '~/components/AppCard.vue';
import AppFilter from '~/components/filters/AppFilter.vue';
import TransactionImport from '~/components/pages/transactions/TransactionImport.vue';
import AppTable from '~/components/table/AppTable.vue';
import { useApi } from '~/composables/useApi';
import { useResourceRelation } from '~/composables/useResourceRelation';
import { defaultSorting } from '~/utils/constants';

const props = withDefaults(defineProps<{
  title: string;
  titleSingular: string;
  path: string;
  apiUrl: string;
  apiDeleteUrl?: string;
  columns: Column[];
  filterName: string;
  initFilters: Filters<unknown>;
  filtersComponent?: Component;
  tableActions?: TableAction[];
  isRelation?: boolean;
  defaultSort?: Sorting;
  editable?: boolean;
}>(), {
  editable: true,
});

const config = useRuntimeConfig();
const filters = useFiltersStore();
const list = useListStore();
const currentPage = ref(1);
const perPage = ref(config.public.perPage);
const sorting = reactive<Sorting>(props.defaultSort ?? deepCopy(defaultSorting) as Sorting);
const { items, pending, fetchListData, handleDeleteItem } = useApi();
const { clearRelation } = useResourceRelation(null);

onMounted(() => {
  fetchListData(props.apiUrl, currentPage.value, perPage.value, props.filterName, props.defaultSort ?? defaultSorting);

  // when component is being mounted it needs to clear relation if current list is not a relation
  if (!props.isRelation) {
    clearRelation();
  }
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
  await handleDeleteItem(props.apiDeleteUrl ?? props.apiUrl, id);
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
