import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoanFilters from '~/components/pages/loans/LoanFilters.vue';
import { loanFilterName, loanFiltersInit } from '~/components/pages/loans/LoanInit';
import { useFiltersStore } from '~/stores/filters';

describe('LoanFilters', () => {
  it('renders the filters correctly', async () => {
    const component = await mountSuspended(LoanFilters);

    expect(component.findComponent({ name: 'FilterInteger' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterText' }).exists()).toBe(true);
  });

  it('calls handleUpdate when FilterInteger emits update:model-value', async () => {
    const component = await mountSuspended(LoanFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[loanFilterName][loanFiltersInit.id.key].value).toBeNull();
    // Simulate the update:model-value event on FilterInteger
    await component.findComponent({ name: 'FilterInteger' }).vm.$emit('update:modelValue', 123);

    expect(filtersStore.preSavedFilters[loanFilterName][loanFiltersInit.id.key].value).toEqual(123);
  });

  it('calls handleUpdate when FilterText emits update:model-value', async () => {
    const wrapper = mount(LoanFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[loanFilterName][loanFiltersInit.name.key].value).toEqual('');
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterText' }).vm.$emit('update:modelValue', 'test');

    expect(filtersStore.preSavedFilters[loanFilterName][loanFiltersInit.name.key].value).toEqual('test');
  });
});
