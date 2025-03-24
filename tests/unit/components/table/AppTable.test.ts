import { SquaresPlusIcon } from '@heroicons/vue/24/outline';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
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
        editable: true,
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
        editable: true,
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
        editable: true,
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
        editable: true,
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
        editable: true,
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
        editable: true,
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

  it('can handle sorting changes', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'Some title',
        titleSingular: 'Some singular title',
        loading: false,
        editable: true,
        columns: [
          {
            field: 'id',
            header: 'ID',
          },
          {
            field: 'name',
            header: 'Имя',
          },
          {
            field: 'email',
            header: 'Email',
            sortable: false,
          },
        ],
        perPage: 10,
        listData: [
          {
            id: 1,
            name: 'test1',
            email: 'test@email1.com',
          },
          {
            id: 2,
            name: 'test2',
            email: 'test@email2.com',
          },
        ],
        meta: {
          perPage: 10,
          currentPage: 1,
          hasNextPage: false,
        },
      },
    });

    const wrapper = component.vm as unknown as { sorting: Sorting };
    const sorting = wrapper.sorting;

    expect(sorting).toEqual({ column: 'created_at', direction: 'DESC' });

    const sortingButtonForNameColumn = component.findAll('[data-testid="table-column-soring-button"]')[1];

    await sortingButtonForNameColumn.trigger('click');
    expect(component.emitted('applySorting')).toBeTruthy();
    expect(sorting).toEqual({ column: 'name', direction: 'DESC' });

    await sortingButtonForNameColumn.trigger('click');
    expect(sorting).toEqual({ column: 'name', direction: 'ASC' });

    await sortingButtonForNameColumn.trigger('click');
    expect(sorting).toEqual({ column: null, direction: null });

    // sorting is disable for this column and it should not change
    const sortingButtonForEmailColumn = component.findAll('[data-testid="table-column-soring-button"]')[2];
    await sortingButtonForEmailColumn.trigger('click');
    expect(sorting).toEqual({ column: null, direction: null });
  });

  it('can get correct value for indeterminate', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'Some title',
        titleSingular: 'Some singular title',
        loading: false,
        columns: [{ field: 'id', header: 'ID' }],
        perPage: 10,
        editable: true,
        listData: [{ id: 1 }, { id: 2 }],
        meta: { perPage: 10, currentPage: 1, hasNextPage: false },
      },
    });

    const wrapper = component.vm as unknown as {
      indeterminate: boolean;
      selectedRows: Ref<number[]>;
      $nextTick: () => Promise<void>;
    };

    expect(wrapper.indeterminate).toBeFalsy();
    wrapper.selectedRows.value = [1];
    await wrapper.$nextTick();
    expect(wrapper.indeterminate).toBeTruthy();
  });

  it('can handle all rows clicked', async () => {
    const component = await mountSuspended(AppTable, {
      props: {
        path: '/users',
        title: 'Some title',
        titleSingular: 'Some singular title',
        loading: false,
        columns: [{ field: 'id', header: 'ID' }],
        perPage: 10,
        editable: true,
        listData: [{ id: 1 }, { id: 2 }],
        meta: { perPage: 10, currentPage: 1, hasNextPage: false },
        tableActions: [
          {
            title: 'Select all',
            icon: SquaresPlusIcon,
            action: () => vi.fn(),
          },
        ],
      },
    });

    const wrapper = component.vm as unknown as {
      selectedRows: Ref<number[]>;
      $nextTick: () => Promise<void>;
    };
    const selectedRows = wrapper.selectedRows;

    expect(selectedRows.value).toEqual([]);

    const selectAllRowsInput = component.find('input[data-testid="select-all-rows-button"]');
    selectAllRowsInput.setValue(true);
    await wrapper.$nextTick();
    expect(selectedRows.value).toEqual([1, 2]);
  });
});
