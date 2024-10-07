<template>
  <div>
    <FilterInteger
      :label="transactionFiltersInit.id.label"
      :filter-key="transactionFiltersInit.id.key"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.id.key) as typeof transactionFiltersInit.id.value"
      @update:model-value="handleUpdate(transactionFiltersInit.id.key, $event)"
    />
    <FilterSelect
      :api-url="dictionaryTransactionTypesApiUrl"
      :label="transactionFiltersInit.type_id.label"
      :filter-key="transactionFiltersInit.type_id.key"
      :searchable="false"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.type_id.key) as typeof transactionFiltersInit.type_id.value"
      @update:model-value="handleUpdate(transactionFiltersInit.type_id.key, $event)"
    />
    <FilterMoney
      :label="transactionFiltersInit.amount.label"
      :filter-key="transactionFiltersInit.amount.key"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.amount.key) as typeof transactionFiltersInit.amount.value"
      @update:model-value="handleUpdate(transactionFiltersInit.amount.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryCategoriesChildApiUrl"
      :label="transactionFiltersInit.categories.label"
      :filter-key="transactionFiltersInit.categories.key"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.categories.key) as typeof transactionFiltersInit.categories.value"
      @update:model-value="handleUpdate(transactionFiltersInit.categories.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryAccountsApiUrl"
      :label="transactionFiltersInit.accounts.label"
      :filter-key="transactionFiltersInit.accounts.key"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.accounts.key) as typeof transactionFiltersInit.accounts.value"
      @update:model-value="handleUpdate(transactionFiltersInit.accounts.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryTagsApiUrl"
      :label="transactionFiltersInit.tags.label"
      :filter-key="transactionFiltersInit.tags.key"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.tags.key) as typeof transactionFiltersInit.tags.value"
      @update:model-value="handleUpdate(transactionFiltersInit.tags.key, $event)"
    />
    <FilterDate
      :label="transactionFiltersInit.created_at_after.label"
      :filter-key="transactionFiltersInit.created_at_after.key"
      :value="
        filters.getFilterValue(transactionFilterName, transactionFiltersInit.created_at_after.key) as typeof transactionFiltersInit.created_at_after.value
      "
      :max-date="filters.preSavedFilters[transactionFilterName]?.created_at_before?.value as typeof transactionFiltersInit.created_at_before.value"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_after.key, $event)"
    />
    <FilterDate
      :label="transactionFiltersInit.created_at_before.label"
      :filter-key="transactionFiltersInit.created_at_before.key"
      :value="
        filters.getFilterValue(transactionFilterName, transactionFiltersInit.created_at_before.key) as typeof transactionFiltersInit.created_at_before.value
      "
      :min-date="filters.preSavedFilters[transactionFilterName]?.created_at_after?.value as typeof transactionFiltersInit.created_at_after.value"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_before.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';
import FilterMultiselectSelect from '~/components/filters/FilterMultiselectSelect.vue';
import FilterDate from '~/components/filters/FilterDate.vue';
import {
  dictionaryAccountsApiUrl,
  dictionaryCategoriesChildApiUrl,
  dictionaryTransactionTypesApiUrl,
} from '~/utils/dictionary';
import FilterMoney from '~/components/filters/FilterMoney.vue';
import FilterSelect from '~/components/filters/FilterSelect.vue';

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof TransactionFilters, value: InputValue) => {
  filters.addPreSavedFilter(transactionFilterName, key, value);
};
</script>
