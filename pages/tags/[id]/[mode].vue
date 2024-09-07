<template>
  <div class="space-y-5">
    <AppUpsert
      title="Tag"
      :form-component="TagForm"
      :form-init="tagFormInit"
      :api-url="tagApiUrl"
      path="/tags"
    />

    <AppList
      title="Transactions"
      title-singular="Transaction"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      :filter-name="transactionFilterName"
      :filters-component="TransactionFilters"
      :init-filters="transactionFiltersInit"
      :table-actions="transactionActions()"
      :is-relation="true"
    />
  </div>
</template>

<script setup lang="ts">
import TagForm from '~/components/pages/tags/TagForm.vue';
import { tagApiUrl, tagFormInit } from '~/components/pages/tags/TagInit';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFilterName, transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
import TransactionFilters from '~/components/pages/transactions/TransactionFilters.vue';
import { transactionActions } from '~/components/pages/transactions/TransactionActions';
</script>
