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
import { type RelationResource, useResourceRelation } from '~/composables/useResourceRelation';

const props = defineProps<{
  title: string;
  formComponent: Component;
  formInit: Form<unknown>;
  apiUrl: string;
  path: string;
  hasRelation?: boolean;
  relationResource?: RelationResource;
}>();

const list = useListStore();
const route = useRoute();
const { id, mode } = route.params as { id?: string; mode?: UpsertMode };
const { initRelation, clearRelation } = useResourceRelation(props.formInit);

const { form, pending, handleFieldUpdate, fetchItem, submit } = useForm(props.formInit);

onMounted(async () => {
  // when component is being mounted it needs to clear relation
  clearRelation();

  if (id && mode) {
    await fetchItem(props.apiUrl, parseInt(id));

    // when a resource is being edited/viewed and has relation it needs to store it in the persistent state
    if (props.hasRelation && props.relationResource) {
      const _form = form as Form;
      initRelation(
        props.relationResource.key,
        props.relationResource.resource,
        parseInt(id),
        _form.name.value as string,
      );
    }
  }
});

const submitForm = async () => {
  if (id && !mode) {
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
