<template>
  <div class="space-y-5">
    <AppUpsert
      title="Родительская Категория"
      :form-component="CategoryParentForm"
      :form-init="categoryFormInit"
      :api-url="categoryApiUrl"
      path="/categories/parent"
      back-path="/categories"
      :has-relation="true"
      :relation-resource="{ key: 'parent_id', resource: 'categories' }"
    />

    <AppListRelation
      key="child-categories-relation"
      title="Дочерние категории"
      title-singular="Дочернюю Категорию"
      path="/categories/child"
      :api-url="`${categoryApiUrl}/${route.params.id}/child`"
      :columns="categoryColumns"
      filter-name="categoryChildFilter"
      :is-filter-int-value="true"
      :init-filters="categoryFiltersInit"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryParentForm from '~/components/pages/categories/CategoryParentForm.vue';
import {
  categoryApiUrl,
  categoryColumns,
  categoryFiltersInit,
  categoryFormInit,
} from '~/components/pages/categories/CategoryInit';

const route = useRoute();
</script>
