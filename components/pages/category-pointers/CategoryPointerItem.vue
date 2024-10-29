<template>
  <div class="border border-gray-200 rounded-md p-5">
    <FormText
      :field-key="`pointer_${prefix}_${pointerIndex}`"
      :value="pointer.name"
      :errors="[]"
      @update:model-value="emit('updatePointerName', $event)"
    />

    <div class="mt-5">
      <span
        v-for="(tag, tagIndex) in pointer.tags_array"
        :id="`badge-tag-${tagIndex}`"
        :key="`badge-tag-${tagIndex}`"
        class="inline-flex items-center px-2 py-1 mr-2 mb-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded"
      >
        {{ tag }}
        <button
          :data-testid="`remove-pointer-tag-${tagIndex}-button`"
          type="button"
          class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900"
          data-dismiss-target="#badge-dismiss-default"
          aria-label="Remove"
          @click.prevent="emit('removeTag', tagIndex)"
        >
          <svg
            class="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Remove Pointer Tag</span>
        </button>
      </span>
    </div>

    <div class="mt-2.5">
      <div class="flex justify-between items-end">
        <div class="flex space-x-2">
          <FormText
            :field-key="`pointer_tag_${prefix}_${pointerIndex}`"
            placeholder="Новый тег"
            :value="tagName"
            :errors="[]"
            @update:model-value="tagName = $event"
          />

          <button
            :disabled="pending"
            data-testid="save-category-pointers-button"
            class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click.prevent="addTag"
          >
            Добавить
          </button>
        </div>

        <button class="flex justify-end">
          <TrashIcon
            class="text-red-600 h-5 w-5 cursor-pointer"
            @click.prevent="emit('removePointer')"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TrashIcon,
} from '@heroicons/vue/24/solid';
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';

defineProps<{
  pointer: CategoryPointer;
  prefix: string;
  pointerIndex: number;
  pending: boolean;
}>();

const tagName = ref('');

const emit = defineEmits(['removePointer', 'removeTag', 'addTag', 'updatePointerName']);

const addTag = () => {
  emit('addTag', tagName.value);
  tagName.value = '';
};
</script>
