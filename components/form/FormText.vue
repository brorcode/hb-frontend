<template>
  <div class="sm:col-span-2">
    <label
      :for="`form-${formField.key}`"
      :class="[
        formField.errors.length ? 'text-red-800' : 'text-gray-900',
        'block text-sm font-medium leading-6'
      ]"
      >{{ formField.label }}</label
    >
    <div class="mt-2">
      <input
        :id="`form-${formField.key}`"
        :type="type ?? 'text'"
        :autocomplete="type === 'password' ? 'current-password' : 'off'"
        :readonly="mode === pageMode.VIEW"
        :value="formField.value"
        :class="[
          formField.errors.length
            ? 'bg-red-50 placeholder:text-red-400 text-red-900 ring-red-300 focus:ring-red-600 ring-inset focus:ring-2 focus:ring-inset'
            : mode === 'view'
              ? 'cursor-default bg-gray-100 text-gray-500 ring-gray-300 focus:ring-gray-300 placeholder:text-gray-400'
              : 'text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-indigo-600 ring-inset focus:ring-2 focus:ring-inset',
          'block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 ring-1'
        ]"
        @input="updateValue"
      />
      <p v-if="formField.errors.length" class="mt-1 text-xs text-red-600">
        {{ formField.errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageMode, type UpsertMode } from '~/utils/pageMode';

defineProps<{
  formField: FormField;
  type?: 'text' | 'number' | 'email' | 'password';
  mode?: UpsertMode;
}>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>
