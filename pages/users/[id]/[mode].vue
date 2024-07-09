<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>User ID: {{ id }}</div>
      </div>
    </template>
    <AppForm :mode="mode" @handle-form="handleForm">
      <FormText
        :mode="mode"
        :form-field="form.name"
        @update:model-value="handleUpdate(form.name.key, $event)"
      />
      <FormText
        :mode="mode"
        :form-field="form.email"
        @update:model-value="handleUpdate(form.email.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
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

const handleUpdate = (key: keyof UserForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

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

  if (user && user.data && user.data.item) {
    Object.entries(form).forEach(([key]) => {
      form[key as keyof UserForm].value = user?.data?.item[key as keyof UserForm];
    });
  }
});

const handleForm = async () => {
  // clear validation errors
  Object.entries(form).forEach(([key]) => {
    form[key as keyof UserForm].errors = [];
  });

  await $fetch<UserListResponse>(`http://localhost:8081/api/v1/users/${id}`, {
    method: 'POST',
    body: Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]))
  })
    .then((res) => {
      notifications.addNotification(true, 'Success', 'User updated successfully');
      return res;
    })
    .catch((e) => {
      let message = 'Something went wrong';
      if (e.response.status === 422) {
        // add validation errors
        Object.entries(e.response._data.data).forEach(([key, value]) => {
          form[key as keyof UserForm].errors = value as string[];
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
