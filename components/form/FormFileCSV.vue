<template>
  <div class="sm:col-span-2 mt-4">
    <label
      v-if="!fileName"
      :for="`form-${fieldKey}`"
      class="relative block text-center cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
    >
      <span>Загрузить файл</span>
      <input
        :id="`form-${fieldKey}`"
        :ref="fileInput"
        :data-testid="`form-${fieldKey}`"
        type="file"
        accept=".csv"
        class="sr-only"
        @change="updateValue"
      >
    </label>
    <div
      v-else
      class="text-center justify-center items-center font-semibold text-sm flex"
    >
      <div>{{ fileName }}</div>
      <button
        type="button"
        class="rounded-md bg-white text-red-400 hover:text-red-500 focus:outline-none"
        @click="removeFile"
      >
        <span class="sr-only">Close</span>
        <XMarkIcon
          class="h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </div>
    <p
      v-if="errors.length"
      class="mt-1 text-center text-xs text-red-600"
    >
      {{ errors[0] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import '@vueform/multiselect/themes/default.css';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  label?: string;
  fieldKey: string;
  errors: string[];
  mode?: UpsertMode;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
const fileName = ref();
const fileInput = ref();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  fileName.value = file?.name;
  emit('update:modelValue', file);
};

const removeFile = () => {
  fileName.value = '';
  emit('update:modelValue', null);
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>
