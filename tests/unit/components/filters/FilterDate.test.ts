import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterDate from '~/components/filters/FilterDate.vue';

describe('FilterDate', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterDate, {
      props: {
        label: 'Date label',
        filterKey: 'date',
      },
    });

    expect(component.html()).toContain('Date label');
  });

  it('can emit the correct event when the date value changed', async () => {
    const component = await mountSuspended(FilterDate, {
      props: {
        label: 'Date label',
        filterKey: 'date',
      },
    });

    const dateInput = component.find('input');
    await dateInput.trigger('click');

    const days = component.findAll('.dp__calendar_item');
    await days.at(11)?.trigger('click');
    await component.find('.dp__action_select').trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
  });

  it('can display value', async () => {
    const component = await mountSuspended(FilterDate, {
      props: {
        label: 'Datetime label',
        filterKey: 'datetime',
        value: new Date(2024, 10, 2),
      },
    });

    expect(component.html()).toContain('02-11-2024');
  });
});
