<template>
  <AppUpsert
    title="Родительскую Категорию"
    :form-component="CategoryParentForm"
    :form-init="categoryFormInit"
    :api-url="categoryApiUrl"
    path="/categories/parent"
  />
</template>

<script setup lang="ts">
import {
  categoryApiUrl,
  categoryFormInit,
} from '~/components/pages/categories/CategoryInit';
import CategoryParentForm from '~/components/pages/categories/CategoryParentForm.vue';
</script>
