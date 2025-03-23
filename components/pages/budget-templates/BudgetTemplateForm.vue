<template>
  <FormGrid>
    <FormMoney
      :label="form.amount.label"
      :field-key="form.amount.key"
      :errors="form.amount.errors"
      :value="form.amount.value"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.amount.key, $event)"
    />

    <FormSelect
      :label="form.category_id.label"
      :field-key="form.category_id.key"
      :errors="form.category_id.errors"
      :relation-value="form.category_id.relation_value"
      :api-url="dictionaryCategoriesChildApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.category_id.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormMoney from '~/components/form/FormMoney.vue';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryCategoriesChildApiUrl } from '~/utils/dictionary';
import type { UpsertMode } from '~/utils/pageMode';

defineProps<{
  form: BudgetTemplateForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof BudgetTemplateForm, value: InputValue) => void;
}>();
</script>
