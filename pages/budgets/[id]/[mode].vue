<template>
  <div class="space-y-5">
    <AppUpsert
      title="Бюжет"
      :form-component="BudgetForm"
      :form-init="budgetFormInit"
      :api-url="budgetApiUrl"
      path="/budgets"
      :editable="false"
    />

    <AppListRelation
      key="budget-items-relation"
      title="Элементы Бюжета"
      title-singular="Элемент Бюджета"
      :path="`/budgets/${id}/items`"
      :api-url="budgetItemApiUrl"
      :columns="budgetItemColumns"
      filter-key="period_on"
      filter-name="budgetBudgetItemsFilter"
      :init-filters="budgetItemFiltersInit"
      :is-id-year-month="true"
      :default-sort="{
        column: 'amount',
        direction: 'DESC',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import {
  budgetItemApiUrl,
  budgetItemColumns,
  budgetItemFiltersInit,
} from '~/components/pages/budget-items/BudgetItemInit';
import BudgetForm from '~/components/pages/budgets/BudgetForm.vue';
import { budgetApiUrl, budgetFormInit } from '~/components/pages/budgets/BudgetInit';

const route = useRoute();
const { id } = route.params as { id: string };
</script>
