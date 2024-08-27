<template>
  <div class="mb-4">
    <label :for="`filter-${filter.key}`" class="block text-sm font-medium leading-6 text-gray-900">
      {{ filter.label }}
    </label>
    <div class="mt-2">
      <VueDatePicker
        :id="`filter-${filter.key}`"
        v-model="date"
        :data-testid="`filter-${filter.key}`"
        format="dd-MM-yyyy"
        :min-date="minDate"
        :max-date="maxDate"
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
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
}>();

const emit = defineEmits(['update:modelValue']);

const date = ref(null);

onMounted(() => {
  date.value = props.value;
});

const updateValue = (value?: Date) => {
  emit('update:modelValue', value);
};
</script>
