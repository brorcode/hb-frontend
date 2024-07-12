<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Category ID: {{ id }}</div>
      </div>
    </template>
    <AppForm back-url="/categories" :mode="mode" @submit-form="submitForm">
      <FormText
        :mode="mode"
        :form-field="form.name"
        @update:model-value="handleFieldUpdate(form.name.key, $event)"
      />
      <FormTextarea
        :mode="mode"
        :form-field="form.description"
        @update:model-value="handleFieldUpdate(form.description.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import FormText from '~/components/form/FormText.vue';
import AppForm from '~/components/form/AppForm.vue';
import { deepCopy } from '~/utils/deepCopy';
import type { UpsertMode } from '~/utils/pageMode';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';
import FormTextarea from '~/components/form/FormTextarea.vue';
import { useApi } from '~/composables/useApi';

const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };

const { item, fetchItem, handleUpdateItem } = useApi(categoryApiUrl);

const form = reactive(deepCopy(categoryFormInit) as CategoryForm);

const handleFieldUpdate = (key: keyof CategoryForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

onMounted(async () => {
  await fetchItem(parseInt(id));

  if (item.value?.data?.item) {
    Object.entries(form).forEach(([key]) => {
      form[key as keyof CategoryForm].value = item.value?.data?.item[key as keyof CategoryForm];
    });
  }
});

const submitForm = () => {
  // todo it return form we need to update form with new data
  handleUpdateItem(form, parseInt(id));
};
</script>
