import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterCheckbox from '~/components/filters/FilterCheckbox.vue';

describe('FilterCheckbox', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterCheckbox, {
      props: {
        label: 'Checkbox label',
        filterKey: 'checkbox',
        value: null,
      },
    });

    expect(component.html()).toContain('Checkbox label');
  });

  it('can emit the correct event when the checkbox value changed', async () => {
    const component = await mountSuspended(FilterCheckbox, {
      props: {
        label: 'Checkbox label',
        filterKey: 'checkbox',
        value: null,
      },
    });

    const checkbox = component.find('button');
    await checkbox.trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      true,
    ]);

    await checkbox.trigger('click');
    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[1]).toEqual([
      null,
    ]);
  });

  it('can update isOn ref dynamically', async () => {
    const component = await mountSuspended(FilterCheckbox, {
      props: {
        label: 'Checkbox label',
        filterKey: 'checkbox',
        value: null,
      },
    });

    const wrapper = component.vm as unknown as { isOn: { value: boolean } };
    expect(wrapper.isOn.value).toBe(false);
    await component.setProps({ value: true });
    expect(wrapper.isOn.value).toBe(true);
  });
});
