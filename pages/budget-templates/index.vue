<template>
  <AppList
    title="Шаблоны Бюджетов"
    title-singular="Шаблон Бюджета"
    path="/budget-templates"
    :api-url="budgetTemplateApiUrl"
    :columns="budgetTemplateColumns"
    :filter-name="budgetTemplateFilterName"
    :filters-component="BudgetTemplateFilters"
    :init-filters="budgetTemplateFiltersInit"
    :default-sort="{
      column: 'amount',
      direction: 'DESC',
    }"
  />
</template>

<script setup lang="ts">
import BudgetTemplateFilters from '~/components/pages/budget-templates/BudgetTemplateFilters.vue';
import {
  budgetTemplateApiUrl,
  budgetTemplateColumns,
  budgetTemplateFilterName,
  budgetTemplateFiltersInit,
} from '~/components/pages/budget-templates/BudgetTemplateInit';
</script>
