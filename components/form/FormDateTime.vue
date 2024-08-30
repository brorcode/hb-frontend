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
      <VueDatePicker
        :id="`form-${formField.key}`"
        :model-value="formField.value"
        :data-testid="`form-${formField.key}`"
        format="dd-MM-yyyy HH:mm:ss"
        enable-time-picker
        time-picker-inline
        :disabled="mode === pageMode.VIEW"
        :class="[formField.errors.length ? 'datepicker-error' : '']"
        @update:model-value="updateValue"
      />
      <p v-if="formField.errors.length" class="mt-1 text-xs text-red-600">
        {{ formField.errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import { pageMode, type UpsertMode } from '~/utils/pageMode';

defineProps<{
  formField: FormField;
  mode?: UpsertMode;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (value?: Date) => {
  emit('update:modelValue', value);
};
</script>
