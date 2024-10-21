<template>
  <div class="space-y-5">
    <AppUpsert
      title="Родительская Категория"
      :form-component="CategoryParentForm"
      :form-init="categoryFormInit"
      :api-url="categoryApiUrl"
      path="/categories/parent"
      :has-relation="true"
      :relation-resource="{ key: 'parent_id', resource: 'categories' }"
    />

    <AppListRelation
      title="Дочерние категории"
      title-singular="Дочернюю Категорию"
      path="/categories/child"
      :api-url="categoryChildApiUrl"
      :api-delete-url="categoryApiUrl"
      :columns="categoryColumns"
      filter-key="parent_categories"
      filter-name="categoryParentChildFilter"
      :is-filter-int-value="true"
      :init-filters="categoryFiltersInit"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryParentForm from '~/components/pages/categories/CategoryParentForm.vue';
import {
  categoryApiUrl,
  categoryChildApiUrl,
  categoryColumns,
  categoryFiltersInit,
  categoryFormInit,
} from '~/components/pages/categories/CategoryInit';
</script>
