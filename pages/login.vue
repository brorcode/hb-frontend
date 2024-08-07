<template>
  <div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Aute magna irure deserunt veniam aliqua magna enim voluptate.
      </p>
    </div>

    <form class="mx-auto mt-16 max-w-xl sm:mt-20" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <FormText
          type="email"
          :form-field="form.email"
          @update:model-value="handleFieldUpdate(form.email.key, $event)"
        />
        <FormText
          type="password"
          :form-field="form.password"
          @update:model-value="handleFieldUpdate(form.password.key, $event)"
        />
      </div>
      <div class="mt-10">
        <button
          type="submit"
          :disabled="pending"
          class="inline-flex justify-center w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <svg v-if="pending" class="animate-spin mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ pending ? 'Logging in...' : 'Log in' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import FormText from '~/components/form/FormText.vue';
import { loginFormInit } from '~/components/pages/auth/LoginInit';
import { usePersistentState } from '~/composables/usePersistentState';

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
});

const config = useRuntimeConfig();
const { apiFetch } = useApi();
const [, setUser] = usePersistentState<User>('user');
const { form, handleFieldUpdate, submit } = useForm<LoginForm>(loginFormInit);
const pending = ref(false);

const handleSubmit = async () => {
  pending.value = true;
  await apiFetch('GET', '/sanctum/csrf-cookie');
  await submit(config.public.loginUrl, 'POST', (response) => {
    setUser(response);
    navigateTo(config.public.homeUrl, { replace: true });
  });
  pending.value = false;
};
</script>
