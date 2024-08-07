<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create User</div>
      </div>
    </template>
    <AppForm back-url="/users" :pending="pending" @submit-form="submitForm">
      <UserForm :form="form" :handle-field-update="handleFieldUpdate" />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import { userApiUrl, userFormInit } from '~/components/pages/users/UserInit';
import UserForm from '~/components/pages/users/UserForm.vue';

const { form, pending, handleFieldUpdate, submit } = useForm<UserForm>(userFormInit);

const submitForm = async () => {
  await submit(`${userApiUrl}/create`, 'POST', () => {
    navigateTo('/users');
  });
};
</script>
