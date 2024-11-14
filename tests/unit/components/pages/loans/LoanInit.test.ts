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
      { field: 'type', header: 'Тип', body: () => 'test type' },
      { field: 'amount', header: 'Сумма', body: () => '1 234,56 ₽' },
      { field: 'amount_left', header: 'Остаток', body: () => '333,33 ₽' },
      { field: 'created_at', header: 'Дата Долга', body: () => '18-05-2021' },
      { field: 'deadline_on', header: 'Дата Возврата', body: () => '18-05-2021' },
    ];

    expect(loanColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = loanColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (actualColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (actualColumn.body) {
        const mockRow = {
          type: {
            id: 1,
            name: 'test type',
          },
          amount: 1234.56,
          amount_left: 333.33,
          created_at: '2021-05-18T03:06:01.000000Z',
          deadline_on: '2021-05-18T03:06:01.000000Z',
        };
        expect(actualColumn.body(mockRow).replace(/\u00A0/g, ' ')).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
