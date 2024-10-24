<template>
  <div class="sm:col-span-2">
    <label
      :for="`filter-${filterKey}`"
      class="block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
    </label>
    <div class="mt-2">
      <Switch
        :id="`filter-${filterKey}`"
        v-model="isOn"
        :data-testid="`filter-${filterKey}`"
        :class="[
          isOn ? 'bg-indigo-600' : 'bg-gray-200',
          'cursor-pointer relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
        ]"
        @update:model-value="updateValue"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="[
            isOn ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          ]"
        />
      </Switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue';

const props = defineProps<{
  label: string;
  filterKey: string;
  value: boolean | null;
}>();

const isOn = ref<boolean>(props.value !== null);

watch(
  () => props.value,
  (newValue) => {
    isOn.value = newValue === true;
  },
);

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: boolean) => {
  emit('update:modelValue', !value ? null : value);
};
</script>
