<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>User ID: {{ id }}</div>
      </div>
    </template>
    <AppForm back-url="/users" :pending="pending" :mode="mode" @submit-form="submitForm">
      <UserForm :form="form" :mode="mode" :handle-field-update="handleFieldUpdate" />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppForm from '~/components/form/AppForm.vue';
import { userApiUrl, userFormInit } from '~/components/pages/users/UserInit';
import type { UpsertMode } from '~/utils/pageMode';
import UserForm from '~/components/pages/users/UserForm.vue';

const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };
const { form, pending, handleFieldUpdate, fetchItem, submit } = useForm<UserForm>(userFormInit);

onMounted(async () => {
  await fetchItem(userApiUrl, parseInt(id));
});

const submitForm = async () => {
  await submit(`${userApiUrl}/${id}`, 'PUT');
};
</script>
