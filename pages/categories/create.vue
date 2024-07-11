<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create category</div>
      </div>
    </template>
    <AppForm back-url="/categories" @handle-form="handleForm">
      <FormText :form-field="form.name" @update:model-value="handleUpdate(form.name.key, $event)" />
      <FormTextarea
        :form-field="form.description"
        @update:model-value="handleUpdate(form.description.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import FormText from '~/components/form/FormText.vue';
import { useNotificationsStore } from '~/stores/notifications';
import { deepCopy } from '~/utils/deepCopy';
import { categoryFormInit } from '~/components/pages/categories/CategoryInit';
import FormTextarea from '~/components/form/FormTextarea.vue';

const notifications = useNotificationsStore();

const form = reactive(deepCopy(categoryFormInit) as CategoryForm);

const handleUpdate = (key: keyof CategoryForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

const handleForm = async () => {
  // clear validation errors
  Object.entries(form).forEach(([key]) => {
    form[key as keyof CategoryForm].errors = [];
  });

  await $fetch<CategoryListResponse>('http://localhost:8081/api/v1/categories/create', {
    method: 'POST',
    body: Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]))
  })
    .then(() => {
      notifications.addNotification(true, 'Success', 'Category created successfully');
      navigateTo('/categories');
    })
    .catch((e) => {
      let message = 'Something went wrong';
      if (e.response.status === 422) {
        // add validation errors
        Object.entries(e.response._data.data).forEach(([key, value]) => {
          form[key as keyof CategoryForm].errors = value as string[];
        });
        message = 'Validation error';
      }

      notifications.addNotification(false, 'Error', message);

      return {};
    })
    .finally(() => {
      // pending.value = false;
    });
};
</script>
