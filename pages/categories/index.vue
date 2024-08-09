<template>
  <AppList
    title="Categories"
    title-singular="Category"
    url="/categories"
    :api-url="categoryApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryFilterName"
    :filters-component="LazyPagesCategoriesCategoryFilters"
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
import { LazyPagesCategoriesCategoryFilters } from '#components';
</script>
