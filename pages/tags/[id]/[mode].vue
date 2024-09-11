<template>
  <div class="space-y-5">
    <AppUpsert
      title="Тэг"
      :form-component="TagForm"
      :form-init="tagFormInit"
      :api-url="tagApiUrl"
      path="/tags"
      :has-relation="true"
    />

    <AppList
      title="Транзикции"
      title-singular="Транзакцию"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      :filter-name="filterName"
      :init-filters="transactionFiltersInit"
      :table-actions="tagTransactionsRelationActions()"
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
  transactionFiltersInit,
} from '~/components/pages/transactions/TransactionInit';
import { tagTransactionsRelationActions } from '~/components/pages/tags/TagTransactionsRelationActions';
import { useFiltersStore } from '~/stores/filters';

const filters = useFiltersStore();
const route = useRoute();
const filterName = 'tagTransactionsFilter';
const { id } = route.params as { id: string };

filters.initFilters(filterName, transactionFiltersInit);
filters.setFilterValue(filterName, 'tags', [{ id: parseInt(id), name: '' }]);
</script>
