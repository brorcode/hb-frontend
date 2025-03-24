<template>
  <div>
    <FilterDate
      :label="budgetFiltersInit.period_on.label"
      :filter-key="budgetFiltersInit.period_on.key"
      :value="filters.getFilterValue<BudgetFilterFields['period_on']>(budgetFilterName, budgetFiltersInit.period_on.key)"
      :month-picker="true"
      @update:model-value="handleUpdate(budgetFiltersInit.period_on.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterDate from '~/components/filters/FilterDate.vue';
import { budgetFilterName, budgetFiltersInit } from '~/components/pages/budgets/BudgetInit';

const filters = useFiltersStore();
filters.initFilters(budgetFilterName, budgetFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof BudgetFilters, value: InputValue) => {
  filters.addPreSavedFilter(budgetFilterName, key, value);
};
</script>
