<template>
  <div class="space-y-5">
    <AppCard>
      <div class="flex justify-between items-center">
        <div class="flex space-x-3 items-center">
          {{ user?.name }}
        </div>
        <div
          v-if="!user?.has_verified_email"
          class="justify-end"
        >
          <button
            class="rounded bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            @click.prevent="confirmEmail"
          >
            Подтвердить Email
          </button>
        </div>
      </div>
    </AppCard>

    <AppCard>
      <div
        v-if="!user?.has_verified_email"
        class="text-red-600 mb-3"
      >
        Ваша электронная почта не подтверждена.
      </div>
      <AppForm
        back-url="/transactions"
        :pending="pending"
        :mode="pageMode.EDIT"
        @submit-form="submitForm"
      >
        <UserForm
          :form="form"
          :mode="pageMode.EDIT"
          :handle-field-update="handleFieldUpdate"
        />
      </AppForm>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import AppForm from '~/components/form/AppForm.vue';
import UserForm from '~/components/pages/users/UserForm.vue';
import { userFormInit, userProfileApiUrl } from '~/components/pages/users/UserInit';
import { usePersistentState } from '~/composables/usePersistentState';
import { pageMode } from '~/utils/pageMode';

const config = useRuntimeConfig();
const [user, setUser] = usePersistentState<User>('user');
const { form, handleFieldUpdate, fetchUser, submit } = useForm<UserFormFields, User>(userFormInit);
const pending = ref(false);

onMounted(async () => {
  await fetchUser();
});

const submitForm = async () => {
  await submit(userProfileApiUrl, 'PUT', (response: UserGetResponse) => {
    setUser(response.data as User);
  });
};

const confirmEmail = async () => {
  await submit(config.public.apiSendEmailToVerifyEmailUrl, 'POST');
};
</script>
