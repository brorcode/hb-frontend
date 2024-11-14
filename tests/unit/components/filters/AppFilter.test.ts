import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AppFilter from '~/components/filters/AppFilter.vue';
import { useFiltersStore } from '~/stores/filters';

const filterName = 'filterName';

describe('AppFilter', () => {
  beforeEach(() => {
    const filters = useFiltersStore();
    filters.initFilters(filterName, {
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Name' },
    });
  });

  afterEach(() => {
    const filters = useFiltersStore();
    filters.$reset();
  });

  it('can mount the component', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    expect(component.html()).toContain('Фильтры');
    expect(component.html()).toContain('Очистить');
  });

  it('can run the event on the clear filters button click', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    const submitButton = component.find('[data-testid="clear-filters-button"]');
    await submitButton.trigger('click');

    expect(component.emitted('clear-filters')).toBeTruthy();
  });

  it('can click show filters button it changes the open state', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    const wrapper = component.vm as unknown as { open: { value: boolean } };
    expect(wrapper.open.value).toBeFalsy();
    const filtersButton = component.find('[data-testid="show-filters-button"]');
    await filtersButton.trigger('click');
    expect(wrapper.open.value).toBeTruthy();
  });

  it('can run apply filters', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    const wrapper = component.vm as unknown as {
      open: { value: boolean };
      applyFilters: () => void;
    };

    wrapper.open.value = true;
    wrapper.applyFilters();

    expect(component.emitted('apply-filters')).toBeTruthy();
    expect(wrapper.open.value).toBeFalsy();
  });

  it('can run clear filters', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {
          id: { key: 'id', value: 1, label: 'ID' },
        },
      },
    });

    const wrapper = component.vm as unknown as {
      open: { value: boolean };
      removeFilter: (key: string) => void;
    };

    wrapper.open.value = false;
    wrapper.removeFilter('id');

    expect(component.emitted('apply-filters')).toBeTruthy();
    expect(wrapper.open.value).toBeFalsy();
  });

  it('can run clear pre saved filters', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    const wrapper = component.vm as unknown as {
      open: { value: boolean };
      clearPreSavedFilters: () => void;
    };

    wrapper.open.value = true;
    wrapper.clearPreSavedFilters();

    expect(wrapper.open.value).toBeFalsy();
  });

  it('can get correct value from display filter method', async () => {
    const component = await mountSuspended(AppFilter, {
      props: {
        filterName: filterName,
        initFilters: {},
      },
    });

    const wrapper = component.vm as unknown as {
      open: { value: boolean };
      displayFilter: (filter: Filter) => string;
    };

    const filters = [
      {
        filter: { key: 'id', value: 1, label: 'ID' },
        result: 'ID: 1',
      },
      {
        filter: { key: 'select', value: { id: 1, name: 'test' }, label: 'Select' },
        result: 'Select: test',
      },
      {
        filter: { key: 'checkbox', value: true, label: 'Checkbox' },
        result: 'Checkbox: Да',
      },
      {
        filter: { key: 'date', value: new Date(2024, 11, 1), label: 'Date' },
        result: 'Date: 01-12-2024',
      },
      {
        filter: { key: 'multiselect', value: [
          { id: 1, name: 'test' },
          { id: 2 },
          { id: 3, name: 'test3' },
        ], label: 'Multiselect' },
        result: 'Multiselect: test, ???, test3',
      },
      {
        filter: { key: 'dateRange', value: [
          new Date(2024, 10, 10),
          new Date(2024, 11, 20),
        ], label: 'Date Range' },
        result: 'Date Range: 10-11-2024, 20-12-2024',
      },
    ];

    filters.forEach(({ filter, result }) => {
      expect(wrapper.displayFilter(filter as Filter)).toEqual(result);
    });
  });
});
