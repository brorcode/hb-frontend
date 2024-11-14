<template>
  <div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Подтверждение электронной почты
      </h2>

      <p class="mt-2 text-lg leading-8 text-gray-600">
        Уже есть учетная запись?
        <NuxtLink
          class="text-indigo-500 hover:text-indigo-700"
          to="/login"
        >
          Вход
        </NuxtLink>
      </p>
    </div>

    <div class="flex mt-12 items-center justify-center">
      <svg
        class="animate-spin mr-3 h-5 w-5 text-indigo-600"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersistentState } from '~/composables/usePersistentState';

definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});

const { apiFetch } = useApi();
const [, setUser] = usePersistentState<User>('user');

const { fullPath } = useRoute();

onMounted(async () => {
  await verify();
});

const verify = async () => {
  await apiFetch('GET', '/sanctum/csrf-cookie');
  try {
    const response = await apiFetch<BaseItemResponse<Row>>('GET', fullPath);
    const user = response?.data as User;
    if (user) {
      setUser(user);
    }
  }
  catch (e) {
    return e;
  }
  finally {
    navigateTo('/profile', { replace: true });
  }
};
</script>
