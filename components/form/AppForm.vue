<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <slot />
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <NuxtLink to="/users" type="button" class="text-sm font-semibold leading-6 text-gray-900"
        >Cancel</NuxtLink
      >
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="emit('handle-form')"
      >
        Save
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
const emit = defineEmits(['handle-form']);
</script>
