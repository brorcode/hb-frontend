<template>
  <div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        HB
      </h2>
    </div>

    <div class="mx-auto mt-10 max-w-2xl text-center">
      <NuxtLink
        class="mx-auto justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        to="/login"
      >
        Login
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});
</script>
