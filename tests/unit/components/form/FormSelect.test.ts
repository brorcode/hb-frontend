import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import FormSelect from '~/components/form/FormSelect.vue';
import { pageMode } from '~/utils/pageMode';

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

describe('FormSelect', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormSelect, {
      props: {
        label: 'Select label',
        fieldKey: 'select',
        apiUrl: '/api/',
        relationValue: {
          id: 2,
          name: 'item for select list 2',
        },
        errors: [],
      },
    });

    expect(component.html()).toContain('Select label');
    expect(component.html()).toContain('item for select list 2');
  });

  it('can emit the correct event when the select value changes', async () => {
    const component = await mountSuspended(FormSelect, {
      props: {
        label: 'Select label',
        fieldKey: 'select',
        apiUrl: '/api/',
        relationValue: {
          id: 2,
          name: 'item for select list 2',
        },
        errors: [],
      },
    });

    const input = component.find('.multiselect');
    await input.trigger('click');
    const selectOptions = component.findAll('.multiselect-option');
    await selectOptions.at(0)?.trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      1,
    ]);
  });

  it('can display errors', async () => {
    const component = await mountSuspended(FormSelect, {
      props: {
        label: 'Select label',
        fieldKey: 'select',
        apiUrl: '/api/',
        errors: ['Select is required'],
      },
    });

    expect(component.html()).toContain('Select is required');
  });

  it('should disable select when mode is view', async () => {
    const component = await mountSuspended(FormSelect, {
      props: {
        label: 'Select label',
        fieldKey: 'select',
        apiUrl: '/api/',
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const multiselect = component.find('.multiselect');
    expect(multiselect.classes()).toContain('is-disabled');
  });
});
