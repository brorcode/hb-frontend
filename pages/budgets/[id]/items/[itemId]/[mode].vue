<template>
  <div class="space-y-5">
    <AppUpsert
      title="Элемент Бюжета"
      :form-component="BudgetItemForm"
      :form-init="budgetItemFormInit"
      :api-url="budgetItemApiUrl"
      :path="`/budgets/${id}/items`"
      :id-param-name="'itemId'"
    />
  </div>
</template>

<script setup lang="ts">
import BudgetItemForm from '~/components/pages/budget-items/BudgetItemForm.vue';
import { budgetItemApiUrl, budgetItemFormInit } from '~/components/pages/budget-items/BudgetItemInit';

const route = useRoute();
const { id } = route.params as { id: string };
</script>
