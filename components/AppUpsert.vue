<template>
  <div class="space-y-5">
    <AppCard>
      <div class="flex justify-between items-center">
        <div class="flex space-x-3 items-center">
          <button @click.prevent="goBack(path)">
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
            />
          </button>
          <div v-if="!id">
            Довавить {{ title }}
          </div>
          <div v-else>
            {{ title }} ID: {{ id }}
          </div>
        </div>
        <div
          v-if="mode === pageMode.VIEW"
          class="justify-end"
        >
          <NuxtLink
            :to="`${path}/${id}/edit`"
            class="rounded bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Редактировать
          </NuxtLink>
        </div>
      </div>
    </AppCard>

    <AppCard>
      <AppForm
        :back-url="path"
        :pending="pending"
        :mode="mode"
        @submit-form="submitForm"
      >
        <component
          :is="formComponent"
          :form="form"
          :mode="mode"
          :handle-field-update="handleFieldUpdate"
        />
      </AppForm>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import AppForm from '~/components/form/AppForm.vue';
import type { UpsertMode } from '~/utils/pageMode';

const props = defineProps<{
  title: string;
  formComponent: Component;
  formInit: Form<unknown>;
  apiUrl: string;
  path: string;
  hasRelation?: boolean;
}>();

const list = useListStore();
const route = useRoute();
const { id, mode } = route.params as { id: string; mode: UpsertMode };

const { form, pending, handleFieldUpdate, fetchItem, submit } = useForm(
  props.formInit,
);

onMounted(async () => {
  if (id) {
    await fetchItem(props.apiUrl, parseInt(id));
  }
});

const submitForm = async () => {
  if (id) {
    await submit(`${props.apiUrl}/${id}`, 'PUT');
    if (props.hasRelation) {
      list.needRefresh(true);
    }

    return;
  }

  await submit(`${props.apiUrl}/store`, 'POST', () => {
    goBack(props.path);
  });
};
</script>
