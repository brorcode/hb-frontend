<template>
  <div>
    <FilterInteger
      :label="categoryFiltersInit.id.label"
      :filter-key="categoryFiltersInit.id.key"
      :value="filters.getFilterValue<CategoryFilterFileds['id']>(categoryChildFilterName, categoryFiltersInit.id.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="categoryFiltersInit.name.label"
      :filter-key="categoryFiltersInit.name.key"
      :value="filters.getFilterValue<CategoryFilterFileds['name']>(categoryChildFilterName, categoryFiltersInit.name.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.name.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryCategoriesParentApiUrl"
      :label="categoryFiltersInit.parent_categories.label"
      :filter-key="categoryFiltersInit.parent_categories.key"
      :value="filters.getFilterValue<CategoryFilterFileds['parent_categories']>(categoryChildFilterName, categoryFiltersInit.parent_categories.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.parent_categories.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { categoryChildFilterName, categoryFiltersInit } from '~/components/pages/categories/CategoryInit';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';
import FilterMultiSelect from '~/components/filters/FilterMultiSelect.vue';

const filters = useFiltersStore();
filters.initFilters(categoryChildFilterName, categoryFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof CategoryFilters, value: InputValue) => {
  filters.addPreSavedFilter(categoryChildFilterName, key, value);
};
</script>
