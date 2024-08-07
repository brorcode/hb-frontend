<template>
  <form>
    <div class="space-y-12">
      <div :class="[mode !== pageMode.VIEW ? 'border-b border-gray-900/10 pb-12' : 'pb-2']">
        <slot />
      </div>
    </div>

    <div v-if="mode !== 'view'" class="mt-6 flex items-center justify-end gap-x-6">
      <svg v-if="pending" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
        <circle
          class="opacity-5"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-15"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <NuxtLink :to="backUrl" type="button" class="text-sm font-semibold leading-6 text-gray-900"
        >Cancel</NuxtLink
      >

      <button
        type="submit"
        :disabled="pending"
        class="rounded-md bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="emit('submit-form')"
      >
        Save
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { pageMode, type UpsertMode } from '~/utils/pageMode';

defineProps<{
  backUrl: string;
  pending: boolean;
  mode?: UpsertMode;
}>();
const emit = defineEmits(['submit-form']);
</script>
