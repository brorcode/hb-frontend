<template>
  <div>
    <FilterInteger
      :label="budgetTemplateFiltersInit.id.label"
      :filter-key="budgetTemplateFiltersInit.id.key"
      :value="filters.getFilterValue<BudgetTemplateFilterFields['id']>(budgetTemplateFilterName, budgetTemplateFiltersInit.id.key)"
      @update:model-value="handleUpdate(budgetTemplateFiltersInit.id.key, $event)"
    />
    <FilterMoney
      :label="budgetTemplateFiltersInit.amount.label"
      :filter-key="budgetTemplateFiltersInit.amount.key"
      :value="filters.getFilterValue<BudgetTemplateFilterFields['amount']>(budgetTemplateFilterName, budgetTemplateFiltersInit.amount.key)"
      @update:model-value="handleUpdate(budgetTemplateFiltersInit.amount.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryCategoriesParentApiUrl"
      :label="budgetTemplateFiltersInit.categories.label"
      :filter-key="budgetTemplateFiltersInit.categories.key"
      :value="filters.getFilterValue<BudgetTemplateFilterFields['categories']>(budgetTemplateFilterName, budgetTemplateFiltersInit.categories.key)"
      @update:model-value="handleUpdate(budgetTemplateFiltersInit.categories.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterInteger from '~/components/filters/FilterInteger.vue';
import FilterMoney from '~/components/filters/FilterMoney.vue';
import FilterMultiSelect from '~/components/filters/FilterMultiSelect.vue';
import {
  budgetTemplateFilterName,
  budgetTemplateFiltersInit,
} from '~/components/pages/budget-templates/BudgetTemplateInit';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';

const filters = useFiltersStore();
filters.initFilters(budgetTemplateFilterName, budgetTemplateFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof BudgetTemplateFilters, value: InputValue) => {
  filters.addPreSavedFilter(budgetTemplateFilterName, key, value);
};
</script>
