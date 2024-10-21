<template>
  <AppUpsert
    title="Дочернюю Категорию"
    :form-component="CategoryChildForm"
    :form-init="form"
    :api-url="categoryApiUrl"
    path="/categories/child"
  />
</template>

<script setup lang="ts">
import CategoryChildForm from '~/components/pages/categories/CategoryChildForm.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';

// check existed relation for the resource and prepopulate the form with selected relation value
// relation presents only when the "create" resource component was called from upsert component with a relation
const { prepareForm, form } = useResourceRelation<CategoryFormFields>(categoryFormInit);
prepareForm('categories');
</script>
