<template>
  <div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Contact sales
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Aute magna irure deserunt veniam aliqua magna enim voluptate.
      </p>
    </div>

    <NuxtLink
      class="text-center"
      :to="`/login`"
    >
      Login
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});
</script>
