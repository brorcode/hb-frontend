<template>
  <div class="sm:col-span-2">
    <label
      :for="`form-${formField.key}`"
      :class="[
        formField.errors.length ? 'text-red-800' : 'text-gray-900',
        'block text-sm font-medium leading-6'
      ]"
      >{{ formField.label }}</label
    >
    <div class="mt-2">
      <Switch
        :id="`form-${formField.key}`"
        v-model="enabled"
        :data-testid="`form-${formField.key}`"
        :class="[
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        ]"
        @update:model-value="updateValue"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="[
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          ]"
        />
      </Switch>
      <p v-if="formField.errors.length" class="mt-1 text-xs text-red-600">
        {{ formField.errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue';
import type { UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  formField: FormField;
  mode?: UpsertMode;
}>();

const enabled = ref(props.formField.value);

watch(
  () => props.formField.value,
  (newValue) => {
    enabled.value = newValue;
  }
);

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: boolean) => {
  emit('update:modelValue', value);
};
</script>
