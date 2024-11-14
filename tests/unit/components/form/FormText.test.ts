import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import FormText from '~/components/form/FormText.vue';
import { pageMode } from '~/utils/pageMode';

describe('FormText', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        label: 'Email label',
        fieldKey: 'email',
        value: '',
        errors: [],
        type: 'email',
      },
    });

    expect(component.html()).toContain('Email label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        label: 'Email label',
        fieldKey: 'email',
        value: '',
        errors: [],
        type: 'email',
      },
    });

    const input = component.find('input');
    await input.setValue('test@example.com');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      'test@example.com',
    ]);
  });

  it('can display errors', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        label: 'Email label',
        fieldKey: 'email',
        value: '',
        errors: ['Email is required'],
        type: 'email',
      },
    });

    expect(component.html()).toContain('Email is required');
  });

  it('should disable input when mode is view', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        label: 'Text label',
        fieldKey: 'text',
        value: '',
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const input = component.find('input');
    expect(input.element.readOnly).toBeTruthy();
  });
});
