import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormMoney from '~/components/form/FormMoney.vue';
import TransactionForm from '~/components/pages/transactions/TransactionForm.vue';
import { transactionFormInit } from '~/components/pages/transactions/TransactionInit';

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
});
