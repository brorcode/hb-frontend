<template>
  <div>
    <FilterInteger
      :label="loanFiltersInit.id.label"
      :filter-key="loanFiltersInit.id.key"
      :value="filters.getFilterValue(loanFilterName, loanFiltersInit.id.key) as typeof loanFiltersInit.id.value"
      @update:model-value="handleUpdate(loanFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="loanFiltersInit.name.label"
      :filter-key="loanFiltersInit.name.key"
      :value="filters.getFilterValue(loanFilterName, loanFiltersInit.name.key) as typeof loanFiltersInit.name.value"
      @update:model-value="handleUpdate(loanFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { loanFilterName, loanFiltersInit } from '~/components/pages/loans/LoanInit';

const filters = useFiltersStore();
filters.initFilters(loanFilterName, loanFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof LoanFilters, value: InputValue) => {
  filters.addPreSavedFilter(loanFilterName, key, value);
};
</script>
