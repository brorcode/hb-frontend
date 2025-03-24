<template>
  <FormGrid>
    <FormDateTime
      :label="form.period_on.label"
      :field-key="form.period_on.key"
      :errors="form.period_on.errors"
      :value="transformedPeriodValue"
      month-picker
      :enable-time-picker="false"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.period_on.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import type { UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  form: BudgetForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof BudgetForm, value: InputValue) => void;
}>();

// Transform the date value to month-picker format
const transformedPeriodValue = computed(() => {
  const value = props.form.period_on.value;
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
});
</script>
