<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create User</div>
      </div>
    </template>
    <AppForm back-url="/users" @submit-form="submitForm">
      <FormText
        :form-field="form.name"
        @update:model-value="handleFieldUpdate(form.name.key, $event)"
      />
      <FormText
        :form-field="form.email"
        @update:model-value="handleFieldUpdate(form.email.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import { userApiUrl, userFormInit } from '~/components/pages/users/UserInit';
import FormText from '~/components/form/FormText.vue';
import { deepCopy } from '~/utils/deepCopy';
import { useApi } from '~/composables/useApi';

const { item, handleCreateItem } = useApi(userApiUrl);

const form = reactive(deepCopy(userFormInit) as UserForm);

const handleFieldUpdate = (key: keyof UserForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

const submitForm = async () => {
  // todo do we need to clear form from errors before submit if I clear field on handleFieldUpdate
  // Object.entries(form).forEach(([key]) => {
  //   form[key as keyof UserForm].errors = [];
  // });

  const body = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]));

  await handleCreateItem(body);
  if (item.value?.error?.code === 'UNPROCESSABLE_ENTITY') {
    Object.entries(item.value?.error?.details || {}).forEach(([key, value]) => {
      form[key as keyof UserForm].errors = value as string[];
    });
  }

  if (!item.value?.error) {
    navigateTo('/users');
  }
};
</script>
