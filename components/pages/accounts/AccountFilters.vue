<template>
  <div>
    <FilterInteger
      :filter="accountFiltersInit.id"
      :value="filters.getFilterValue(accountFilterName, accountFiltersInit.id.key)"
      @update:model-value="handleUpdate(accountFiltersInit.id.key, $event)"
    />
    <FilterText
      :filter="accountFiltersInit.name"
      :value="filters.getFilterValue(accountFilterName, accountFiltersInit.name.key)"
      @update:model-value="handleUpdate(accountFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { accountFilterName, accountFiltersInit } from '~/components/pages/accounts/AccountInit';

const filters = useFiltersStore();
filters.initFilters(accountFilterName, accountFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof AccountFilters, value: string) => {
  filters.addPreSavedFilter(accountFilterName, key, value);
};
</script>
