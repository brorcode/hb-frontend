import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { pageMode } from '~/utils/pageMode';
import FormMoney from '~/components/form/FormMoney.vue';

describe('FormMoney', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormMoney, {
      props: {
        label: 'Money label',
        fieldKey: 'money',
        value: null,
        errors: [],
      },
    });

    expect(component.html()).toContain('Money label');
  });

  it('can run the correct event if the input value changes', async () => {
    const component = await mountSuspended(FormMoney, {
      props: {
        label: 'Money label',
        fieldKey: 'money',
        value: null,
        errors: [],
      },
    });

    const input = component.find('input');
    await input.setValue(0.2);
    await input.trigger('blur');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      0.2,
    ]);
  });

  it('can show errors', async () => {
    const component = await mountSuspended(FormMoney, {
      props: {
        label: 'Money label',
        fieldKey: 'money',
        value: null,
        errors: ['Money is required'],
      },
    });

    expect(component.html()).toContain('Money is required');
  });

  it('should disable input when mode is view', async () => {
    const component = await mountSuspended(FormMoney, {
      props: {
        label: 'Money label',
        fieldKey: 'money',
        value: null,
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const input = component.find('input');
    expect(input.element.readOnly).toBeTruthy();
  });
});
