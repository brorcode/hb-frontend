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
      :api-url="dictionaryCategoriesParentApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.category_id.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormMoney from '~/components/form/FormMoney.vue';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';
import type { UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  form: BudgetItemForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof BudgetItemForm, value: InputValue) => void;
}>();

const route = useRoute();
const { id } = route.params as { id: string };

onMounted(() => {
  props.handleFieldUpdate(props.form.period_on.key, parseInt(id));
});
</script>
