<template>
  <FormGrid>
    <FormText
      :label="form.name.label"
      :field-key="form.name.key"
      :value="form.name.value"
      :errors="form.name.errors"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.name.key, $event)"
    />

    <FormCheckbox
      :label="form.is_archived.label"
      :field-key="form.is_archived.key"
      :errors="form.is_archived.errors"
      :value="form.is_archived.value"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.is_archived.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: AccountForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof AccountForm, value: InputValue) => void;
}>();
</script>
