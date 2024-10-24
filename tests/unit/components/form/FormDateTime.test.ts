import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { pageMode } from '~/utils/pageMode';
import FormDateTime from '~/components/form/FormDateTime.vue';

describe('FormDateTime', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: [],
      },
    });

    expect(component.html()).toContain('Datetime label');
  });

  it('can emit the correct event when the datetime value changed', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: [],
      },
    });

    const datetime = component.find('input');
    await datetime.trigger('click');

    const days = component.findAll('.dp__calendar_item');
    await days.at(11)?.trigger('click');
    await component.find('.dp__action_select').trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
  });

  it('form datetime can display errors', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: ['Datetime is required'],
      },
    });

    expect(component.html()).toContain('Datetime is required');
  });

  it('should disable datetime when mode is view', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: [],
        mode: pageMode.VIEW,
      },
    });

    const datetime = component.find('input');
    expect(datetime.element.disabled).toBeTruthy();
  });

  it('can display time picker by default', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: [],
      },
    });

    const datetime = component.find('input');
    await datetime.trigger('click');

    const timePickerExists = component.find('.dp__time_picker_inline_container').exists();
    expect(timePickerExists).toBeTruthy();
  });

  it('can disable time picker', async () => {
    const component = await mountSuspended(FormDateTime, {
      props: {
        label: 'Datetime label',
        fieldKey: 'datetime',
        value: null,
        errors: [],
        enableTimePicker: false,
      },
    });

    const datetime = component.find('input');
    await datetime.trigger('click');

    const timePickerExists = component.find('.dp__time_picker_inline_container').exists();
    expect(timePickerExists).toBeFalsy();
  });
});
