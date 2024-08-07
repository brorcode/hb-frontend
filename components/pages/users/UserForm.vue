<template>
  <FormGrid>
    <FormText
      :mode="mode"
      :form-field="form.name"
      @update:model-value="handleFieldUpdate(form.name.key, $event)"
    />
    <FormText
      :mode="mode"
      type="email"
      :form-field="form.email"
      @update:model-value="handleFieldUpdate(form.email.key, $event)"
    />
    <FormText
      :mode="mode"
      type="password"
      :form-field="form.password"
      @update:model-value="handleFieldUpdate(form.password.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: UserForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof UserForm, value: any) => void;
}>();
</script>
