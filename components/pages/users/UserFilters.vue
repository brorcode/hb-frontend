<template>
  <div>
    <FilterInteger
      :label="userFiltersInit.id.label"
      :filter-key="userFiltersInit.id.key"
      :value="filters.getFilterValue<UserFilterFields['id']>(userFilterName, userFiltersInit.id.key)"
      @update:model-value="handleUpdate(userFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="userFiltersInit.name.label"
      :filter-key="userFiltersInit.name.key"
      :value="filters.getFilterValue<UserFilterFields['name']>(userFilterName, userFiltersInit.name.key)"
      @update:model-value="handleUpdate(userFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterInteger from '~/components/filters/FilterInteger.vue';
import FilterText from '~/components/filters/FilterText.vue';
import { userFilterName, userFiltersInit } from '~/components/pages/users/UserInit';
import { useFiltersStore } from '~/stores/filters';

const filters = useFiltersStore();
filters.initFilters(userFilterName, userFiltersInit);

const handleUpdate = (key: keyof UserFilters, value: InputValue) => {
  filters.addPreSavedFilter(userFilterName, key, value);
};
</script>
