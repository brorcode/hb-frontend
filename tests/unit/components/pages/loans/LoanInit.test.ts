import { describe, expect, it } from 'vitest';
import {
  loanApiUrl,
  loanColumns,
  loanFilterName,
  loanFiltersInit,
  loanFormInit,
} from '~/components/pages/loans/LoanInit';

describe('LoanInit', () => {
  it('should export correct loan filter name', () => {
    expect(loanFilterName).toBe('loanFilter');
  });

  it('should export correct loan API URL', () => {
    expect(loanApiUrl).toBe('/api/v1/loans');
  });

  it('should export correct initial loan filters', () => {
    expect(loanFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Название' },
    });
  });

  it('should export correct initial loan form data', () => {
    expect(loanFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Название', errors: [] },
      type_id: {
        key: 'type_id',
        value: null,
        relation_key: 'type',
        relation_value: null,
        label: 'Тип',
        errors: [],
      },
      amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
      deadline_on: { key: 'deadline_on', value: null, label: 'Дата Возврата', errors: [] },
    });
  });

  it('should export correct loan columns', () => {
    const expectedColumns: LoanColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Название' },
      { field: 'type', header: 'Тип' },
      { field: 'amount', header: 'Сумма' },
      { field: 'amount_left', header: 'Остаток' },
      { field: 'created_at', header: 'Дата Долга' },
      { field: 'deadline_on', header: 'Дата Возврата' },
    ];

    expect(loanColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = loanColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (expectedColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (expectedColumn.body) {
        const mockRow = {
          type: 'Type Name',
          amount: 1234.56,
          amount_left: 333.33,
          created_at: new Date(),
          deadline_on: new Date(),
        };
        expect(actualColumn.body(mockRow)).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
