<template>
  <div>
    <FilterInteger
      :label="categoryFiltersInit.id.label"
      :filter-key="categoryFiltersInit.id.key"
      :value="filters.getFilterValue(categoryChildFilterName, categoryFiltersInit.id.key) as typeof categoryFiltersInit.name.value"
      @update:model-value="handleUpdate(categoryFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="categoryFiltersInit.name.label"
      :filter-key="categoryFiltersInit.name.key"
      :value="filters.getFilterValue(categoryChildFilterName, categoryFiltersInit.name.key) as typeof categoryFiltersInit.name.value"
      @update:model-value="handleUpdate(categoryFiltersInit.name.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryCategoriesParentApiUrl"
      :label="categoryFiltersInit.parent_categories.label"
      :filter-key="categoryFiltersInit.parent_categories.key"
      :value="filters.getFilterValue(transactionFilterName, categoryFiltersInit.parent_categories.key) as typeof categoryFiltersInit.parent_categories.value"
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
import { transactionFilterName } from '~/components/pages/transactions/TransactionInit';
import FilterMultiselectSelect from '~/components/filters/FilterMultiselectSelect.vue';

const filters = useFiltersStore();
filters.initFilters(categoryChildFilterName, categoryFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof CategoryFilters, value: InputValue) => {
  filters.addPreSavedFilter(categoryChildFilterName, key, value);
};
</script>
