import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterMoney from '~/components/filters/FilterMoney.vue';

describe('FilterMoney', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterMoney, {
      props: {
        label: 'Money label',
        filterKey: 'money',
        value: null,
      },
    });

    expect(component.html()).toContain('Money label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FilterMoney, {
      props: {
        label: 'Money label',
        filterKey: 'money',
        value: null,
      },
    });

    const input = component.find('input');
    await input.setValue(0.2);

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      0.2,
    ]);
  });

  it('can change non numeric value to null', async () => {
    const component = await mountSuspended(FilterMoney, {
      props: {
        label: 'Money label',
        filterKey: 'money',
        value: null,
      },
    });

    const input = component.find('input');
    await input.setValue(undefined);

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      null,
    ]);
  });
});
