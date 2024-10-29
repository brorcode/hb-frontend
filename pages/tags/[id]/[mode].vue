<template>
  <div class="space-y-5">
    <AppUpsert
      title="Тег"
      :form-component="TagForm"
      :form-init="tagFormInit"
      :api-url="tagApiUrl"
      path="/tags"
      :has-relation="true"
    />

    <AppListRelation
      title="Транзакции"
      title-singular="Транзакцию"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      filter-key="tags"
      filter-name="tagTransactionsFilter"
      :init-filters="transactionFiltersInit"
      :table-actions="tagTransactionsRelationActions()"
    />
  </div>
</template>

<script setup lang="ts">
import TagForm from '~/components/pages/tags/TagForm.vue';
import { tagApiUrl, tagFormInit } from '~/components/pages/tags/TagInit';
import { tagTransactionsRelationActions } from '~/components/pages/tags/TagTransactionsRelationActions';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
</script>
