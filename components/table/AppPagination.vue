<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button
        v-if="currentPage > 1"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="setPage(currentPage - 1)"
      >
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        v-if="!isLastPage"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="setPage(currentPage + 1)"
      >
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

defineProps<{
  isLastPage?: boolean;
}>();

const emit = defineEmits(['pageChange']);
const currentPage = ref(1);

const setPage = (page: number) => {
  currentPage.value = page;
  emit('pageChange', page);
};
</script>
