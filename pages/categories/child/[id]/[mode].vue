<template>
  <div class="space-y-5">
    <AppUpsert
      title="Дочернаяя Категория"
      :form-component="CategoryChildForm"
      :form-init="categoryFormInit"
      :api-url="categoryApiUrl"
      path="/categories/child"
      :has-relation="true"
      :relation-resource="{ key: 'category_id', resource: 'transactions' }"
    />

    <AppListRelation
      key="transactions-relation"
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
import CategoryChildForm from '~/components/pages/categories/CategoryChildForm.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
