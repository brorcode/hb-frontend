import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterTextarea from '~/components/filters/FilterTextarea.vue';

describe('FilterTextarea', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterTextarea, {
      props: {
        label: 'Textarea filter label',
        filterKey: 'textarea',
        value: null,
      },
    });

    expect(component.html()).toContain('Textarea filter label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FilterTextarea, {
      props: {
        label: 'Textarea filter label',
        filterKey: 'textarea',
        value: null,
      },
    });

    const input = component.find('textarea');
    await input.setValue('textarea text textarea');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      'textarea text textarea',
    ]);
  });
});
