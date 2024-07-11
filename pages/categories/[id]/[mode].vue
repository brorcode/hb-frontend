<template>
  <AppUpsert>
    <template #header>
      <div class="flex space-x-3 items-center">
        <NuxtLink to="/categories"><ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /></NuxtLink>
        <div>Category ID: {{ id }}</div>
      </div>
    </template>
    <AppForm back-url="/categories" :mode="mode" @handle-form="handleForm">
      <FormText
        :mode="mode"
        :form-field="form.name"
        @update:model-value="handleUpdate(form.name.key, $event)"
      />
      <FormTextarea
        :mode="mode"
        :form-field="form.description"
        @update:model-value="handleUpdate(form.description.key, $event)"
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
import type { UpsertMode } from '~/utils/pageMode';
import { categoryFormInit } from '~/components/pages/categories/CategoryInit';
import FormTextarea from '~/components/form/FormTextarea.vue';

const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };

const notifications = useNotificationsStore();

const form = reactive(deepCopy(categoryFormInit) as CategoryForm);
const pending = ref(false);

const handleUpdate = (key: keyof CategoryForm, value: string) => {
  form[key].errors = [];
  form[key].value = value;
};

const fetchData = async () => {
  pending.value = true;

  return await $fetch<CategoryGetResponse>(`http://localhost:8081/api/v1/categories/${id}`, {
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
  const category = await fetchData();

  if (category && category.data && category.data.item) {
    Object.entries(form).forEach(([key]) => {
      form[key as keyof CategoryForm].value = category?.data?.item[key as keyof CategoryForm];
    });
  }
});

const handleForm = async () => {
  // clear validation errors
  Object.entries(form).forEach(([key]) => {
    form[key as keyof CategoryForm].errors = [];
  });

  await $fetch<CategoryListResponse>(`http://localhost:8081/api/v1/categories/${id}`, {
    method: 'POST',
    body: Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]))
  })
    .then((res) => {
      notifications.addNotification(true, 'Success', 'Category updated successfully');
      return res;
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
