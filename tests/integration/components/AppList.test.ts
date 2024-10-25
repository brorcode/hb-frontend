import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/vue';
import AppList from '~/components/AppList.vue';
import { useFiltersStore } from '~/stores/filters';
import { userColumns, userFilterName, userFiltersInit } from '~/components/pages/users/UserInit';
import UserFilters from '~/components/pages/users/UserFilters.vue';
import AppFilter from '~/components/filters/AppFilter.vue';

mockNuxtImport('useApi', () => {
  return () => ({
    pending: false,
    items: {
      data: [
        {
          id: 1,
          name: 'test1',
          email: 'test@email1.com',
          created_at: '2024-08-08T09:47:05.000000Z',
          updated_at: '2024-08-08T09:47:05.000000Z',
        },
        {
          id: 2,
          name: 'test2',
          email: 'test@email2.com',
          created_at: '2024-08-08T09:47:05.000000Z',
          updated_at: '2024-08-08T09:47:05.000000Z',
        },
      ],
      meta: {
        perPage: 10,
        currentPage: 1,
        hasNextPage: false,
      },
    },
    fetchListData: vi.fn(),
    apiFetch: vi.fn(),
  });
});

describe('AppList', () => {
  afterEach(() => {
    const filters = useFiltersStore();
    filters.$reset();
  });

  it('can display and clear all applied filters', async () => {
    // Set up the initial filters
    const filters = useFiltersStore();
    filters.initFilters(userFilterName, userFiltersInit);
    filters.addPreSavedFilter(userFilterName, 'id', 1);
    filters.addPreSavedFilter(userFilterName, 'name', 'test filter value' as InputValue);
    filters.applyPreSavedFilters(userFilterName);

    const component = await mountSuspended(AppList, {
      props: {
        title: 'Some title',
        titleSingular: 'Some singular title',
        path: '/users',
        apiUrl: '/some-url',
        columns: userColumns,
        filterName: userFilterName,
        initFilters: userFiltersInit,
        filtersComponent: UserFilters,
      },
    });

    expect(filters.getFilters(userFilterName)).toEqual({
      id: { key: 'id', value: 1, label: 'ID' },
      name: { key: 'name', value: 'test filter value', label: 'Имя' },
    });
    expect(component.html()).toContain('ID: 1');
    expect(component.html()).toContain('Имя: test filter value');

    const clearFiltersButton = component.find('button[data-testid="clear-filters-button"]');
    await clearFiltersButton.trigger('click');

    // Check if the event was emitted from the AppFilter component
    const appFilters = component.findComponent(AppFilter);
    expect(appFilters.emitted('clear-filters')).toBeTruthy();

    expect(filters.getFilters(userFilterName)).toEqual({});
    expect(component.html()).not.toContain('ID: 1');
    expect(component.html()).not.toContain('Имя: test filter value');
  });

  it('can clear applied filters one by one', async () => {
    // Set up the initial filters
    const filters = useFiltersStore();
    filters.initFilters(userFilterName, userFiltersInit);
    filters.addPreSavedFilter(userFilterName, 'id', 1);
    filters.addPreSavedFilter(userFilterName, 'name', 'test filter value' as InputValue);
    filters.applyPreSavedFilters(userFilterName);

    const component = await mountSuspended(AppList, {
      props: {
        title: 'Some title',
        titleSingular: 'Some singular title',
        path: '/users',
        apiUrl: '/some-url',
        columns: userColumns,
        filterName: userFilterName,
        initFilters: userFiltersInit,
        filtersComponent: UserFilters,
      },
    });

    expect(filters.getFilters(userFilterName)).toEqual({
      id: { key: 'id', value: 1, label: 'ID' },
      name: { key: 'name', value: 'test filter value', label: 'Имя' },
    });
    expect(component.html()).toContain('ID: 1');
    expect(component.html()).toContain('Имя: test filter value');

    // remove ID filter
    const removeIdFilterButton = component.find('button[data-testid="remove-filter-id-button"]');
    await removeIdFilterButton.trigger('click');
    const appFilters = component.findComponent(AppFilter);
    expect(appFilters.emitted('apply-filters')).toBeTruthy();
    expect(filters.getFilters(userFilterName)).toEqual({
      name: { key: 'name', value: 'test filter value', label: 'Имя' },
    });
    expect(component.html()).not.toContain('ID: 1');
    expect(component.html()).toContain('Имя: test filter value');

    // remove Name filter
    const removeNameFilterButton = component.find(
      'button[data-testid="remove-filter-name-button"]',
    );
    await removeNameFilterButton.trigger('click');
    expect(appFilters.emitted('apply-filters')).toBeTruthy();
    expect(filters.getFilters(userFilterName)).toEqual({});

    expect(component.html()).not.toContain('ID: 1');
    expect(component.html()).not.toContain('Имя: test filter value');
  });

  it('can apply filters', async () => {
    const filters = useFiltersStore();

    const component = await mountSuspended(AppList, {
      props: {
        title: 'Some title',
        titleSingular: 'Some singular title',
        path: '/users',
        apiUrl: '/some-url',
        columns: userColumns,
        filterName: userFilterName,
        initFilters: userFiltersInit,
        filtersComponent: UserFilters,
      },
    });

    expect(filters.preSavedFilters[userFilterName]).toBeUndefined();
    expect(filters.filters[userFilterName]).toBeUndefined();

    const filtersButton = component.find('button[data-testid="show-filters-button"]');
    await filtersButton.trigger('click');

    const filterIdInput = screen.getByTestId('filter-id');
    // it should set pre-saved filters
    await fireEvent.update(filterIdInput, '123');

    expect(filters.preSavedFilters[userFilterName]).toEqual({
      id: { key: 'id', value: 123, label: 'ID' },
      name: { key: 'name', value: '', label: 'Имя' },
    });
    expect(filters.getFilters(userFilterName)).toEqual({});

    const applyFiltersButton = screen.getByTestId('apply-filters-button');
    // it should set filters
    await fireEvent.click(applyFiltersButton);

    expect(filters.preSavedFilters[userFilterName]).toEqual({
      id: { key: 'id', value: 123, label: 'ID' },
      name: { key: 'name', value: '', label: 'Имя' },
    });
    expect(filters.getFilters(userFilterName)).toEqual({
      id: { key: 'id', value: 123, label: 'ID' },
    });
  });
});
