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

    <AppList
      title="Транзакции"
      title-singular="Транзакцию"
      path="/transactions"
      :api-url="transactionApiUrl"
      :columns="transactionColumns"
      :filter-name="filterName"
      :init-filters="transactionFiltersInit"
      :is-relation="true"
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
import { useFiltersStore } from '~/stores/filters';

const filters = useFiltersStore();
const route = useRoute();
const filterName = 'accountTransactionsFilter';
const { id } = route.params as { id: string };

filters.initFilters(filterName, transactionFiltersInit);
filters.setFilterValue(filterName, 'accounts', [{ id: parseInt(id), name: '' }]);
</script>
