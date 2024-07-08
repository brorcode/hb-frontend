<template>
  <div class="sm:col-span-2">
    <label
      :for="`form-${formField.key}`"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ formField.label }}</label
    >
    <div class="mt-2">
      <input
        :id="`form-${formField.key}`"
        type="text"
        :value="formField.value"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formField: FormField;
}>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>
