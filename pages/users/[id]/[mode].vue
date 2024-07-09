<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>User ID: {{ id }}</div>
      </div>
    </template>
    <AppForm :mode="mode">
      <FormText :mode="mode" :form-field="form.name" />
      <FormText :mode="mode" :form-field="form.email" />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useNotificationsStore } from '~/stores/notifications';
import FormText from '~/components/form/FormText.vue';
import AppForm from '~/components/form/AppForm.vue';
import { deepCopy } from '~/utils/deepCopy';
import { userFormInit } from '~/components/users/UserInit';
import type { UpsertMode } from '~/utils/pageMode';

const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };

const notifications = useNotificationsStore();

const form = reactive(deepCopy(userFormInit) as UserForm);
const pending = ref(false);

// GET request
// const { pending, data } = await useAsyncData<UserListResponse>(() =>
//   $fetch('http://localhost:8081/api/v1/users/')
// );

const fetchData = async () => {
  pending.value = true;

  return await $fetch<UserGetResponse>(`http://localhost:8081/api/v1/users/${id}`, {
    method: 'GET'
  })
    .catch(() => {
      notifications.addNotification(false, 'Error', 'Something went wrong');

      return { data: null };
    })
    .finally(() => {
      pending.value = false;
    });
};

onMounted(async () => {
  const user = await fetchData();

  if (user && user.data && user.data.user) {
    Object.entries(form).forEach(([key]) => {
      form[key as keyof UserForm].value = user?.data?.user[key as keyof UserForm];
    });
  }
});
</script>
