<template>
  <FormGrid>
    <FormText
      :label="form.name.label"
      :field-key="form.name.key"
      :errors="form.name.errors"
      :value="form.name.value"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.name.key, $event)"
    />
    <FormText
      :mode="mode"
      :label="form.email.label"
      :field-key="form.email.key"
      :errors="form.email.errors"
      :value="form.email.value"
      type="email"
      autocomplete="username"
      @update:model-value="handleFieldUpdate(form.email.key, $event)"
    />
    <div class="sm:col-span-2" />
    <FormText
      :mode="mode"
      :label="form.password.label"
      :field-key="form.password.key"
      :errors="form.password.errors"
      :value="form.password.value"
      type="password"
      autocomplete="new-password"
      @update:model-value="handleFieldUpdate(form.password.key, $event)"
    />
    <FormText
      :mode="mode"
      :label="form.password_confirmation.label"
      :field-key="form.password_confirmation.key"
      :value="form.password_confirmation.value"
      :errors="form.password_confirmation.errors"
      type="password"
      autocomplete="new-password"
      @update:model-value="handleFieldUpdate(form.password_confirmation.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: UserForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof UserForm, value: InputValue) => void;
}>();
</script>
