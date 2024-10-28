import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import LoanForm from '~/components/pages/loans/LoanForm.vue';
import FormText from '~/components/form/FormText.vue';
import { loanFormInit } from '~/components/pages/loans/LoanInit';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryLoanTypesApiUrl } from '~/utils/dictionary';
import FormMoney from '~/components/form/FormMoney.vue';
import FormDateTime from '~/components/form/FormDateTime.vue';

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
const form = loanFormInit;
const handleFieldUpdate = vi.fn();

describe('LoanForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(LoanForm, {
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
    expect(formSelect.props('label')).toBe(form.type_id.label);
    expect(formSelect.props('fieldKey')).toBe(form.type_id.key);
    expect(formSelect.props('relationValue')).toBe(form.type_id.value);
    expect(formSelect.props('errors')).toBe(form.type_id.errors);
    expect(formSelect.props('mode')).toBe(pageMode.EDIT);
    expect(formSelect.props('disabled')).toBeFalsy();
    expect(formSelect.props('apiUrl')).toBe(dictionaryLoanTypesApiUrl);
    expect(formSelect.props('searchable')).toBeFalsy();

    // Simulate update event
    formSelect.vm.$emit('update:modelValue', 10);
    expect(handleFieldUpdate).toHaveBeenCalledWith('type_id', 10);
  });

  it('renders FormMoney component with correct props', () => {
    const formMoney = wrapper.findComponent(FormMoney);
    expect(formMoney.exists()).toBe(true);
    expect(formMoney.props('label')).toBe(form.amount.label);
    expect(formMoney.props('fieldKey')).toBe(form.amount.key);
    expect(formMoney.props('value')).toBe(form.amount.value);
    expect(formMoney.props('errors')).toBe(form.amount.errors);
    expect(formMoney.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formMoney.vm.$emit('update:modelValue', 10.22);
    expect(handleFieldUpdate).toHaveBeenCalledWith('amount', 10.22);
  });

  it('renders FormDateTime component with correct props', () => {
    const formDateTime = wrapper.findComponent(FormDateTime);
    expect(formDateTime.exists()).toBe(true);
    expect(formDateTime.props('label')).toBe(form.deadline_on.label);
    expect(formDateTime.props('fieldKey')).toBe(form.deadline_on.key);
    expect(formDateTime.props('value')).toBe(form.deadline_on.value);
    expect(formDateTime.props('errors')).toBe(form.deadline_on.errors);
    expect(formDateTime.props('mode')).toBe(pageMode.EDIT);
    expect(formDateTime.props('enableTimePicker')).toBeFalsy();

    // Simulate update event
    const date = new Date();
    formDateTime.vm.$emit('update:modelValue', date);
    expect(handleFieldUpdate).toHaveBeenCalledWith('deadline_on', date);
  });
});
