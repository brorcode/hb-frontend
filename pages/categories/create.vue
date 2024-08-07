<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create Category</div>
      </div>
    </template>
    <AppForm back-url="/categories" :pending="pending" @submit-form="submitForm">
      <CategoryForm :form="form" :handle-field-update="handleFieldUpdate" />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import CategoryForm from '~/components/pages/categories/CategoryForm.vue';
import { categoryApiUrl, categoryFormInit } from '~/components/pages/categories/CategoryInit';

const { form, pending, handleFieldUpdate, submit } = useForm<CategoryForm>(categoryFormInit);

const submitForm = async () => {
  await submit(`${categoryApiUrl}/store`, 'POST', () => {
    navigateTo('/categories');
  });
};
</script>
