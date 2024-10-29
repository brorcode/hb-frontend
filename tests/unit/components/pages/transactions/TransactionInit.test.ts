import { describe, expect, it } from 'vitest';
import AppRelationLink from '~/components/AppRelationLink.vue';
import {
  transactionApiUrl,
  transactionColumns,
  transactionFilterName,
  transactionFiltersInit,
  transactionFormInit,
} from '~/components/pages/transactions/TransactionInit';

describe('TransactionInit', () => {
  it('should export correct transaction filter name', () => {
    expect(transactionFilterName).toBe('transactionFilter');
  });

  it('should export correct transaction API URL', () => {
    expect(transactionApiUrl).toBe('/api/v1/transactions');
  });

  it('should export correct initial transaction filters', () => {
    expect(transactionFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      amount: { key: 'amount', value: null, label: 'Сумма' },
      type: { key: 'type', value: null, label: 'Тип' },
      categories: { key: 'categories', value: [], label: 'Категории' },
      accounts: { key: 'accounts', value: [], label: 'Аккаунты' },
      loans: { key: 'loans', value: [], label: 'Долги' },
      tags: { key: 'tags', value: [], label: 'Теги' },
      created_at_after: { key: 'created_at_after', value: null, label: 'Дата после' },
      created_at_before: { key: 'created_at_before', value: null, label: 'Дата до' },
    });
  });

  it('should export correct initial transaction form data', () => {
    expect(transactionFormInit).toEqual({
      amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
      category_id: { key: 'category_id', value: null, relation_key: 'category', relation_value: null, label: 'Категория', errors: [] },
      account_id: { key: 'account_id', value: null, relation_key: 'account', relation_value: null, label: 'Аккаунт', errors: [] },
      loan_id: { key: 'loan_id', value: null, relation_key: 'loan', relation_value: null, label: 'Долг', errors: [] },
      created_at: { key: 'created_at', value: null, label: 'Дата', errors: [] },
      is_debit: { key: 'is_debit', value: false, label: 'Доход?', errors: [] },
      is_transfer: { key: 'is_transfer', value: false, label: 'Перевод?', errors: [] },
      account_to: { key: 'account_to', value: null, relation_key: 'account', relation_value: null, label: 'На Аккаунт', errors: [] },
    });
  });

  it('should export correct transaction columns', () => {
    const expectedColumns: TransactionColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'amount', header: 'Сумма', body: () => '111,56 ₽' },
      {
        field: 'category',
        header: 'Категория',
        sortable: false,
        body: () => {
          return {
            item: { id: 10, name: 'test' },
            routeName: 'categories-child-id-mode',
            url: '/categories/child/10/view',
          };
        },
      },
      {
        field: 'account',
        header: 'Аккаунт',
        sortable: false,
        body: () => {
          return {
            item: { id: 10, name: 'test' },
            routeName: 'accounts-id-mode',
            url: '/accounts/10/view',
          };
        },
      },
      {
        field: 'tags',
        header: 'Теги',
        sortable: false,
      },
      {
        field: 'created_at',
        header: 'Дата',
        body: () => '18-05-2021',
      },
    ];

    expect(transactionColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = transactionColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (actualColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (actualColumn.body) {
        const mockRow = {
          amount: 111.56,
          category: {
            id: 10,
            name: 'test',
          },
          account: {
            id: 10,
            name: 'test',
          },
          tags: [
            {
              id: 10,
              name: 'test 1',
            },
            {
              id: 11,
              name: 'test 2',
            },
          ],
          created_at: '2021-05-18T03:06:01.000000Z',
        };

        if (actualColumn.field === 'amount' || actualColumn.field === 'created_at') {
          expect(actualColumn.body(mockRow).replace(/\u00A0/g, ' ')).toBe(expectedColumn.body(mockRow));
        }
        else if (actualColumn.field === 'tags') {
          const expectedTagsOutput = h('div', mockRow.tags.map(tag =>
            h(AppRelationLink, {
              item: tag,
              routeName: 'tags-id-mode',
              url: `/tags/${tag.id}/view`,
            }),
          ));
          expect(actualColumn.body(mockRow)).toEqual(expectedTagsOutput);
        }
        else {
          expect(actualColumn.body(mockRow).props).toEqual(expectedColumn.body(mockRow));
        }
      }
    });
  });
});
