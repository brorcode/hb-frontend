import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import FilterSelect from '~/components/filters/FilterSelect.vue';

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

describe('FilterSelect', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterSelect, {
      props: {
        label: 'Select label',
        filterKey: 'select',
        apiUrl: '/api/',
        value: {
          id: 1,
          name: 'item for select list 1',
        },
      },
    });

    expect(component.html()).toContain('Select label');
    expect(component.html()).toContain('item for select list 2');
  });

  it('can emit the correct event when the select value changes', async () => {
    const component = await mountSuspended(FilterSelect, {
      props: {
        label: 'Select label',
        filterKey: 'select',
        apiUrl: '/api/',
        value: {
          id: 2,
          name: 'item for select list 2',
        },
      },
    });

    const input = component.find('.multiselect');
    await input.trigger('click');
    const selectOptions = component.findAll('.multiselect-option');
    await selectOptions.at(0)?.trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[]>)[0]).toEqual([
      {
        id: 1,
        name: 'item for select list 1',
      },
    ]);
  });
});
