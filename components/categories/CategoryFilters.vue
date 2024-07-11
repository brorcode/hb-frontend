<template>
  <FilterInteger
    :filter="categoryFiltersInit.id"
    :value="filters.getFilterValue(categoryFilterName, categoryFiltersInit.id.key)"
    @update:model-value="handleUpdate(categoryFiltersInit.id.key, $event)"
  />
  <FilterText
    :filter="categoryFiltersInit.name"
    :value="filters.getFilterValue(categoryFilterName, categoryFiltersInit.name.key)"
    @update:model-value="handleUpdate(categoryFiltersInit.name.key, $event)"
  />
  <FilterTextarea
    :filter="categoryFiltersInit.description"
    :value="filters.getFilterValue(categoryFilterName, categoryFiltersInit.description.key)"
    @update:model-value="handleUpdate(categoryFiltersInit.description.key, $event)"
  />
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { categoryFilterName, categoryFiltersInit } from '~/components/categories/CategoryInit';
import FilterTextarea from '~/components/filters/FilterTextarea.vue';

const filters = useFiltersStore();
filters.initFilters(categoryFilterName, categoryFiltersInit);

const handleUpdate = (key: keyof CategoryFilters, value: string) => {
  filters.addPreSavedFilter(categoryFilterName, key, value);
};
</script>
