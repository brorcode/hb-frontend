<template>
  <div class="sm:col-span-2">
    <label
      :for="`form-${fieldKey}`"
      :class="[
        errors.length ? 'text-red-800' : 'text-gray-900',
        'block text-sm font-medium leading-6',
      ]"
    >{{ label }}</label>
    <div class="mt-2">
      <input
        :id="`form-${fieldKey}`"
        :data-testid="`form-${fieldKey}`"
        type="number"
        step="0.01"
        min="0.01"
        :readonly="mode === pageMode.VIEW"
        :value="value"
        :class="[
          errors.length
            ? 'bg-red-50 placeholder:text-red-400 text-red-900 ring-red-300 focus:ring-red-600 ring-inset focus:ring-2 focus:ring-inset'
            : mode === pageMode.VIEW
              ? 'cursor-default bg-gray-100 text-gray-500 ring-gray-300 focus:ring-gray-300 placeholder:text-gray-400'
              : 'text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-indigo-600 ring-inset focus:ring-2 focus:ring-inset',
          'block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 ring-1',
        ]"
        @blur="updateValue"
      >
      <p
        v-if="errors.length"
        class="mt-1 text-xs text-red-600"
      >
        {{ errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageMode, type UpsertMode } from '~/utils/pageMode';

defineProps<{
  label: string;
  fieldKey: string;
  value: number | null;
  errors: string[];
  mode?: UpsertMode;
}>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const result = parseFloat(target.value);
  emit('update:modelValue', !isNaN(result) ? result : null);
};
</script>
