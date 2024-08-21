<template>
  <div>
    <FilterInteger
      :filter="categoryFiltersInit.id"
      :value="filters.getFilterValue(categoryFilterName, categoryFiltersInit.id.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.id.key, $event)"
    />
    <FilterText
      :filter="categoryFiltersInit.name"
      :value="filters.getFilterValue(categoryFilterName, categoryFiltersInit.name.key)"
      @update:model-value="handleUpdate(categoryFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import { useFiltersStore } from '~/stores/filters';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import {
  categoryFilterName,
  categoryFiltersInit
} from '~/components/pages/categories/CategoryInit';

const filters = useFiltersStore();
filters.initFilters(categoryFilterName, categoryFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof CategoryFilters, value: string) => {
  filters.addPreSavedFilter(categoryFilterName, key, value);
};
</script>
