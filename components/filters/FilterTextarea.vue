<template>
  <div>
    <label
      :for="`filter-${filter.key}`"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ filter.label }}</label
    >
    <div class="mt-2">
      <textarea
        :id="`filter-${filter.key}`"
        :value="value"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  filter: Filter;
  value?: string;
}>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>
