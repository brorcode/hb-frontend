<template>
  <div class="mb-4">
    <div class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </div>
    <div class="mt-2">
      <Multiselect
        :id="`filter-${filterKey}`"
        :value="value"
        :data-testid="`filter-${filterKey}`"
        mode="single"
        :resolve-on-load="true"
        :options="fetchItems"
        :loading="pending"
        @change="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { useApi } from '~/composables/useApi';
import '@vueform/multiselect/themes/default.css';

const props = defineProps<{
  label: string;
  filterKey: string;
  value: number | null;
  apiUrl: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { items, pending, fetchData } = useApi();

const fetchItems = async (query: string) => {
  await fetchData(props.apiUrl, { q: query });

  return items.value;
};

const updateValue = (value: string) => {
  emit('update:modelValue', parseInt(value));
};
</script>
