<template>
  <div class="mb-4">
    <label :for="`filter-${filter.key}`" class="block text-sm font-medium leading-6 text-gray-900">
      {{ filter.label }}
    </label>
    <div class="mt-2">
      <VueDatePicker
        :id="`filter-${filter.key}`"
        v-model="dateRange"
        :data-testid="`filter-${filter.key}`"
        format="dd-MM-yyyy"
        range
        :enable-time-picker="false"
        @update:model-value="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

const props = defineProps<{
  filter: Filter;
  value?: [Date, Date];
}>();

const emit = defineEmits(['update:modelValue']);

const dateRange = ref(null);

onMounted(() => {
  dateRange.value = props.value;
});

const updateValue = (value?: [Date, Date]) => {
  emit('update:modelValue', value);
};
</script>
