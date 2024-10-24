import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import FormTextarea from '~/components/form/FormTextarea.vue';
import { pageMode } from '~/utils/pageMode';

describe('FormTextarea', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormTextarea, {
      props: {
        label: 'Textarea label',
        fieldKey: 'textarea',
        value: '',
        errors: [],
      },
    });

    expect(component.html()).toContain('Textarea label');
  });

  it('can emit the correct event when the input value changes', async () => {
    const component = await mountSuspended(FormTextarea, {
      props: {
        label: 'Textarea label',
        fieldKey: 'textarea',
        value: '',
        errors: [],
      },
    });

    const input = component.find('textarea');
    await input.setValue('some text');

    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect((component.emitted('update:modelValue') as Array<[string]>)[0]).toEqual([
      'some text',
    ]);
  });

  it('can display errors', async () => {
    const component = await mountSuspended(FormTextarea, {
      props: {
        label: 'Textarea label',
        fieldKey: 'textarea',
        value: '',
        errors: ['Textarea is required'],
      },
    });

    expect(component.html()).toContain('Textarea is required');
  });

  it('should disable textarea when mode is view', async () => {
    const component = await mountSuspended(FormTextarea, {
      props: {
        label: 'Textarea label',
        fieldKey: 'textarea',
        value: '',
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const input = component.find('textarea');
    expect(input.element.readOnly).toBeTruthy();
  });
});
