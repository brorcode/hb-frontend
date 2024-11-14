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
      <VueDatePicker
        :id="`form-${fieldKey}`"
        :model-value="value"
        :data-testid="`form-${fieldKey}`"
        :format="enableTimePicker ? 'dd-MM-yyyy HH:mm:ss' : 'dd-MM-yyyy'"
        :enable-time-picker="enableTimePicker"
        :time-picker-inline="enableTimePicker"
        :disabled="mode === pageMode.VIEW"
        locale="ru-RU"
        select-text="Выбрать"
        cancel-text="Отмена"
        :class="[errors.length ? 'datepicker-error' : '']"
        @update:model-value="updateValue"
      />
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
import VueDatePicker from '@vuepic/vue-datepicker';
import { pageMode, type UpsertMode } from '~/utils/pageMode';

withDefaults(defineProps<{
  label: string;
  fieldKey: string;
  value: Date | string | null;
  errors: string[];
  mode?: UpsertMode;
  enableTimePicker?: boolean;
}>(), {
  enableTimePicker: true,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value?: Date) => {
  emit('update:modelValue', value);
};
</script>
