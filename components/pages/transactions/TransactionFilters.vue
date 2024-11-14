<template>
  <div>
    <FilterInteger
      :label="transactionFiltersInit.id.label"
      :filter-key="transactionFiltersInit.id.key"
      :value="filters.getFilterValue<TransactionFilterFields['id']>(transactionFilterName, transactionFiltersInit.id.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.id.key, $event)"
    />
    <FilterSelect
      :api-url="dictionaryTransactionTypesApiUrl"
      :label="transactionFiltersInit.type.label"
      :filter-key="transactionFiltersInit.type.key"
      :searchable="false"
      :value="filters.getFilterValue<TransactionFilterFields['type']>(transactionFilterName, transactionFiltersInit.type.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.type.key, $event)"
    />
    <FilterMoney
      :label="transactionFiltersInit.amount.label"
      :filter-key="transactionFiltersInit.amount.key"
      :value="filters.getFilterValue<TransactionFilterFields['amount']>(transactionFilterName, transactionFiltersInit.amount.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.amount.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryCategoriesChildApiUrl"
      :label="transactionFiltersInit.categories.label"
      :filter-key="transactionFiltersInit.categories.key"
      :value="filters.getFilterValue<TransactionFilterFields['categories']>(transactionFilterName, transactionFiltersInit.categories.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.categories.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryAccountsApiUrl"
      :label="transactionFiltersInit.accounts.label"
      :filter-key="transactionFiltersInit.accounts.key"
      :value="filters.getFilterValue<TransactionFilterFields['accounts']>(transactionFilterName, transactionFiltersInit.accounts.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.accounts.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryTagsApiUrl"
      :label="transactionFiltersInit.tags.label"
      :filter-key="transactionFiltersInit.tags.key"
      :value="filters.getFilterValue<TransactionFilterFields['tags']>(transactionFilterName, transactionFiltersInit.tags.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.tags.key, $event)"
    />
    <FilterMultiSelect
      :api-url="dictionaryLoansApiUrl"
      :label="transactionFiltersInit.loans.label"
      :filter-key="transactionFiltersInit.loans.key"
      :value="filters.getFilterValue<TransactionFilterFields['loans']>(transactionFilterName, transactionFiltersInit.loans.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.loans.key, $event)"
    />
    <FilterDate
      :label="transactionFiltersInit.created_at_after.label"
      :filter-key="transactionFiltersInit.created_at_after.key"
      :value="filters.getFilterValue<TransactionFilterFields['created_at_after']>(transactionFilterName, transactionFiltersInit.created_at_after.key)"
      :max-date="filters.getPreSavedFilterValue<TransactionFilterFields['created_at_before']>(transactionFilterName, transactionFiltersInit.created_at_before.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_after.key, $event)"
    />
    <FilterDate
      :label="transactionFiltersInit.created_at_before.label"
      :filter-key="transactionFiltersInit.created_at_before.key"
      :value="filters.getFilterValue<TransactionFilterFields['created_at_before']>(transactionFilterName, transactionFiltersInit.created_at_before.key)"
      :min-date="filters.getPreSavedFilterValue<TransactionFilterFields['created_at_after']>(transactionFilterName, transactionFiltersInit.created_at_after.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_before.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterDate from '~/components/filters/FilterDate.vue';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import FilterMoney from '~/components/filters/FilterMoney.vue';
import FilterMultiSelect from '~/components/filters/FilterMultiSelect.vue';
import FilterSelect from '~/components/filters/FilterSelect.vue';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';
import { useFiltersStore } from '~/stores/filters';
import {
  dictionaryAccountsApiUrl,
  dictionaryCategoriesChildApiUrl,
  dictionaryTransactionTypesApiUrl,
} from '~/utils/dictionary';

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof TransactionFilters, value: InputValue) => {
  filters.addPreSavedFilter(transactionFilterName, key, value);
};
</script>
