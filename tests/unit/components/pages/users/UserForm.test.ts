import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormText from '~/components/form/FormText.vue';
import UserForm from '~/components/pages/users/UserForm.vue';
import { userFormInit } from '~/components/pages/users/UserInit';

let wrapper: VueWrapper;
const form = userFormInit;
const handleFieldUpdate = vi.fn();

describe('UserForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(UserForm, {
      props: {
        form,
        mode: pageMode.EDIT,
        handleFieldUpdate,
      },
    });
  });

  it('renders FormText component for name with correct props', () => {
    const formTextName = wrapper.findAllComponents(FormText)[0];
    expect(formTextName.exists()).toBe(true);
    expect(formTextName.props('label')).toBe(form.name.label);
    expect(formTextName.props('fieldKey')).toBe(form.name.key);
    expect(formTextName.props('value')).toBe(form.name.value);
    expect(formTextName.props('errors')).toBe(form.name.errors);
    expect(formTextName.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formTextName.vm.$emit('update:modelValue', 'Some Name');
    expect(handleFieldUpdate).toHaveBeenCalledWith('name', 'Some Name');
  });

  it('renders FormText component for email with correct props', () => {
    const formTextEmail = wrapper.findAllComponents(FormText)[1];
    expect(formTextEmail.exists()).toBe(true);
    expect(formTextEmail.props('label')).toBe(form.email.label);
    expect(formTextEmail.props('fieldKey')).toBe(form.email.key);
    expect(formTextEmail.props('value')).toBe(form.email.value);
    expect(formTextEmail.props('type')).toBe('email');
    expect(formTextEmail.props('errors')).toBe(form.email.errors);
    expect(formTextEmail.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formTextEmail.vm.$emit('update:modelValue', 'test@test.test');
    expect(handleFieldUpdate).toHaveBeenCalledWith('email', 'test@test.test');
  });

  it('renders FormText component for password with correct props', () => {
    const formTextPw = wrapper.findAllComponents(FormText)[2];
    expect(formTextPw.exists()).toBe(true);
    expect(formTextPw.props('label')).toBe(form.password.label);
    expect(formTextPw.props('fieldKey')).toBe(form.password.key);
    expect(formTextPw.props('value')).toBe(form.password.value);
    expect(formTextPw.props('type')).toBe('password');
    expect(formTextPw.props('errors')).toBe(form.password.errors);
    expect(formTextPw.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formTextPw.vm.$emit('update:modelValue', '12345');
    expect(handleFieldUpdate).toHaveBeenCalledWith('password', '12345');
  });

  it('renders FormText component for password_confirmation with correct props', () => {
    const formTextPwConf = wrapper.findAllComponents(FormText)[3];
    expect(formTextPwConf.exists()).toBe(true);
    expect(formTextPwConf.props('label')).toBe(form.password_confirmation.label);
    expect(formTextPwConf.props('fieldKey')).toBe(form.password_confirmation.key);
    expect(formTextPwConf.props('value')).toBe(form.password_confirmation.value);
    expect(formTextPwConf.props('type')).toBe('password');
    expect(formTextPwConf.props('errors')).toBe(form.password_confirmation.errors);
    expect(formTextPwConf.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formTextPwConf.vm.$emit('update:modelValue', '12345');
    expect(handleFieldUpdate).toHaveBeenCalledWith('password_confirmation', '12345');
  });
});
