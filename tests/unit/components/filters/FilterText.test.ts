import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterText from '~/components/filters/FilterText.vue';

describe('FilterText', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterText, {
      props: {
        label: 'Text label',
        filterKey: 'text',
        value: null,
      },
    });

    expect(component.html()).toContain('Text label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FilterText, {
      props: {
        label: 'Text label',
        filterKey: 'text',
        value: null,
      },
    });

    const input = component.find('input');
    await input.setValue('text text text');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      'text text text',
    ]);
  });
});
