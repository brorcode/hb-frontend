import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormCheckbox from '~/components/form/FormCheckbox.vue';
import FormDateTime from '~/components/form/FormDateTime.vue';
import FormMoney from '~/components/form/FormMoney.vue';
import FormSelect from '~/components/form/FormSelect.vue';
import TransactionForm from '~/components/pages/transactions/TransactionForm.vue';
import { transactionFormInit } from '~/components/pages/transactions/TransactionInit';

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
const form = transactionFormInit;
const handleFieldUpdate = vi.fn();

describe('TransactionForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(TransactionForm, {
      props: {
        form,
        mode: pageMode.EDIT,
        handleFieldUpdate,
      },
    });
  });

  it('renders FormMoney component with correct props', () => {
    const formMoneyComponent = wrapper.findComponent(FormMoney);
    expect(formMoneyComponent.exists()).toBe(true);
    expect(formMoneyComponent.props('label')).toBe(form.amount.label);
    expect(formMoneyComponent.props('fieldKey')).toBe(form.amount.key);
    expect(formMoneyComponent.props('value')).toBe(form.amount.value);
    expect(formMoneyComponent.props('errors')).toBe(form.amount.errors);
    expect(formMoneyComponent.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formMoneyComponent.vm.$emit('update:modelValue', 22.21);
    expect(handleFieldUpdate).toHaveBeenCalledWith('amount', 22.21);
  });

  it('renders FormSelect component with correct props', () => {
    const testCases = [
      { key: 'category_id', form: form.category_id, apiUrl: dictionaryCategoriesChildApiUrl },
      { key: 'account_id', form: form.account_id, apiUrl: dictionaryAccountsApiUrl },
      { key: 'loan_id', form: form.loan_id, apiUrl: dictionaryLoansApiUrl },
    ];

    testCases.forEach(async ({ key, form, apiUrl }, index) => {
      const formSelectComponent = wrapper.findAllComponents(FormSelect)[index];
      expect(formSelectComponent.exists()).toBe(true);
      expect(formSelectComponent.props('label')).toBe(form.label);
      expect(formSelectComponent.props('fieldKey')).toBe(form.key);
      expect(formSelectComponent.props('relationValue')).toBe(form.relation_value);
      expect(formSelectComponent.props('apiUrl')).toBe(apiUrl);
      expect(formSelectComponent.props('errors')).toBe(form.errors);
      expect(formSelectComponent.props('mode')).toBe(pageMode.EDIT);

      // Simulate update event
      formSelectComponent.vm.$emit('update:modelValue', 2);
      expect(handleFieldUpdate).toHaveBeenCalledWith(key, 2);
    });
  });

  it('renders FormDateTime component with correct props', () => {
    const formDateTimeComponent = wrapper.findComponent(FormDateTime);
    expect(formDateTimeComponent.exists()).toBe(true);
    expect(formDateTimeComponent.props('label')).toBe(form.created_at.label);
    expect(formDateTimeComponent.props('fieldKey')).toBe(form.created_at.key);
    expect(formDateTimeComponent.props('value')).toBe(form.created_at.value);
    expect(formDateTimeComponent.props('errors')).toBe(form.created_at.errors);
    expect(formDateTimeComponent.props('mode')).toBe(pageMode.EDIT);

    const date = new Date();
    // Simulate update event
    formDateTimeComponent.vm.$emit('update:modelValue', date);
    expect(handleFieldUpdate).toHaveBeenCalledWith('created_at', date);
  });

  it('renders FormCheckbox component with correct props', () => {
    const testCases = [
      { key: 'is_debit', form: form.is_debit },
      { key: 'is_transfer', form: form.is_transfer },
    ];

    testCases.forEach(async ({ key, form }, index) => {
      const formCheckboxComponent = wrapper.findAllComponents(FormCheckbox)[index];
      expect(formCheckboxComponent.exists()).toBe(true);
      expect(formCheckboxComponent.props('label')).toBe(form.label);
      expect(formCheckboxComponent.props('fieldKey')).toBe(form.key);
      expect(formCheckboxComponent.props('value')).toBe(form.value);
      expect(formCheckboxComponent.props('errors')).toBe(form.errors);
      expect(formCheckboxComponent.props('mode')).toBe(pageMode.EDIT);

      // Simulate update event
      formCheckboxComponent.vm.$emit('update:modelValue', 2);
      expect(handleFieldUpdate).toHaveBeenCalledWith(key, 2);
    });
  });
});
