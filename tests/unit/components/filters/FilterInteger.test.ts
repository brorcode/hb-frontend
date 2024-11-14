import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterInteger from '~/components/filters/FilterInteger.vue';

describe('FilterInteger', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterInteger, {
      props: {
        label: 'Integer label',
        filterKey: 'integer',
        value: null,
      },
    });

    expect(component.html()).toContain('Integer label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FilterInteger, {
      props: {
        label: 'Integer label',
        filterKey: 'integer',
        value: null,
      },
    });

    const input = component.find('input');
    await input.setValue(123);

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      123,
    ]);
  });

  it('can change non numeric value to null', async () => {
    const component = await mountSuspended(FilterInteger, {
      props: {
        label: 'Integer label',
        filterKey: 'integer',
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
