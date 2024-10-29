import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TransactionFilters from '~/components/pages/transactions/TransactionFilters.vue';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';

describe('TransactionFilters', () => {
  it('renders the filters correctly', async () => {
    const component = await mountSuspended(TransactionFilters);

    expect(component.findComponent({ name: 'FilterInteger' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterSelect' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'FilterMoney' }).exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterMultiSelect' })[0].exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterMultiSelect' })[1].exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterMultiSelect' })[2].exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterMultiSelect' })[3].exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterDate' })[0].exists()).toBe(true);
    expect(component.findAllComponents({ name: 'FilterDate' })[1].exists()).toBe(true);
  });

  it('calls handleUpdate when FilterInteger emits update:model-value', async () => {
    const component = await mountSuspended(TransactionFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.id.key].value).toBeNull();
    // Simulate the update:model-value event on FilterInteger
    await component.findComponent({ name: 'FilterInteger' }).vm.$emit('update:modelValue', 123);

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.id.key].value).toEqual(123);
  });

  it('calls handleUpdate when FilterSelect emits update:model-value', async () => {
    const wrapper = mount(TransactionFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.type.key].value).toEqual(null);
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterSelect' }).vm.$emit('update:modelValue', { id: 123, name: 'test' });

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.type.key].value).toEqual({ id: 123, name: 'test' });
  });

  it('calls handleUpdate when FilterMoney emits update:model-value', async () => {
    const wrapper = mount(TransactionFilters);
    const filtersStore = useFiltersStore();

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.amount.key].value).toEqual(null);
    // Simulate the update:model-value event on FilterText
    await wrapper.findComponent({ name: 'FilterMoney' }).vm.$emit('update:modelValue', 122.11);

    expect(filtersStore.preSavedFilters[transactionFilterName][transactionFiltersInit.amount.key].value).toEqual(122.11);
  });

  it('calls handleUpdate when FilterMultiSelect emits update:model-value', async () => {
    const testCases = [
      { key: transactionFiltersInit.categories.key },
      { key: transactionFiltersInit.accounts.key },
      { key: transactionFiltersInit.tags.key },
      { key: transactionFiltersInit.loans.key },
    ];
    const updatedValue = [{ id: 123, name: 'test 1' }, { id: 124, name: 'test 2' }];

    const wrapper = mount(TransactionFilters);
    const filtersStore = useFiltersStore();

    testCases.forEach(async ({ key }, index) => {
      expect(filtersStore.preSavedFilters[transactionFilterName][key].value).toEqual([]);
      await wrapper.findAllComponents({ name: 'FilterMultiSelect' })[index].vm.$emit('update:modelValue', updatedValue);
      expect(filtersStore.preSavedFilters[transactionFilterName][key].value).toEqual(updatedValue);
    });
  });

  it('calls handleUpdate when FilterDate emits update:model-value', async () => {
    const testCases = [
      { key: transactionFiltersInit.created_at_after.key },
      { key: transactionFiltersInit.created_at_before.key },
    ];
    const updatedValue = new Date('2022-01-01');

    const wrapper = mount(TransactionFilters);
    const filtersStore = useFiltersStore();

    testCases.forEach(async ({ key }, index) => {
      expect(filtersStore.preSavedFilters[transactionFilterName][key].value).toEqual(null);
      await wrapper.findAllComponents({ name: 'FilterDate' })[index].vm.$emit('update:modelValue', updatedValue);
      expect(filtersStore.preSavedFilters[transactionFilterName][key].value).toEqual(updatedValue);
    });
  });
});
