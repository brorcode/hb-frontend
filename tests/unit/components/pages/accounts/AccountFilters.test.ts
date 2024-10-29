import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AccountFilters from '~/components/pages/accounts/AccountFilters.vue';
import { accountFilterName, accountFiltersInit } from '~/components/pages/accounts/AccountInit';
import { useFiltersStore } from '~/stores/filters';

describe('AccountFilters', () => {
  it('renders the filters correctly', async () => {
    const component = await mountSuspended(AccountFilters);

    expect(component.findComponent({ name: 'FilterInteger' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterText' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterCheckbox' }).exists()).toBe(true);
  });

  it('calls handleUpdate when FilterInteger emits update:model-value', async () => {
    const component = await mountSuspended(AccountFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.id.key].value).toBeNull();
    // Simulate the update:model-value event on FilterInteger
    await component.findComponent({ name: 'FilterInteger' }).vm.$emit('update:modelValue', 123);

    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.id.key].value).toEqual(123);
  });

  it('calls handleUpdate when FilterText emits update:model-value', async () => {
    const wrapper = mount(AccountFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.name.key].value).toEqual('');
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterText' }).vm.$emit('update:modelValue', 'test');

    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.name.key].value).toEqual('test');
  });

  it('calls handleUpdate when FilterCheckbox emits update:model-value', async () => {
    const wrapper = mount(AccountFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.show_archived.key].value).toBeNull();
    // Simulate the update:model-value event on FilterCheckbox
    await wrapper.findComponent({ name: 'FilterCheckbox' }).vm.$emit('update:modelValue', true);
    expect(filtersStore.preSavedFilters[accountFilterName][accountFiltersInit.show_archived.key].value).toBeTruthy();
  });
});
