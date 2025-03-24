<template>
  <AppUpsert
    title="Бюджет"
    :form-component="BudgetForm"
    :form-init="budgetFormInit"
    :api-url="budgetApiUrl"
    path="/budgets"
  />
</template>

<script setup lang="ts">
import BudgetForm from '~/components/pages/budgets/BudgetForm.vue';
import { budgetApiUrl, budgetFormInit } from '~/components/pages/budgets/BudgetInit';
</script>
