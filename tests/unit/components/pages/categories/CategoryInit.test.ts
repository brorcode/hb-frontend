import { describe, expect, it } from 'vitest';
import {
  categoryApiUrl,
  categoryChildApiUrl,
  categoryChildFilterName,
  categoryColumns,
  categoryFiltersInit,
  categoryFormInit,
  categoryParentApiUrl,
  categoryParentFilterName,
} from '~/components/pages/categories/CategoryInit';

describe('CategoryInit', () => {
  it('should export correct categoryParentFilterName', () => {
    expect(categoryParentFilterName).toBe('categoryParentFilter');
  });

  it('should export correct categoryChildFilterName', () => {
    expect(categoryChildFilterName).toBe('categoryChildFilter');
  });

  it('should export correct category API URL', () => {
    expect(categoryApiUrl).toBe('/api/v1/categories');
  });

  it('should export correct parent category API URL', () => {
    expect(categoryParentApiUrl).toBe('/api/v1/categories/parent');
  });

  it('should export correct child category API URL', () => {
    expect(categoryChildApiUrl).toBe('/api/v1/categories/child');
  });

  it('should export correct initial category filters', () => {
    expect(categoryFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Название' },
      parent_categories: { key: 'parent_categories', value: [], label: 'Родительские Категории' },
    });
  });

  it('should export correct initial category form data', () => {
    expect(categoryFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Название', errors: [] },
      parent_id: {
        key: 'parent_id',
        value: null,
        relation_key: 'parent_category',
        relation_value: null,
        label: 'Родительская Категория',
        errors: [],
      },
      is_child: { key: 'is_child', value: false, label: '', errors: [] },
    });
  });

  it('should export correct category columns', () => {
    const expectedColumns: CategoryColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Название' },
      {
        field: 'parent_category',
        header: 'Родительская Категория',
        sortable: false,
        body: () => '',
      },
      {
        field: 'transactions_credit',
        header: 'Сумма Расходов',
        sortable: false,
        body: () => '111,56 ₽',
      },
      {
        field: 'transactions_debit',
        header: 'Сумма Доходов',
        sortable: false,
        body: () => '333,33 ₽',
      },
      {
        field: 'transactions_transfer',
        header: 'Сумма Переводов',
        sortable: false,
        body: () => '222,33 ₽',
      },
      {
        field: 'created_at',
        header: 'Дата',
        body: () => '18-05-2021',
      },
    ];

    expect(categoryColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = categoryColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (actualColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (actualColumn.body) {
        const mockRow = {
          parent_category: {
            id: 10,
            name: 'test',
          },
          transactions_credit: {
            count: 1,
            amount: 111.56,
          },
          transactions_debit: {
            count: 1,
            amount: 333.33,
          },
          transactions_transfer: {
            count: 1,
            amount: 222.33,
          },
          created_at: '2021-05-18T03:06:01.000000Z',
        };

        if (actualColumn.field === 'parent_category') {
          expect(actualColumn.body(mockRow).props).toEqual({
            item: { id: 10, name: 'test' },
            routeName: 'categories-parent-id-mode',
            linkUrl: '/categories/parent/10/view',
          });
        }
        else {
          expect(actualColumn.body(mockRow).replace(/\u00A0/g, ' ')).toBe(expectedColumn.body(mockRow));
        }
      }
    });
  });

  it('should export correct parent_category column body if it is null', () => {
    const mockRow = {
      parent_category: null,
    };

    const actualParentCategoryColumn = categoryColumns.find(column => column.field === 'parent_category');

    expect(actualParentCategoryColumn?.body(mockRow)).toEqual('');
  });
});
