<template>
  <AppUpsert
    title="Tag"
    :form-component="TagForm"
    :form-init="tagFormInit"
    :api-url="tagApiUrl"
    path="/tags"
  />
</template>

<script setup lang="ts">
import TagForm from '~/components/pages/tags/TagForm.vue';
import { tagApiUrl, tagFormInit } from '~/components/pages/tags/TagInit';
</script>
