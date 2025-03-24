<template>
  <AppList
    title="Бюджеты"
    title-singular="Бюджет"
    path="/budgets"
    :api-url="budgetApiUrl"
    :columns="budgetColumns"
    :filter-name="budgetFilterName"
    :filters-component="BudgetFilters"
    :init-filters="budgetFiltersInit"
    :default-sort="{
      column: 'period_on',
      direction: 'DESC',
    }"
    :editable="false"
  />
</template>

<script setup lang="ts">
import BudgetFilters from '~/components/pages/budgets/BudgetFilters.vue';
import { budgetApiUrl, budgetColumns, budgetFilterName, budgetFiltersInit } from '~/components/pages/budgets/BudgetInit';
</script>
