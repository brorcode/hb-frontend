<template>
  <div class="mb-4">
    <div class="block text-sm font-medium leading-6 text-gray-900">
      {{ filter.label }}
    </div>
    <div class="mt-2">
      <Multiselect
        :id="`filter-${filter.key}`"
        v-model="selected"
        :data-testid="`filter-${filter.key}`"
        value-prop="id"
        label="name"
        mode="tags"
        placeholder="Choose your categories"
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
import { ref } from 'vue';
import Multiselect from '@vueform/multiselect';
import { useApi } from '~/composables/useApi';

const props = defineProps<{
  filter: Filter;
  value: number[];
}>();

const emit = defineEmits(['update:modelValue']);

const { items, pending, fetchData } = useApi();

const selected = ref([]);

onMounted(() => {
  selected.value = props.value;
});

const fetchItems = async (query: string) => {
  await fetchData('/api/v1/dictionary/categories', { q: query });

  return items.value;
};

const updateValue = (value: MultiSelect[]) => {
  emit('update:modelValue', value);
};
</script>
