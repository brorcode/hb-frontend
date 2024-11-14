import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { categoryFiltersInit, categoryParentFilterName } from '~/components/pages/categories/CategoryInit';
import CategoryParentFilters from '~/components/pages/categories/CategoryParentFilters.vue';
import { useFiltersStore } from '~/stores/filters';

mockNuxtImport('useApi', () => {
  return () => ({
    pending: false,
    items: {
      value: [
        {
          id: 1,
          name: 'item for select list 1',
        },
        {
          id: 2,
          name: 'item for select list 2',
        },
      ],
    },
    fetchData: vi.fn(),
  });
});

describe('CategoryParentFilters', () => {
  it('renders the filters correctly', async () => {
    const component = await mountSuspended(CategoryParentFilters);

    expect(component.findComponent({ name: 'FilterInteger' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterText' }).exists()).toBe(true);
  });

  it('calls handleUpdate when FilterInteger emits update:model-value', async () => {
    const component = await mountSuspended(CategoryParentFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[categoryParentFilterName][categoryFiltersInit.id.key].value).toBeNull();
    // Simulate the update:model-value event on FilterInteger
    await component.findComponent({ name: 'FilterInteger' }).vm.$emit('update:modelValue', 123);

    expect(filtersStore.preSavedFilters[categoryParentFilterName][categoryFiltersInit.id.key].value).toEqual(123);
  });

  it('calls handleUpdate when FilterText emits update:model-value', async () => {
    const wrapper = mount(CategoryParentFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[categoryParentFilterName][categoryFiltersInit.name.key].value).toEqual('');
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterText' }).vm.$emit('update:modelValue', 'test');

    expect(filtersStore.preSavedFilters[categoryParentFilterName][categoryFiltersInit.name.key].value).toEqual('test');
  });
});
