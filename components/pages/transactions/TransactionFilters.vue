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

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof TransactionFilters, value: string) => {
  filters.addPreSavedFilter(transactionFilterName, key, value);
};
</script>
