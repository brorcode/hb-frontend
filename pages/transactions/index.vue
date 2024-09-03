<template>
  <AppList
    title="Transactions"
    title-singular="Transaction"
    path="/transactions"
    :api-url="transactionApiUrl"
    :columns="transactionColumns"
    :filter-name="transactionFilterName"
    :filters-component="TransactionFilters"
    :init-filters="transactionFiltersInit"
    :table-actions="transactionActions"
  />
</template>

<script setup lang="ts">
import {
  transactionApiUrl,
  transactionColumns,
  transactionFilterName,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
import TransactionFilters from '~/components/pages/transactions/TransactionFilters.vue';
import { transactionActions } from '~/components/pages/transactions/TransactionActions';
</script>
