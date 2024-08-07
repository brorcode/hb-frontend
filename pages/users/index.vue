<template>
  <AppList
    title="Users"
    title-singular="User"
    url="/users"
    :api-url="userApiUrl"
    :columns="userColumns"
    :filter-name="userFilterName"
    :init-filters="userFiltersInit"
  >
    <template #filters>
      <LazyPagesUsersUserFilters />
    </template>
  </AppList>
</template>

<script setup lang="ts">
import {
  userApiUrl,
  userColumns,
  userFilterName,
  userFiltersInit
} from '~/components/pages/users/UserInit';
</script>
