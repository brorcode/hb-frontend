import { defineStore } from 'pinia';

interface FiltersState {
  filters: {
    [key: string]: Record<string, Filter>;
  };
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    filters: {}
  }),
  actions: {
    initFilter(filterName: string, filters: Filters) {
      this.filters[filterName] = filters;
    },
    addFilter(filterName: string, key: string, value: any) {
      this.filters[filterName][key].value = value;
    },
    getFilterValue(filterName: string, key: string) {
      if (!this.filters[filterName]) {
        return null;
      }

      return this.filters[filterName][key].value ?? null;
    },
    getFilters(filterName: string) {
      if (!this.filters[filterName]) {
        return {};
      }

      // Filter out the filters where the value is an empty string or null
      return Object.fromEntries(
        Object.entries(this.filters[filterName]).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, filter]) => filter.value !== '' && filter.value !== null
        )
      );
    }
  }
});
