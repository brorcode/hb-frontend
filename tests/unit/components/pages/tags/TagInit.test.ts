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
      { field: 'amount', header: 'Сумма', sortable: false },
      { field: 'created_at', header: 'Дата' },
    ];

    expect(tagColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = tagColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (expectedColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (expectedColumn.body) {
        const mockRow = { amount: 123.11, created_at: new Date() };
        expect(actualColumn.body(mockRow)).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
