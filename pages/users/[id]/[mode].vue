<template>
  <AppUpsert
    title="User"
    :form-component="UserForm"
    :form-init="userFormInit"
    :api-url="userApiUrl"
    path="/users"
  />
</template>

<script setup lang="ts">
import UserForm from '~/components/pages/users/UserForm.vue';
import { userApiUrl, userFormInit } from '~/components/pages/users/UserInit';
</script>
