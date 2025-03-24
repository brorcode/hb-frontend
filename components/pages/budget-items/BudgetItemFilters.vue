<template>
  <div>
    <FilterInteger
      :label="budgetItemFiltersInit.id.label"
      :filter-key="budgetItemFiltersInit.id.key"
      :value="filters.getFilterValue<BudgetItemFilterFields['id']>(budgetItemFilterName, budgetItemFiltersInit.id.key)"
      @update:model-value="handleUpdate(budgetItemFiltersInit.id.key, $event)"
    />
    <FilterMoney
      :label="budgetItemFiltersInit.amount.label"
      :filter-key="budgetItemFiltersInit.amount.key"
      :value="filters.getFilterValue<BudgetItemFilterFields['amount']>(budgetItemFilterName, budgetItemFiltersInit.amount.key)"
      @update:model-value="handleUpdate(budgetItemFiltersInit.amount.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryCategoriesParentApiUrl"
      :label="budgetItemFiltersInit.categories.label"
      :filter-key="budgetItemFiltersInit.categories.key"
      :value="filters.getFilterValue<BudgetItemFilterFields['categories']>(budgetItemFilterName, budgetItemFiltersInit.categories.key)"
      @update:model-value="handleUpdate(budgetItemFiltersInit.categories.key, $event)"
    />
    <FilterDate
      :label="budgetItemFiltersInit.period_on.label"
      :filter-key="budgetItemFiltersInit.period_on.key"
      :value="filters.getFilterValue<BudgetItemFilterFields['period_on']>(budgetItemFilterName, budgetItemFiltersInit.period_on.key)"
      :month-picker="true"
      @update:model-value="handleUpdate(budgetItemFiltersInit.period_on.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterDate from '~/components/filters/FilterDate.vue';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import FilterMoney from '~/components/filters/FilterMoney.vue';
import FilterMultiSelect from '~/components/filters/FilterMultiSelect.vue';
import { budgetItemFilterName, budgetItemFiltersInit } from '~/components/pages/budget-items/BudgetItemInit';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';

const filters = useFiltersStore();
filters.initFilters(budgetItemFilterName, budgetItemFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof BudgetItemFilters, value: InputValue) => {
  filters.addPreSavedFilter(budgetItemFilterName, key, value);
};
</script>
