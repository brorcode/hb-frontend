import { describe, expect, it } from 'vitest';
import {
  userApiUrl,
  userColumns,
  userFilterName,
  userFiltersInit,
  userFormInit,
  userProfileApiUrl,
} from '~/components/pages/users/UserInit';

describe('UserInit', () => {
  it('should export correct user filter name', () => {
    expect(userFilterName).toBe('userFilter');
  });

  it('should export correct user API URL', () => {
    expect(userApiUrl).toBe('/api/v1/users');
  });

  it('should export correct user profile API URL', () => {
    expect(userProfileApiUrl).toBe('/api/v1/profile');
  });

  it('should export correct initial user filters', () => {
    expect(userFiltersInit).toEqual({
      id: { key: 'id', value: null, label: 'ID' },
      name: { key: 'name', value: '', label: 'Имя' },
    });
  });

  it('should export correct initial user form data', () => {
    expect(userFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Имя', errors: [] },
      email: { key: 'email', value: '', label: 'Email', errors: [] },
      password: { key: 'password', value: '', label: 'Пароль', errors: [] },
      password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
    });
  });

  it('should export correct user columns', () => {
    const expectedColumns: UserColumn[] = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Имя' },
      { field: 'email', header: 'Email' },
      { field: 'created_at', header: 'Дата' },
    ];

    expect(userColumns.length).toBe(expectedColumns.length);

    expectedColumns.forEach((expectedColumn, index) => {
      const actualColumn = userColumns[index];

      expect(actualColumn.field).toBe(expectedColumn.field);
      expect(actualColumn.header).toBe(expectedColumn.header);

      if (expectedColumn.sortable !== undefined) {
        expect(actualColumn.sortable).toBe(expectedColumn.sortable);
      }

      if (expectedColumn.body) {
        const mockRow = { email: 'test@test.test', created_at: new Date() };
        expect(actualColumn.body(mockRow)).toBe(expectedColumn.body(mockRow));
      }
    });
  });
});
