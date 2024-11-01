import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('filters store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can run init filters action', () => {
    const store = useFiltersStore();

    expect(store.filters).toEqual({});
    expect(store.preSavedFilters).toEqual({});

    store.initFilters('filterName', { id: { key: 'id', value: null, label: 'ID' } });

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
  });

  it('can run clear filters action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 1, label: 'ID' } });

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 1, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 1, label: 'ID' } });

    store.clearFilters('filterName', { id: { key: 'id', value: null, label: 'ID' } });

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
  });

  it('can run add pre saved filter action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: null, label: 'ID' } });

    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });

    store.addPreSavedFilter('filterName', 'id', 5);

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
  });

  it('can run remove filter action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });

    store.removeFilter('filterName', 'id', null);

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: null, label: 'ID' } });
  });

  it('can run clear pre saved filter action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });
    store.addPreSavedFilter('filterName', 'id', 100);

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 100, label: 'ID' } });

    store.clearPreSavedFilters('filterName');

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
  });

  it('can run apply pre saved filter action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });
    store.addPreSavedFilter('filterName', 'id', 100);

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 100, label: 'ID' } });

    store.applyPreSavedFilters('filterName');

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 100, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 100, label: 'ID' } });
  });

  it('can run set filter value action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });

    store.setFilterValue('filterName', 'id', 100);

    expect(store.filters['filterName']).toEqual({ id: { key: 'id', value: 100, label: 'ID' } });
    expect(store.preSavedFilters['filterName']).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
  });

  it('can run get filter value action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });

    let filterValue = store.getFilterValue('filterName', 'id');
    expect(filterValue).toEqual(5);

    filterValue = store.getFilterValue('unkownFilterName', 'id');
    expect(filterValue).toBeNull();
  });

  it('can run get pre saved filter value action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', { id: { key: 'id', value: 5, label: 'ID' } });

    let filterValue = store.getPreSavedFilterValue('filterName', 'id');
    expect(filterValue).toEqual(5);

    filterValue = store.getPreSavedFilterValue('unkownFilterName', 'id');
    expect(filterValue).toBeNull();
  });

  it('can run get filters action', () => {
    const store = useFiltersStore();

    store.initFilters('filterName', {
      id: { key: 'id', value: 5, label: 'ID' },
      name: { key: 'name', value: '', label: 'Name' },
      description: { key: 'name', value: null, label: 'Name' },
      categories: { key: 'categories', value: [], label: 'Categories' },
    });

    expect(store.getFilters('filterName')).toEqual({ id: { key: 'id', value: 5, label: 'ID' } });
  });
});
