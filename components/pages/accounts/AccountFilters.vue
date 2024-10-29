<template>
  <div>
    <FilterInteger
      :label="accountFiltersInit.id.label"
      :filter-key="accountFiltersInit.id.key"
      :value="filters.getFilterValue<AccountFilterFields['id']>(accountFilterName, accountFiltersInit.id.key)"
      @update:model-value="handleUpdate(accountFiltersInit.id.key, $event)"
    />
    <FilterText
      :label="accountFiltersInit.name.label"
      :filter-key="accountFiltersInit.name.key"
      :value="filters.getFilterValue<AccountFilterFields['name']>(accountFilterName, accountFiltersInit.name.key)"
      @update:model-value="handleUpdate(accountFiltersInit.name.key, $event)"
    />
    <FilterCheckbox
      :label="accountFiltersInit.show_archived.label"
      :filter-key="accountFiltersInit.show_archived.key"
      :value="filters.getFilterValue<AccountFilterFields['show_archived']>(accountFilterName, accountFiltersInit.name.key)"
      @update:model-value="handleUpdate(accountFiltersInit.show_archived.key, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterText from '~/components/filters/FilterText.vue';
import FilterInteger from '~/components/filters/FilterInteger.vue';
import { accountFilterName, accountFiltersInit } from '~/components/pages/accounts/AccountInit';
import FilterCheckbox from '~/components/filters/FilterCheckbox.vue';

const filters = useFiltersStore();
filters.initFilters(accountFilterName, accountFiltersInit);

// todo it needs to refactor and send update filter as event to parent component.
// in this case it doesn't need to have preSavedFilter status at all
const handleUpdate = (key: keyof AccountFilters, value: InputValue) => {
  filters.addPreSavedFilter(accountFilterName, key, value);
};
</script>
