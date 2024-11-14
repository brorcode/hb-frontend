<template>
  <AppList
    title="Пользователи"
    title-singular="Пользователя"
    path="/users"
    :api-url="userApiUrl"
    :columns="userColumns"
    :filter-name="userFilterName"
    :filters-component="UserFilters"
    :init-filters="userFiltersInit"
  />
</template>

<script setup lang="ts">
import UserFilters from '~/components/pages/users/UserFilters.vue';
import {
  userApiUrl,
  userColumns,
  userFilterName,
  userFiltersInit,
} from '~/components/pages/users/UserInit';
</script>
