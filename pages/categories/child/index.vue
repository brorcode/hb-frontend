<template>
  <AppList
    title="Категории: Дочерние"
    title-singular="Дочернюю Категорию"
    path="/categories/child"
    :api-url="categoryChildApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryChildFilterName"
    :filters-component="CategoryChildFilters"
    :init-filters="categoryFiltersInit"
    :default-sort="{
      column: 'name',
      direction: 'ASC',
    }"
  />
</template>

<script setup lang="ts">
import {
  categoryChildApiUrl,
  categoryChildFilterName,
  categoryColumns,
  categoryFiltersInit,
} from '~/components/pages/categories/CategoryInit';
import CategoryChildFilters from '~/components/pages/categories/CategoryChildFilters.vue';
</script>
