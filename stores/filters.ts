import { defineStore } from 'pinia';
import { deepCopy } from '~/utils/deepCopy';

interface FiltersState {
  filters: {
    [key: string]: Record<string, Filter>;
  };
  preSavedFilters: {
    [key: string]: Record<string, Filter>;
  };
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    filters: {},
    preSavedFilters: {},
  }),
  actions: {
    initFilters(filterName: string, filters: Filters<unknown>) {
      if (!this.filters[filterName]) {
        this.filters[filterName] = deepCopy(filters) as Record<string, Filter>;
      }
      if (!this.preSavedFilters[filterName]) {
        this.preSavedFilters[filterName] = deepCopy(filters) as Record<string, Filter>;
      }
    },
    clearFilters(filterName: string, filters: Filters) {
      this.filters[filterName] = deepCopy(filters) as Record<string, Filter>;
      this.preSavedFilters[filterName] = deepCopy(filters) as Record<string, Filter>;
    },
    addPreSavedFilter(filterName: string, key: string, value: InputValue) {
      this.preSavedFilters[filterName][key].value = value;
    },
    removeFilter(filterName: string, key: string, value: InputValue) {
      this.filters[filterName][key].value = value;
      this.preSavedFilters[filterName][key].value = value;
    },
    clearPreSavedFilters(filterName: string) {
      this.preSavedFilters[filterName] = deepCopy(this.filters[filterName]) as Record<
        string,
        Filter
      >;
    },
    applyPreSavedFilters(filterName: string) {
      this.filters[filterName] = deepCopy(this.preSavedFilters[filterName]) as Record<
        string,
        Filter
      >;
    },
    setFilterValue(filterName: string, key: string, value: InputValue) {
      this.filters[filterName][key].value = value;
    },
    getFilterValue<T = InputValue>(filterName: string, key: string): T | null {
      if (!this.filters[filterName]) {
        return null;
      }

      const value = this.filters[filterName][key].value as T;

      return value ?? null;
    },
    getPreSavedFilterValue<T = InputValue>(filterName: string, key: string): T | null {
      if (!this.preSavedFilters[filterName]) {
        return null;
      }

      const value = this.preSavedFilters[filterName][key].value as T;

      return value ?? null;
    },
    getFilters(filterName: string) {
      if (!this.filters[filterName]) {
        return {};
      }

      // Filter out the filters where the value is an empty string or null or empty array
      return Object.fromEntries(
        Object.entries(this.filters[filterName]).filter(
          ([, filter]) =>
            filter.value !== ''
            && filter.value !== null
            && !(Array.isArray(filter.value) && filter.value.length === 0),
        ),
      );
    },
  },
});
