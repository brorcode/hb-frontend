<template>
  <AppList
    title="Тэги"
    title-singular="Тэг"
    path="/tags"
    :api-url="tagApiUrl"
    :columns="tagColumns"
    :filter-name="tagFilterName"
    :filters-component="TagFilters"
    :init-filters="tagFiltersInit"
  />
</template>

<script setup lang="ts">
import { tagApiUrl, tagColumns, tagFilterName, tagFiltersInit } from '~/components/pages/tags/TagInit';
import TagFilters from '~/components/pages/tags/TagFilters.vue';
</script>
