<template>
  <FormGrid>
    <FormText
      :mode="mode"
      :form-field="form.name"
      @update:model-value="handleFieldUpdate(form.name.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: CategoryForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof CategoryForm, value: any) => void;
}>();
</script>
