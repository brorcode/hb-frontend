<template>
  <FormGrid>
    <FormText
      :mode="mode"
      :form-field="form.name"
      @update:model-value="handleFieldUpdate(form.name.key, $event)"
    />
    <FormTextarea
      :mode="mode"
      :form-field="form.description"
      @update:model-value="handleFieldUpdate(form.description.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: CategoryFormType;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof CategoryFormType, value: any) => void;
}>();
</script>
