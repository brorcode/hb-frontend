import { defineStore } from 'pinia';

interface ListState {
  refresh: boolean;
  resetSelectedRows: boolean;
}

export const useListStore = defineStore('list', {
  state: (): ListState => ({
    refresh: false,
    resetSelectedRows: false,
  }),
  actions: {
    needRefresh(value: boolean) {
      this.refresh = value;
    },
    needResetSelectedRows(value: boolean) {
      this.resetSelectedRows = value;
    },
  },
});
