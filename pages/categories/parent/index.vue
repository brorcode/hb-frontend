<template>
  <AppList
    title="Категории: Родительские"
    title-singular="Родительскую Категорию"
    path="/categories/parent"
    :api-url="categoryParentApiUrl"
    :api-delete-url="categoryApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryParentFilterName"
    :filters-component="CategoryParentFilters"
    :init-filters="categoryFiltersInit"
    :default-sort="{
      column: 'name',
      direction: 'ASC',
    }"
  />
</template>

<script setup lang="ts">
import {
  categoryApiUrl,
  categoryColumns,
  categoryFiltersInit,
  categoryParentApiUrl,
  categoryParentFilterName,
} from '~/components/pages/categories/CategoryInit';
import CategoryParentFilters from '~/components/pages/categories/CategoryParentFilters.vue';
</script>
