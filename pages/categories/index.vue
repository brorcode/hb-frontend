<template>
  <AppList
    title="Categories"
    title-singular="Category"
    url="/categories"
    :api-url="categoryApiUrl"
    :columns="categoryColumns"
    :filter-name="categoryFilterName"
    :init-filters="categoryFiltersInit"
  >
    <template #filters>
      <LazyPagesCategoriesCategoryFilters />
    </template>
  </AppList>
</template>

<script setup lang="ts">
import {
  categoryApiUrl,
  categoryColumns,
  categoryFilterName,
  categoryFiltersInit
} from '~/components/pages/categories/CategoryInit';
</script>
