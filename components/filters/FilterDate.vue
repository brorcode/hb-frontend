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
  label: string;
  filterKey: string;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
}>();

const emit = defineEmits(['update:modelValue']);

const date = ref<Date>();

onMounted(() => {
  date.value = props.value;
});

const updateValue = (value?: Date) => {
  emit('update:modelValue', value);
};
</script>
