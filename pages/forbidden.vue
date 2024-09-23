<template>
  <AppCard>
    <div class="flex justify-between items-center">
      <div>Доступ запрещен</div>
      <div class="flex justify-end">
        <button
          class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="goBack(config.public.homeUrl)"
        >
          Назад
        </button>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { userFormInit } from '~/components/pages/users/UserInit';

const config = useRuntimeConfig();
const { fetchUser } = useForm<UserFormFields, User>(userFormInit);

onMounted(async () => {
  await fetchUser();
});
</script>
