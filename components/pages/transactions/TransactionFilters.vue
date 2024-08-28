<template>
  <div>
    <FilterInteger
      :filter="transactionFiltersInit.id"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.id.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.id.key, $event)"
    />
    <FilterText
      :filter="transactionFiltersInit.amount"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.amount.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.amount.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryCategoriesApiUrl"
      :filter="transactionFiltersInit.categories"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.categories.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.categories.key, $event)"
    />
    <FilterMultiselectSelect
      :api-url="dictionaryAccountsApiUrl"
      :filter="transactionFiltersInit.accounts"
      :value="filters.getFilterValue(transactionFilterName, transactionFiltersInit.accounts.key)"
      @update:model-value="handleUpdate(transactionFiltersInit.accounts.key, $event)"
    />
    <FilterDate
      :filter="transactionFiltersInit.created_at_after"
      :value="
        filters.getFilterValue(transactionFilterName, transactionFiltersInit.created_at_after.key)
      "
      :max-date="filters.preSavedFilters[transactionFilterName]?.created_at_before?.value"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_after.key, $event)"
    />
    <FilterDate
      :filter="transactionFiltersInit.created_at_before"
      :value="
        filters.getFilterValue(transactionFilterName, transactionFiltersInit.created_at_before.key)
      "
      :min-date="filters.preSavedFilters[transactionFilterName]?.created_at_after?.value"
      @update:model-value="handleUpdate(transactionFiltersInit.created_at_before.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import {
  transactionFilterName,
  transactionFiltersInit
} from '~/components/pages/transactions/TransactionInit';
import FilterMultiselectSelect from '~/components/filters/FilterMultiselectSelect.vue';
import FilterDate from '~/components/filters/FilterDate.vue';
import { dictionaryAccountsApiUrl, dictionaryCategoriesApiUrl } from '~/utils/dictionary';

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof TransactionFilters, value: any) => {
  filters.addPreSavedFilter(transactionFilterName, key, value);
};
</script>
