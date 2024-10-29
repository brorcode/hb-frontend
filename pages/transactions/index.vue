<template>
  <AppList
    title="Транзакции"
    title-singular="Транзакцию"
    path="/transactions"
    :api-url="transactionApiUrl"
    :columns="transactionColumns"
    :filter-name="transactionFilterName"
    :filters-component="TransactionFilters"
    :init-filters="transactionFiltersInit"
    :table-actions="transactionActions()"
  />
</template>

<script setup lang="ts">
import { transactionActions } from '~/components/pages/transactions/TransactionActions';
import TransactionFilters from '~/components/pages/transactions/TransactionFilters.vue';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFilterName,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
