import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormSelect from '~/components/form/FormSelect.vue';
import FormText from '~/components/form/FormText.vue';
import CategoryChildForm from '~/components/pages/categories/CategoryChildForm.vue';
import { categoryFormInit } from '~/components/pages/categories/CategoryInit';
import { dictionaryCategoriesParentApiUrl } from '~/utils/dictionary';

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

describe('CategoryChildForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(CategoryChildForm, {
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

  it('renders FormSelect component with correct props', () => {
    const formSelect = wrapper.findComponent(FormSelect);
    expect(formSelect.exists()).toBe(true);
    expect(formSelect.props('label')).toBe(form.parent_id.label);
    expect(formSelect.props('fieldKey')).toBe(form.parent_id.key);
    expect(formSelect.props('relationValue')).toBe(form.parent_id.value);
    expect(formSelect.props('errors')).toBe(form.parent_id.errors);
    expect(formSelect.props('mode')).toBe(pageMode.EDIT);
    expect(formSelect.props('disabled')).toBeFalsy();
    expect(formSelect.props('apiUrl')).toBe(dictionaryCategoriesParentApiUrl);
    expect(formSelect.props('searchable')).toBeTruthy();

    // Simulate update event
    formSelect.vm.$emit('update:modelValue', 10);
    expect(handleFieldUpdate).toHaveBeenCalledWith('parent_id', 10);
  });
});
