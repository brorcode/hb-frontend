import { describe, expect, it } from 'vitest';
import {
  tagApiUrl,
  tagColumns,
  tagFilterName,
  tagFiltersInit,
  tagFormInit,
} from '~/components/pages/tags/TagInit';

describe('TagInit', () => {
  it('should export correct tag filter name', () => {
    expect(tagFilterName).toBe('tagFilter');
  });

  it('should export correct tag API URL', () => {
    expect(tagApiUrl).toBe('/api/v1/tags');
  });

  it('should export correct initial tag filters', () => {
    expect(tagFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Название' },
    });
  });

  it('should export correct initial tag form data', () => {
    expect(tagFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Название', errors: [] },
    });
  });

  it('should export correct tag columns', () => {
    const expectedColumns: TagColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Название' },
      { field: 'amount', header: 'Сумма', sortable: false, body: () => '123,11 ₽' },
      { field: 'created_at', header: 'Дата', body: () => '18-05-2021' },
    ];

    expect(tagColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = tagColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (actualColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (actualColumn.body) {
        const mockRow = {
          amount: 123.11,
          created_at: '2021-05-18T03:06:01.000000Z',
        };
        expect(actualColumn.body(mockRow).replace(/\u00A0/g, ' ')).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
