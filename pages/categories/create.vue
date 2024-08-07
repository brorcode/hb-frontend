<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create category</div>
      </div>
    </template>
    <AppForm back-url="/categories" :pending="pending" @submit-form="submitForm">
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
import FormTextarea from '~/components/form/FormTextarea.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';

const { form, handleFieldUpdate, submit, pending } = useForm<CategoryForm>(categoryFormInit);

const submitForm = async () => {
  await submit(`${categoryApiUrl}/create`, 'POST', () => {
    navigateTo('/categories');
  });
};
</script>
