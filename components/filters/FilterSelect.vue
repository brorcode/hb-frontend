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
        value-prop="id"
        label="name"
        mode="single"
        :resolve-on-load="true"
        :options="fetchItems"
        :object="true"
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
  value: InputSelect | null;
  apiUrl: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { items, pending, fetchData } = useApi();

const fetchItems = async () => {
  await fetchData(props.apiUrl, {});

  return items.value;
};

const updateValue = (value: InputSelect) => {
  emit('update:modelValue', value);
};
</script>
