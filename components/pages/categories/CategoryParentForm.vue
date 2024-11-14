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
  </FormGrid>
</template>

<script setup lang="ts">
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: CategoryForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof CategoryForm, value: InputValue) => void;
}>();
</script>
