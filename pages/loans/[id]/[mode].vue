<template>
  <div class="space-y-5">
    <AppUpsert
      title="Долг"
      :form-component="LoanForm"
      :form-init="loanFormInit"
      :api-url="loanApiUrl"
      path="/loans"
      :has-relation="true"
      :relation-resource="{ key: 'loan_id', resource: 'transactions' }"
    />

    <!--    <AppListRelation -->
    <!--      title="Транзакции" -->
    <!--      title-singular="Транзакцию" -->
    <!--      path="/transactions" -->
    <!--      :api-url="transactionApiUrl" -->
    <!--      :columns="transactionColumns" -->
    <!--      filter-key="loans" -->
    <!--      filter-name="loanTransactionsFilter" -->
    <!--      :init-filters="transactionFiltersInit" -->
    <!--    /> -->
  </div>
</template>

<script setup lang="ts">
import LoanForm from '~/components/pages/loans/LoanForm.vue';
import { loanApiUrl, loanFormInit } from '~/components/pages/loans/LoanInit';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
