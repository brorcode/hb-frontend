<template>
  <FormGrid>
    <FormText
      :mode="mode"
      :form-field="form.amount"
      @update:model-value="handleFieldUpdate(form.amount.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: TransactionForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof TransactionForm, value: any) => void;
}>();
</script>
