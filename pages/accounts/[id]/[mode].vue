<template>
  <div class="space-y-5">
    <AppUpsert
      title="Аккаунт"
      :form-component="AccountForm"
      :form-init="accountFormInit"
      :api-url="accountApiUrl"
      path="/accounts"
      :has-relation="true"
    />

    <AppListRelation
      title="Транзакции"
      title-singular="Транзакцию"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      filter-key="accounts"
      filter-name="accountTransactionsFilter"
      :init-filters="transactionFiltersInit"
    />
  </div>
</template>

<script setup lang="ts">
import AccountForm from '~/components/pages/accounts/AccountForm.vue';
import { accountApiUrl, accountFormInit } from '~/components/pages/accounts/AccountInit';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
