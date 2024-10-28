import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { useFiltersStore } from '@/stores/filters';
import { userFilterName, userFiltersInit } from '@/components/pages/users/UserInit';
import UserFilters from '~/components/pages/users/UserFilters.vue';

describe('UserFilters', () => {
  it('renders the filters correctly', async () => {
    const component = await mountSuspended(UserFilters);

    expect(component.findComponent({ name: 'FilterInteger' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterText' }).exists()).toBe(true);
  });

  it('calls handleUpdate when FilterInteger emits update:model-value', async () => {
    const component = await mountSuspended(UserFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[userFilterName][userFiltersInit.id.key].value).toBeNull();
    // Simulate the update:model-value event on FilterInteger
    await component.findComponent({ name: 'FilterInteger' }).vm.$emit('update:modelValue', 123);

    expect(filtersStore.preSavedFilters[userFilterName][userFiltersInit.id.key].value).toEqual(123);
  });

  it('calls handleUpdate when FilterText emits update:model-value', async () => {
    const wrapper = mount(UserFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[userFilterName][userFiltersInit.name.key].value).toEqual('');
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterText' }).vm.$emit('update:modelValue', 'test');

    expect(filtersStore.preSavedFilters[userFilterName][userFiltersInit.name.key].value).toEqual('test');
  });
});
