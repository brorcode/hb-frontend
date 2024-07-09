<template>
  <FilterInteger
    :filter="userFiltersInit.id"
    :value="filters.getFilterValue(userFilterName, userFiltersInit.id.key)"
    @update:model-value="handleUpdate(userFiltersInit.id.key, $event)"
  />
  <FilterText
    :filter="userFiltersInit.name"
    :value="filters.getFilterValue(userFilterName, userFiltersInit.name.key)"
    @update:model-value="handleUpdate(userFiltersInit.name.key, $event)"
  />
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { userFilterName, userFiltersInit } from '~/components/users/UserInit';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';

const filters = useFiltersStore();
filters.initFilters(userFilterName, userFiltersInit);

const handleUpdate = (key: keyof UserFilters, value: string) => {
  filters.addPreSavedFilter(userFilterName, key, value);
};
</script>
