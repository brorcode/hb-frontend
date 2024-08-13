<template>
  <AppList
    title="Categories"
    title-singular="Category"
    path="/categories"
    :api-url="categoryApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryFilterName"
    :filters-component="CategoryFilters"
    :init-filters="categoryFiltersInit"
  >
  </AppList>
</template>

<script setup lang="ts">
import {
  categoryApiUrl,
  categoryColumns,
  categoryFilterName,
  categoryFiltersInit
} from '~/components/pages/categories/CategoryInit';
import CategoryFilters from '~/components/pages/categories/CategoryFilters.vue';
</script>
