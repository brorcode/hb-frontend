<template>
  <FormGrid>
    <FormMoney
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

    <FormDateTime
      :mode="mode"
      :form-field="form.created_at"
      @update:model-value="handleFieldUpdate(form.created_at.key, $event)"
    />

    <div class="sm:col-span-2">
      <div class="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormCheckbox
          :mode="mode"
          :form-field="form.is_debit"
          @update:model-value="handleFieldUpdate(form.is_debit.key, $event)"
        />

        <FormCheckbox
          :mode="mode"
          :form-field="form.is_transfer"
          @update:model-value="handleFieldUpdate(form.is_transfer.key, $event)"
        />
      </div>
    </div>

    <FormSelect
      v-if="!mode && form.is_transfer.value === true"
      :api-url="dictionaryAccountsApiUrl"
      :mode="mode"
      :form-field="form.account_to"
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
  handleFieldUpdate: (key: keyof TransactionForm, value: any) => void;
}>();
</script>
