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
      :label="form.parent_id.label"
      :field-key="form.parent_id.key"
      :errors="form.parent_id.errors"
      :relation-value="form.parent_id.relation_value"
      :api-url="dictionaryCategoriesParentApiUrl"
      :mode="mode"
      @update:model-value="handleFieldUpdate(form.parent_id.key, $event)"
    />
  </FormGrid>
</template>

<script setup lang="ts">
import FormSelect from '~/components/form/FormSelect.vue';
import FormText from '~/components/form/FormText.vue';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';
import type { UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  form: CategoryForm;
  mode?: UpsertMode;
  handleFieldUpdate: (key: keyof CategoryForm, value: InputValue) => void;
}>();

props.handleFieldUpdate(props.form.is_child.key, true);
</script>
