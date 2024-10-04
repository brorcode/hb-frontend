<template>
  <button
    :disabled="pending"
    class="inline-flex justify-center w-full rounded-md bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <svg
      v-if="pending"
      class="animate-spin mr-3 h-5 w-5 text-white"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  pending: boolean;
}>();
</script>
