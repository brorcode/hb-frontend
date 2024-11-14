import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormText from '~/components/form/FormText.vue';
import { categoryFormInit } from '~/components/pages/categories/CategoryInit';
import CategoryParentForm from '~/components/pages/categories/CategoryParentForm.vue';

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

let wrapper: VueWrapper;
const form = categoryFormInit;
const handleFieldUpdate = vi.fn();

describe('CategoryParentForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(CategoryParentForm, {
      props: {
        form,
        mode: pageMode.EDIT,
        handleFieldUpdate,
      },
    });
  });

  it('renders FormText component with correct props', () => {
    const formText = wrapper.findComponent(FormText);
    expect(formText.exists()).toBe(true);
    expect(formText.props('label')).toBe(form.name.label);
    expect(formText.props('fieldKey')).toBe(form.name.key);
    expect(formText.props('value')).toBe(form.name.value);
    expect(formText.props('errors')).toBe(form.name.errors);
    expect(formText.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formText.vm.$emit('update:modelValue', 'Some Name');
    expect(handleFieldUpdate).toHaveBeenCalledWith('name', 'Some Name');
  });
});
