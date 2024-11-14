<template>
  <div class="mb-4">
    <label
      :for="`filter-${filterKey}`"
      class="block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
    </label>
    <div class="mt-2">
      <textarea
        :id="`filter-${filterKey}`"
        :value="value"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  filterKey: string;
  value: string | null;
}>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
