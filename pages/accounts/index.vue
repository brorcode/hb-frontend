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
  />
</template>

<script setup lang="ts">
import {
  accountApiUrl,
  accountColumns,
  accountFilterName,
  accountFiltersInit,
} from '~/components/pages/accounts/AccountInit';
import AccountFilters from '~/components/pages/accounts/AccountFilters.vue';
</script>
