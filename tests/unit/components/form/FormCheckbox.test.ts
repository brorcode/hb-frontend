import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { pageMode } from '~/utils/pageMode';
import FormCheckbox from '~/components/form/FormCheckbox.vue';

describe('FormCheckbox', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormCheckbox, {
      props: {
        label: 'Checkbox label',
        fieldKey: 'checkbox',
        value: false,
        errors: [],
      },
    });

    expect(component.html()).toContain('Checkbox label');
  });

  it('can emit the correct event when the checkbox value changed', async () => {
    const component = await mountSuspended(FormCheckbox, {
      props: {
        label: 'Checkbox label',
        fieldKey: 'checkbox',
        value: false,
        errors: [],
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
      false,
    ]);
  });

  it('form checkbox can display errors', async () => {
    const component = await mountSuspended(FormCheckbox, {
      props: {
        label: 'Checkbox label',
        fieldKey: 'checkbox',
        value: false,
        errors: ['Checkbox is required'],
      },
    });

    expect(component.html()).toContain('Checkbox is required');
  });

  it('should disable checkbox when mode is view', async () => {
    const component = await mountSuspended(FormCheckbox, {
      props: {
        label: 'Checkbox label',
        fieldKey: 'checkbox',
        value: false,
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const checkbox = component.find('button');
    expect(checkbox.element.disabled).toBeTruthy();
  });

  it('can update isOn ref dynamically', async () => {
    const component = await mountSuspended(FormCheckbox, {
      props: {
        label: 'Checkbox label',
        fieldKey: 'checkbox',
        value: false,
        errors: [],
      },
    });

    const wrapper = component.vm as unknown as { isOn: { value: boolean } };
    expect(wrapper.isOn.value).toBe(false);
    await component.setProps({ value: true });
    expect(wrapper.isOn.value).toBe(true);
  });
});
