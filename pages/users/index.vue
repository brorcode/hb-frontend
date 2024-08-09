<template>
  <AppList
    title="Users"
    title-singular="User"
    url="/users"
    :api-url="userApiUrl"
    :columns="userColumns"
    :filter-name="userFilterName"
    :filters-component="LazyPagesUsersUserFilters"
    :init-filters="userFiltersInit"
  >
  </AppList>
</template>

<script setup lang="ts">
import {
  userApiUrl,
  userColumns,
  userFilterName,
  userFiltersInit
} from '~/components/pages/users/UserInit';
import { LazyPagesUsersUserFilters } from '#components';
</script>
