import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import FilterMultiSelect from '~/components/filters/FilterMultiSelect.vue';

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
        {
          id: 3,
          name: 'item for select list 3',
        },
      ],
    },
    fetchData: vi.fn(),
  });
});

describe('FilterMultiSelect', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterMultiSelect, {
      props: {
        label: 'Select label',
        filterKey: 'select',
        apiUrl: '/api/',
        value: [
          {
            id: 1,
            name: 'item for select list 1',
          },
          {
            id: 3,
            name: 'item for select list 3',
          },
        ],
      },
    });

    expect(component.html()).toContain('Select label');
    expect(component.html()).toContain('item for select list 2');
    expect(component.html()).toContain('item for select list 3');
  });

  it('can emit the correct event when the multi select value changes', async () => {
    const component = await mountSuspended(FilterMultiSelect, {
      props: {
        label: 'Select label',
        filterKey: 'select',
        apiUrl: '/api/',
        value: [
          {
            id: 2,
            name: 'item for select list 2',
          },
          {
            id: 3,
            name: 'item for select list 3',
          },
        ],
      },
    });

    const input = component.find('.multiselect');
    await input.trigger('click');
    const selectOptions = component.findAll('.multiselect-option');
    await selectOptions.at(0)?.trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[][]>)[0][0]).toEqual([
      {
        id: 2,
        name: 'item for select list 2',
      },
      {
        id: 3,
        name: 'item for select list 3',
      },
      {
        id: 1,
        name: 'item for select list 1',
      },
    ]);
  });
});
