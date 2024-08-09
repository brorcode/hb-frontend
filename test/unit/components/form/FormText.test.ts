import { mountSuspended } from '@nuxt/test-utils/runtime';
import FormText from '~/components/form/FormText.vue';
import { describe, it, expect } from 'vitest';
import { pageMode } from '~/utils/pageMode';

describe('FormText', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        type: 'email',
        formField: {
          key: 'email',
          value: '',
          label: 'Email label',
          errors: []
        }
      }
    });

    expect(component.html()).toContain('Email label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        type: 'email',
        formField: {
          key: 'email',
          value: '',
          label: 'Email label',
          errors: []
        }
      }
    });

    const input = component.find('input');
    input.setValue('test@example.com');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      'test@example.com'
    ]);
  });

  it('can display errors', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        type: 'email',
        formField: {
          key: 'email',
          value: '',
          label: 'Email label',
          errors: ['Email is required']
        }
      }
    });

    expect(component.html()).toContain('Email is required');
  });

  it('should disable input when mode is view', async () => {
    const component = await mountSuspended(FormText, {
      props: {
        formField: {
          key: 'text',
          value: '',
          label: 'Text label',
          errors: []
        },
        mode: pageMode.VIEW
      }
    });

    const input = component.find('input');
    expect(input.element.readOnly).toBeTruthy();
  });
});
