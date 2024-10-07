<template>
  <div class="sm:col-span-2">
    <label
      v-if="label"
      :for="`form-${fieldKey}`"
      :class="[
        errors.length ? 'text-red-800' : 'text-gray-900',
        'block text-sm font-medium leading-6',
      ]"
    >{{ label }}</label>
    <div class="mt-2">
      <Multiselect
        :id="`form-${fieldKey}`"
        :data-testid="`form-${fieldKey}`"
        value-prop="id"
        label="name"
        :value="relationValue"
        mode="single"
        :placeholder="searchable ? 'Поиск...' : ''"
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="true"
        :delay="300"
        :disabled="mode === pageMode.VIEW || disabled"
        :searchable="searchable"
        :object="true"
        :options="fetchItems"
        :loading="pending"
        :class="[errors.length ? 'multiselect-error' : '']"
        @change="updateValue"
      />
      <p
        v-if="errors.length"
        class="mt-1 text-xs text-red-600"
      >
        {{ errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { useApi } from '~/composables/useApi';
import '@vueform/multiselect/themes/default.css';
import { pageMode, type UpsertMode } from '~/utils/pageMode';

const props = withDefaults(defineProps<{
  label?: string;
  fieldKey: string;
  relationValue?: RelationOption | null;
  errors: string[];
  mode?: UpsertMode;
  disabled?: boolean;
  apiUrl: string;
  searchable?: boolean;
}>(), {
  searchable: true,
});

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
