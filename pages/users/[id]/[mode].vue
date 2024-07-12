<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/users"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>User ID: {{ id }}</div>
      </div>
    </template>
    <AppForm back-url="/users" :mode="mode" @submit-form="submitForm">
      <FormText
        :mode="mode"
        :form-field="form.name"
        @update:model-value="handleFieldUpdate(form.name.key, $event)"
      />
      <FormText
        :mode="mode"
        :form-field="form.email"
        @update:model-value="handleFieldUpdate(form.email.key, $event)"
      />
    </AppForm>
  </AppUpsert>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import FormText from '~/components/form/FormText.vue';
import AppForm from '~/components/form/AppForm.vue';
import { deepCopy } from '~/utils/deepCopy';
import { userApiUrl, userFormInit } from '~/components/pages/users/UserInit';
import type { UpsertMode } from '~/utils/pageMode';
import { useApi } from '~/composables/useApi';

const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };

const { item, fetchItem, handleUpdateItem } = useApi(userApiUrl);

const form = reactive(deepCopy(userFormInit) as UserForm);

const handleFieldUpdate = (key: keyof UserForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

onMounted(async () => {
  await fetchItem(parseInt(id));

  if (item.value?.data?.item) {
    Object.entries(form).forEach(([key]) => {
      form[key as keyof UserForm].value = item.value?.data?.item[key as keyof UserForm];
    });
  }
});

const submitForm = () => {
  // todo it return form we need to update form with new data
  handleUpdateItem(form, parseInt(id));
};
</script>
