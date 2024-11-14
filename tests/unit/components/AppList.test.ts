import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppList from '~/components/AppList.vue';
import UserFilters from '~/components/pages/users/UserFilters.vue';
import { userColumns, userFilterName, userFiltersInit } from '~/components/pages/users/UserInit';

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
  it('can render the component', async () => {
    const component = await mountSuspended(AppList, {
      props: {
        title: 'Some item title',
        titleSingular: 'Some singular title',
        path: '/users',
        apiUrl: '/some-url',
        columns: userColumns,
        filterName: userFilterName,
        initFilters: userFiltersInit,
        filtersComponent: UserFilters,
      },
    });

    expect(component.html()).toContain('Some item title');
    expect(component.findComponent({ name: 'TransactionImport' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'AppFilter' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'AppTable' }).exists()).toBe(true);
  });
});
