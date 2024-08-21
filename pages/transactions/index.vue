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
  >
  </AppList>
</template>

<script setup lang="ts">
import {
  transactionApiUrl,
  transactionColumns,
  transactionFilterName,
  transactionFiltersInit
} from '~/components/pages/transactions/TransactionInit';
import TransactionFilters from '~/components/pages/transactions/TransactionFilters.vue';
</script>
