import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import AccountForm from '~/components/pages/accounts/AccountForm.vue';
import { accountFormInit } from '@/components/pages/accounts/AccountInit';
import FormText from '~/components/form/FormText.vue';
import { FormCheckbox } from '#components';

let wrapper: VueWrapper;
const form = accountFormInit;
const handleFieldUpdate = vi.fn();

describe('AccountForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AccountForm, {
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

  it('renders FormCheckbox component with correct props', () => {
    const formCheckbox = wrapper.findComponent(FormCheckbox);
    expect(formCheckbox.exists()).toBe(true);
    expect(formCheckbox.props('label')).toBe(form.is_archived.label);
    expect(formCheckbox.props('fieldKey')).toBe(form.is_archived.key);
    expect(formCheckbox.props('value')).toBe(form.is_archived.value);
    expect(formCheckbox.props('errors')).toBe(form.is_archived.errors);
    expect(formCheckbox.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formCheckbox.vm.$emit('update:modelValue', true);
    expect(handleFieldUpdate).toHaveBeenCalledWith('is_archived', true);
  });
});
