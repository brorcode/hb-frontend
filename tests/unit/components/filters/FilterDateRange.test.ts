import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FilterDateRange from '~/components/filters/FilterDateRange.vue';

describe('FilterDateRange', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FilterDateRange, {
      props: {
        label: 'Date Range label',
        filterKey: 'date',
      },
    });

    expect(component.html()).toContain('Date Range label');
  });

  it('can emit the correct event when the date value changed', async () => {
    const component = await mountSuspended(FilterDateRange, {
      props: {
        label: 'Date label',
        filterKey: 'date',
      },
    });

    const dateRangeInput = component.find('input');
    await dateRangeInput.trigger('click');

    const days = component.findAll('.dp__calendar_item');
    await days.at(11)?.trigger('click');
    await component.find('.dp__action_select').trigger('click');

    expect(component.emitted('update:modelValue')).toBeTruthy();
  });

  it('can display value', async () => {
    const component = await mountSuspended(FilterDateRange, {
      props: {
        label: 'Datetime label',
        filterKey: 'datetime',
        value: [
          new Date(2024, 10, 2),
          new Date(2024, 11, 2),
        ],
      },
    });

    expect(component.html()).toContain('02-11-2024 - 02-12-2024');
  });
});
