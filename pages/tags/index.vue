<template>
  <AppList
    title="Теги"
    title-singular="Тег"
    path="/tags"
    :api-url="tagApiUrl"
    :columns="tagColumns"
    :filter-name="tagFilterName"
    :filters-component="TagFilters"
    :init-filters="tagFiltersInit"
  />
</template>

<script setup lang="ts">
import TagFilters from '~/components/pages/tags/TagFilters.vue';
import { tagApiUrl, tagColumns, tagFilterName, tagFiltersInit } from '~/components/pages/tags/TagInit';
</script>
