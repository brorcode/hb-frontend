<template>
  <nav class="flex items-center justify-between border-t border-gray-200 pt-4 px-4 sm:px-0">
    <div class="flex flex-1">
      <button
        v-if="currentPage > 1"
        class="inline-flex items-center border-t-2 border-transparent pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="setPage(currentPage - 1)"
      >
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </button>
    </div>
    <div class="w-16">
      <Multiselect
        v-model="perPage"
        :classes="{
          singleLabel: 'w-full text-center'
        }"
        :can-clear="false"
        :options="[10, 20, 50, 100]"
        :can-deselect="false"
        @change="$emit('perPageChange', $event)"
      />
    </div>
    <div class="flex flex-1 justify-end">
      <button
        v-if="hasNextPage"
        class="inline-flex items-center border-t-2 border-transparent pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="changePage(currentPage + 1)"
      >
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/solid';
import Multiselect from '@vueform/multiselect';

const props = defineProps<{
  hasNextPage?: boolean;
  perPage: number;
}>();

const emit = defineEmits(['pageChange', 'perPageChange']);
const currentPage = ref(1);
const perPage = ref(props.perPage);

const changePage = (page: number) => {
  currentPage.value = page;
  emit('pageChange', page);
};
</script>
