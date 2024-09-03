<template>
  <AppUpsert
    title="Transaction"
    :form-component="TransactionForm"
    :form-init="transactionFormInit"
    :api-url="transactionApiUrl"
    path="/transactions"
  />
</template>

<script setup lang="ts">
import TransactionForm from '~/components/pages/transactions/TransactionForm.vue';
import {
  transactionApiUrl,
  transactionFormInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
