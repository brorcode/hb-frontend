<template>
  <AppUpsert
    title="Аккаунт"
    :form-component="AccountForm"
    :form-init="accountFormInit"
    :api-url="accountApiUrl"
    path="/accounts"
  />
</template>

<script setup lang="ts">
import AccountForm from '~/components/pages/accounts/AccountForm.vue';
import { accountApiUrl, accountFormInit } from '~/components/pages/accounts/AccountInit';
</script>
