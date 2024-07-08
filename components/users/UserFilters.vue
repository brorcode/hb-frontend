<template>
  <FilterInteger
    :filter="userFiltersInit.id"
    :value="filters.getFilterValue(userFilterName, userFiltersInit.id.key)"
    @update:filter-text-value="handleUpdate"
  />
  <FilterText
    :filter="userFiltersInit.name"
    :value="filters.getFilterValue(userFilterName, userFiltersInit.name.key)"
    @update:filter-text-value="handleUpdate"
  />
  <FilterTextarea />
</template>

<script setup lang="ts">
import FilterTextarea from '~/components/filters/FilterTextarea.vue';
import FilterText from '~/components/filters/FilterText.vue';
import { userFiltersInit, userFilterName } from '~/components/users/UserInit';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';

const filters = useFiltersStore();
filters.initFilters(userFilterName, userFiltersInit);

const handleUpdate = ({ key, value }: { key: string; value: any }) => {
  filters.addPreSavedFilter(userFilterName, key, value);
};
</script>
