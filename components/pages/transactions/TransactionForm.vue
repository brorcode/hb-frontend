<template>
  <FormGrid>
    <FormText
      :mode="mode"
      :form-field="form.amount"
      @update:model-value="handleFieldUpdate(form.amount.key, $event)"
    />

    <FormSelect
      :api-url="dictionaryCategoriesApiUrl"
      :mode="mode"
      :form-field="form.category_id"
      @update:model-value="handleFieldUpdate(form.category_id.key, $event)"
    />

    <FormSelect
      :api-url="dictionaryAccountsApiUrl"
      :mode="mode"
      :form-field="form.account_id"
      @update:model-value="handleFieldUpdate(form.account_id.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormText from '~/components/form/FormText.vue';
import FormSelect from '~/components/form/FormSelect.vue';
import type { UpsertMode } from '~/utils/pageMode';
import { dictionaryCategoriesApiUrl } from '~/utils/dictionary';

defineProps<{
  form: TransactionForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof TransactionForm, value: any) => void;
}>();
</script>
