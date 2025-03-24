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
        v-model="date"
        :data-testid="`filter-${filterKey}`"
        format="dd-MM-yyyy"
        locale="ru-RU"
        select-text="Выбрать"
        cancel-text="Отмена"
        :min-date="minDateValue"
        :max-date="maxDateValue"
        :enable-time-picker="false"
        :month-picker="monthPicker"
        @update:model-value="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  label: string;
  filterKey: string;
  value?: Date | { month: number | string; year: number | string } | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  monthPicker?: boolean;
}>(), {
  monthPicker: false,
});

const emit = defineEmits(['update:modelValue']);

const date = ref<Date | { month: number | string; year: number | string }>();
const minDateValue = ref<Date>();
const maxDateValue = ref<Date>();

onMounted(() => {
  date.value = props.value || undefined;
  minDateValue.value = props.minDate || undefined;
  maxDateValue.value = props.maxDate || undefined;
});

watch(
  () => props.minDate,
  (newValue) => {
    minDateValue.value = newValue || undefined;
  },
);
watch(
  () => props.maxDate,
  (newValue) => {
    maxDateValue.value = newValue || undefined;
  },
);

const updateValue = (value?: Date) => {
  emit('update:modelValue', value);
};
</script>
