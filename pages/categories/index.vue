<template>
  <AppList
    title="Категории"
    title-singular="Родительскую Категорию"
    path="/categories/parent"
    :api-url="categoryApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryFilterName"
    :filters-component="CategoryFilters"
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
  categoryFilterName,
  categoryFiltersInit,
} from '~/components/pages/categories/CategoryInit';
import CategoryFilters from '~/components/pages/categories/CategoryFilters.vue';
</script>
