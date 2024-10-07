<template>
  <AppUpsert
    title="Долг"
    :form-component="LoanForm"
    :form-init="loanFormInit"
    :api-url="loanApiUrl"
    path="/loans"
  />
</template>

<script setup lang="ts">
import LoanForm from '~/components/pages/loans/LoanForm.vue';
import { loanApiUrl, loanFormInit } from '~/components/pages/loans/LoanInit';
</script>
