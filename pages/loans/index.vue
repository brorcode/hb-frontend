<template>
  <AppList
    title="Долги"
    title-singular="Долг"
    path="/loans"
    :api-url="loanApiUrl"
    :columns="loanColumns"
    :filter-name="loanFilterName"
    :filters-component="LoanFilters"
    :init-filters="loanFiltersInit"
  />
</template>

<script setup lang="ts">
import LoanFilters from '~/components/pages/loans/LoanFilters.vue';
import { loanApiUrl, loanColumns, loanFilterName, loanFiltersInit } from '~/components/pages/loans/LoanInit';
</script>
