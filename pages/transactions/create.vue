<template>
  <AppUpsert
    title="Транзакцию"
    :form-component="TransactionForm"
    :form-init="form"
    :api-url="transactionApiUrl"
    path="/transactions"
  />
</template>

<script setup lang="ts">
import TransactionForm from '~/components/pages/transactions/TransactionForm.vue';
import { transactionApiUrl, transactionFormInit } from '~/components/pages/transactions/TransactionInit';
import { useResourceRelation } from '~/composables/useResourceRelation';

// check existed relation for the resource and prepopulate the form with selected relation value
// relation presents only when the "create" resource component was called from upsert component with a relation
const { prepareForm, form } = useResourceRelation<TransactionFormFields>(transactionFormInit);
prepareForm('transactions');
</script>
