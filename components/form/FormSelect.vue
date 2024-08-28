<template>
  <div class="sm:col-span-2">
    <label
      :for="`form-${formField.key}`"
      :class="[
        formField.errors.length ? 'text-red-800' : 'text-gray-900',
        'block text-sm font-medium leading-6'
      ]"
      >{{ formField.label }}</label
    >
    <div class="mt-2">
      <Multiselect
        :id="`filter-${formField.key}`"
        :data-testid="`filter-${formField.key}`"
        value-prop="id"
        label="name"
        :value="formField.relation_value"
        mode="single"
        placeholder="Поиск..."
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="true"
        :delay="300"
        :disabled="mode === pageMode.VIEW"
        :searchable="true"
        :object="true"
        :options="fetchItems"
        :loading="pending"
        :class="[formField.errors.length ? 'multiselect-error' : '']"
        @change="updateValue"
      />
      <p v-if="formField.errors.length" class="mt-1 text-xs text-red-600">
        {{ formField.errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { useApi } from '~/composables/useApi';
import '@vueform/multiselect/themes/default.css';
import { pageMode, type UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  formField: FormField;
  mode?: UpsertMode;
  apiUrl: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { items, pending, fetchData } = useApi();

const fetchItems = async (query: string) => {
  await fetchData(props.apiUrl, { q: query });

  return items.value;
};

const updateValue = (value: RelationOption) => {
  emit('update:modelValue', value?.id ?? '');
};
</script>
