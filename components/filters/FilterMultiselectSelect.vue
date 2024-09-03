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
        mode="tags"
        placeholder="Поиск..."
        :close-on-select="false"
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="true"
        :delay="300"
        :searchable="true"
        :object="true"
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
  value: number[];
  apiUrl: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { items, pending, fetchData } = useApi();

const fetchItems = async (query: string) => {
  await fetchData(props.apiUrl, { q: query });

  return items.value;
};

const updateValue = (value: MultiSelect[]) => {
  emit('update:modelValue', value);
};
</script>
