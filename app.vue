<template>
  <div>
    <Title>Nuxt 3 - testing</Title>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <AddNotification />
  </div>
</template>
<script setup lang="ts">
import AddNotification from '~/components/AddNotification.vue';
</script>
