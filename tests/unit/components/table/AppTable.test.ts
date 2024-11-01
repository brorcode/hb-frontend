import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { userColumns } from '~/components/pages/users/UserInit';
import AppTable from '~/components/table/AppTable.vue';

describe('AppTable', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: false,
        columns: userColumns,
        perPage: 10,
        listData: [],
        tableActions: [],
      },
    });

    expect(component.findComponent({ name: 'TableActions' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'AppSkeletonThead' }).exists()).toBe(false);
    expect(component.findComponent({ name: 'AppSkeletonTbody' }).exists()).toBe(false);
    expect(component.html()).toContain('Добавить some singular title');
    expect(component.html()).toContain('Ничего не найдено');
  });

  it('can see skeleton when loading', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: true,
        columns: userColumns,
        perPage: 10,
        listData: [],
        tableActions: [],
      },
    });

    expect(component.findComponent({ name: 'AppSkeletonThead' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'AppSkeletonTbody' }).exists()).toBe(true);
  });

  it('can see table data', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: false,
        columns: userColumns,
        perPage: 10,
        listData: [
          { id: 1, name: 'test1', email: 'some email1', created_at: '2023-08-08T09:47:05.000000Z' },
          { id: 2, name: 'test2', email: 'some email2', created_at: '2024-01-02T09:47:05.000000Z' },
        ],
        tableActions: [],
      },
    });

    expect(component.html()).not.toContain('Ничего не найдено');
    expect(component.html()).toContain('test1');
    expect(component.html()).toContain('some email1');
    expect(component.html()).toContain('08-08-2023');

    expect(component.html()).toContain('test2');
    expect(component.html()).toContain('some email2');
    expect(component.html()).toContain('02-01-2024');
  });

  it('can emit page change event', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: false,
        columns: userColumns,
        perPage: 10,
        listData: [
          { id: 1, name: 'test1', email: 'some email1', created_at: '2023-08-08T09:47:05.000000Z' },
          { id: 2, name: 'test2', email: 'some email2', created_at: '2024-01-02T09:47:05.000000Z' },
        ],
      },
    });

    const paginationComponent = component.findComponent({ name: 'AppPagination' });
    await paginationComponent.vm.$emit('pageChange');

    expect(component.emitted('pageChange')).toBeTruthy();
  });

  it('can emit per page change event', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: false,
        columns: userColumns,
        perPage: 10,
        listData: [
          { id: 1, name: 'test1', email: 'some email1', created_at: '2023-08-08T09:47:05.000000Z' },
          { id: 2, name: 'test2', email: 'some email2', created_at: '2024-01-02T09:47:05.000000Z' },
        ],
      },
    });

    const paginationComponent = component.findComponent({ name: 'AppPagination' });
    await paginationComponent.vm.$emit('perPageChange');

    expect(component.emitted('perPageChange')).toBeTruthy();
  });

  it('can emit apply sorting event', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'some title',
        titleSingular: 'some singular title',
        loading: false,
        columns: userColumns,
        perPage: 10,
        listData: [
          { id: 1, name: 'test1', email: 'some email1', created_at: '2023-08-08T09:47:05.000000Z' },
          { id: 2, name: 'test2', email: 'some email2', created_at: '2024-01-02T09:47:05.000000Z' },
        ],
      },
    });

    const sortingButton = component.find('[data-testid="table-column-soring-button"]');
    await sortingButton.trigger('click');

    expect(component.emitted('applySorting')).toBeTruthy();
  });
});
