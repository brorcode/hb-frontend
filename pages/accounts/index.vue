<template>
  <AppList
    title="Accounts"
    title-singular="Account"
    path="/accounts"
    :api-url="accountApiUrl"
    :columns="accountColumns"
    :filter-name="accountFilterName"
    :filters-component="AccountFilters"
    :init-filters="accountFiltersInit"
  >
  </AppList>
</template>

<script setup lang="ts">
import {
  accountApiUrl,
  accountColumns,
  accountFilterName,
  accountFiltersInit
} from '~/components/pages/accounts/AccountInit';
import AccountFilters from '~/components/pages/accounts/AccountFilters.vue';
</script>
