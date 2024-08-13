<template>
  <AppUpsert
    title="Category"
    :form-component="CategoryForm"
    :form-init="categoryFormInit"
    :api-url="categoryApiUrl"
    path="/categories"
  />
</template>

<script setup lang="ts">
import CategoryForm from '~/components/pages/categories/CategoryForm.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';
</script>
