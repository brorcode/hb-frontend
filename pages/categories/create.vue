<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create category</div>
      </div>
    </template>
    <AppForm back-url="/categories" @submit-form="submitForm">
      <FormText
        :form-field="form.name"
        @update:model-value="handleFieldUpdate(form.name.key, $event)"
      />
      <FormTextarea
        :form-field="form.description"
        @update:model-value="handleFieldUpdate(form.description.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import FormText from '~/components/form/FormText.vue';
import { deepCopy } from '~/utils/deepCopy';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';
import FormTextarea from '~/components/form/FormTextarea.vue';
import { useApi } from '~/composables/useApi';

const { item, handleCreateItem } = useApi(categoryApiUrl);

const form = reactive(deepCopy(categoryFormInit) as CategoryForm);

const handleFieldUpdate = (key: keyof CategoryForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

const submitForm = async () => {
  // todo do we need to clear form from errors before submit if I clear field on handleFieldUpdate
  // Object.entries(form).forEach(([key]) => {
  //   form[key as keyof CategoryForm].errors = [];
  // });

  const body = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]));

  await handleCreateItem(body);
  if (item.value?.error?.code === 'UNPROCESSABLE_ENTITY') {
    Object.entries(item.value?.error?.details || {}).forEach(([key, value]) => {
      form[key as keyof CategoryForm].errors = value as string[];
    });
  }

  if (!item.value?.error) {
    navigateTo('/categories');
  }
};
</script>
