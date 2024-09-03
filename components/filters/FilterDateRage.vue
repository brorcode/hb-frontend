<template>
  <div class="mb-4">
    <label
      :for="`filter-${filterKey}`"
      class="block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
    </label>
    <div class="mt-2">
      <VueDatePicker
        :id="`filter-${filterKey}`"
        v-model="dateRange"
        :data-testid="`filter-${filterKey}`"
        format="dd-MM-yyyy"
        :range="true"
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
  label: string;
  filterKey: string;
  value?: [Date, Date];
}>();

const emit = defineEmits(['update:modelValue']);

const dateRange = ref<[Date, Date]>();

onMounted(() => {
  dateRange.value = props.value;
});

const updateValue = (value?: [Date, Date]) => {
  emit('update:modelValue', value);
};
</script>
