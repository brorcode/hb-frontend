import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('list store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can run need refresh action', () => {
    const store = useListStore();

    expect(store.refresh).toBeFalsy();
    store.needRefresh(true);
    expect(store.refresh).toBeTruthy();
    store.needRefresh(false);
    expect(store.refresh).toBeFalsy();
  });

  it('can run need reset selected rows action', () => {
    const store = useListStore();

    expect(store.resetSelectedRows).toBeFalsy();
    store.needResetSelectedRows(true);
    expect(store.resetSelectedRows).toBeTruthy();
    store.needResetSelectedRows(false);
    expect(store.resetSelectedRows).toBeFalsy();
  });
});
