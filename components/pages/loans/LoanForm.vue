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

    <FormSelect
      :label="form.type_id.label"
      :field-key="form.type_id.key"
      :errors="form.type_id.errors"
      :relation-value="form.type_id.relation_value"
      :api-url="dictionaryLoanTypesApiUrl"
      :mode="mode"
      :searchable="false"
      @update:model-value="handleFieldUpdate(form.type_id.key, $event)"
    />

    <FormMoney
      :label="form.amount.label"
      :field-key="form.amount.key"
      :errors="form.amount.errors"
      :value="form.amount.value"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.amount.key, $event)"
    />

    <FormDateTime
      :label="form.deadline_on.label"
      :field-key="form.deadline_on.key"
      :errors="form.deadline_on.errors"
      :value="form.deadline_on.value"
      :mode="mode"
      :enable-time-picker="false"
      @update:model-value="handleFieldUpdate(form.deadline_on.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormText from '~/components/form/FormText.vue';
import type { UpsertMode } from '~/utils/pageMode';
import { dictionaryLoanTypesApiUrl } from '~/utils/dictionary';
import FormSelect from '~/components/form/FormSelect.vue';
import FormMoney from '~/components/form/FormMoney.vue';

defineProps<{
  form: LoanForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof LoanForm, value: InputValue) => void;
}>();
</script>
