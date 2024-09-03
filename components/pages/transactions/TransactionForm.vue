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
      :api-url="dictionaryCategoriesApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.category_id.key, $event)"
    />

    <FormSelect
      :label="form.account_id.label"
      :field-key="form.account_id.key"
      :errors="form.account_id.errors"
      :relation-value="form.account_id.relation_value"
      :api-url="dictionaryAccountsApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.account_id.key, $event)"
    />

    <FormDateTime
      :label="form.created_at.label"
      :field-key="form.created_at.key"
      :errors="form.created_at.errors"
      :value="form.created_at.value"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.created_at.key, $event)"
    />

    <div class="sm:col-span-2">
      <div class="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormCheckbox
          :label="form.is_debit.label"
          :field-key="form.is_debit.key"
          :errors="form.is_debit.errors"
          :value="form.is_debit.value"
          :mode="mode"
          @update:model-value="handleFieldUpdate(form.is_debit.key, $event)"
        />

        <FormCheckbox
          :label="form.is_transfer.label"
          :field-key="form.is_transfer.key"
          :errors="form.is_transfer.errors"
          :value="form.is_transfer.value"
          :mode="mode"
          @update:model-value="handleFieldUpdate(form.is_transfer.key, $event)"
        />
      </div>
    </div>

    <FormSelect
      v-if="!mode && form.is_transfer.value"
      :label="form.account_to.label"
      :field-key="form.account_to.key"
      :errors="form.account_to.errors"
      :relation-value="form.account_to.relation_value"
      :api-url="dictionaryAccountsApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.account_to.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormSelect from '~/components/form/FormSelect.vue';
import type { UpsertMode } from '~/utils/pageMode';
import { dictionaryCategoriesApiUrl } from '~/utils/dictionary';
import FormMoney from '~/components/form/FormMoney.vue';

defineProps<{
  form: TransactionForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof TransactionForm, value: InputValue) => void;
}>();
</script>
