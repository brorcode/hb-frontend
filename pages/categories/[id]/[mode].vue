<template>
  <div class="space-y-5">
    <AppUpsert
      title="Категория"
      :form-component="CategoryForm"
      :form-init="categoryFormInit"
      :api-url="categoryApiUrl"
      path="/categories"
      :has-relation="true"
    />

    <AppListRelation
      title="Транзакции"
      title-singular="Транзакцию"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      filter-key="categories"
      filter-name="categoryTransactionsFilter"
      :init-filters="transactionFiltersInit"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryForm from '~/components/pages/categories/CategoryForm.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
