<template>
  <div>
    <FilterInteger
      :label="categoryFiltersInit.id.label"
      :filter-key="categoryFiltersInit.id.key"
      :value="filters.getFilterValue<CategoryFilterFileds['id']>(categoryParentFilterName, categoryFiltersInit.id.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="categoryFiltersInit.name.label"
      :filter-key="categoryFiltersInit.name.key"
      :value="filters.getFilterValue<CategoryFilterFileds['name']>(categoryParentFilterName, categoryFiltersInit.name.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterInteger from '~/components/filters/FilterInteger.vue';
import FilterText from '~/components/filters/FilterText.vue';
import { categoryParentFilterName, categoryFiltersInit } from '~/components/pages/categories/CategoryInit';
import { useFiltersStore } from '~/stores/filters';

const filters = useFiltersStore();
filters.initFilters(categoryParentFilterName, categoryFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof CategoryFilters, value: InputValue) => {
  filters.addPreSavedFilter(categoryParentFilterName, key, value);
};
</script>
