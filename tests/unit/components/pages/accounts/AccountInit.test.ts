import { describe, expect, it } from 'vitest';
import {
  accountApiUrl,
  accountColumns,
  accountFilterName,
  accountFiltersInit,
  accountFormInit,
} from '~/components/pages/accounts/AccountInit';

describe('AccountInit', () => {
  it('should export correct account filter name', () => {
    expect(accountFilterName).toBe('accountFilter');
  });

  it('should export correct account API URL', () => {
    expect(accountApiUrl).toBe('/api/v1/accounts');
  });

  it('should export correct initial account filters', () => {
    expect(accountFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Название' },
      show_archived: { key: 'show_archived', value: null, label: 'Показать архивные?' },
    });
  });

  it('should export correct initial account form data', () => {
    expect(accountFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Название', errors: [] },
      is_archived: { key: 'is_archived', value: false, label: 'Архивный?', errors: [] },
    });
  });

  it('should export correct account columns', () => {
    const expectedColumns: AccountColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Название' },
      { field: 'amount', header: 'Баланс', sortable: false },
      { field: 'is_archived', header: 'Архивный' },
      { field: 'created_at', header: 'Дата' },
    ];

    expect(accountColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = accountColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (expectedColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (expectedColumn.body) {
        const mockRow = { amount: 1234.56, is_archived: true, created_at: new Date() };
        expect(actualColumn.body(mockRow)).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
