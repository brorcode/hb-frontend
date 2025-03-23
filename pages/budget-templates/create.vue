<template>
  <AppUpsert
    title="Шаблон Бюджета"
    :form-component="BudgetTemplateForm"
    :form-init="budgetTemplateFormInit"
    :api-url="budgetTemplateApiUrl"
    path="/budget-templates"
  />
</template>

<script setup lang="ts">
import BudgetTemplateForm from '~/components/pages/budget-templates/BudgetTemplateForm.vue';
import { budgetTemplateApiUrl, budgetTemplateFormInit } from '~/components/pages/budget-templates/BudgetTemplateInit';
</script>
