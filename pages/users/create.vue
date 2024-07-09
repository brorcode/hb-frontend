<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Create User</div>
      </div>
    </template>
    <AppForm @handle-form="handleForm">
      <FormText :form-field="form.name" @update:model-value="handleUpdate(form.name.key, $event)" />
      <FormText
        :form-field="form.email"
        @update:model-value="handleUpdate(form.email.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import AppUpsert from '~/components/AppUpsert.vue';
import AppForm from '~/components/form/AppForm.vue';
import { userFormInit } from '~/components/users/UserInit';
import FormText from '~/components/form/FormText.vue';
import { useNotificationsStore } from '~/stores/notifications';
import { deepCopy } from '~/utils/deepCopy';

const notifications = useNotificationsStore();

const form = reactive(deepCopy(userFormInit) as UserForm);

const handleUpdate = (key: keyof UserForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

const handleForm = async () => {
  // clear validation errors
  Object.entries(form).forEach(([key]) => {
    form[key as keyof UserForm].errors = [];
  });

  await $fetch<UserListResponse>('http://localhost:8081/api/v1/users/create', {
    method: 'POST',
    body: Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]))
  })
    .then(() => {
      notifications.addNotification(true, 'Success', 'User created successfully');
      navigateTo('/users');
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
