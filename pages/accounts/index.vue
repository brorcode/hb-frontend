<template>
  <AppList
    title="Аккаунты"
    title-singular="Аккаунт"
    path="/accounts"
    :api-url="accountApiUrl"
    :columns="accountColumns"
    :filter-name="accountFilterName"
    :filters-component="AccountFilters"
    :init-filters="accountFiltersInit"
    :default-sort="{
      column: 'name',
      direction: 'ASC',
    }"
  />
</template>

<script setup lang="ts">
import AccountFilters from '~/components/pages/accounts/AccountFilters.vue';
import {
  accountApiUrl,
  accountColumns,
  accountFilterName,
  accountFiltersInit,
} from '~/components/pages/accounts/AccountInit';
</script>
