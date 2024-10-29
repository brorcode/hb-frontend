<template>
  <div>
    <FilterInteger
      :label="tagFiltersInit.id.label"
      :filter-key="tagFiltersInit.id.key"
      :value="filters.getFilterValue<TagFilterFields['id']>(tagFilterName, tagFiltersInit.id.key)"
      @update:model-value="handleUpdate(tagFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="tagFiltersInit.name.label"
      :filter-key="tagFiltersInit.name.key"
      :value="filters.getFilterValue<TagFilterFields['name']>(tagFilterName, tagFiltersInit.name.key)"
      @update:model-value="handleUpdate(tagFiltersInit.name.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { tagFilterName, tagFiltersInit } from '~/components/pages/tags/TagInit';

const filters = useFiltersStore();
filters.initFilters(tagFilterName, tagFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof TagFilters, value: InputValue) => {
  filters.addPreSavedFilter(tagFilterName, key, value);
};
</script>
