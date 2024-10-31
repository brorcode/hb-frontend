import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppListRelation from '~/components/AppListRelation.vue';
import { accountColumns, accountFilterName, accountFiltersInit } from '~/components/pages/accounts/AccountInit';

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

mockNuxtImport('useRoute', () => {
  return () => ({
    params: { id: 1 },
  });
});

describe('AppListRelation', () => {
  it('can render the component', async () => {
    const filters = useFiltersStore();
    filters.initFilters(accountFilterName, accountFiltersInit);

    expect(filters.getFilterValue(accountFilterName, 'id')).toEqual(null);

    const component = await mountSuspended(AppListRelation, {
      props: {
        title: 'Some item title',
        titleSingular: 'Some singular title',
        path: '/accounts',
        apiUrl: '/some-url',
        columns: accountColumns,
        filterKey: 'id',
        filterName: accountFilterName,
        initFilters: accountFiltersInit,
      },
    });

    expect(component.findComponent({ name: 'AppList' }).exists()).toBe(true);
    expect(filters.getFilterValue(accountFilterName, 'id')).toEqual(
      [
        {
          id: 1,
          name: '',
        },
      ],
    );
  });
});
