import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VALIDATION_ERROR_STATUS } from '~/constants/statusCodes';

const list = useListStore();

const successResponse = {
  name: 'Test Name',
  category: 'Category Relation Name',
};

const errorResponse = {
  status: VALIDATION_ERROR_STATUS,
  _data: {
    errors: {
      name: ['Name is required'],
      category_id: ['Category is required'],
    },
  },
};

describe('useApi', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    list.needResetSelectedRows(false);
    list.needRefresh(false);
  });

  it('can get response data from apiFetch', async () => {
    const { apiFetch } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    const response = await apiFetch('GET', '/api/users');
    expect(response).toEqual(successResponse);
  });

  it('can get items from fetchListData', async () => {
    const { fetchListData, items } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    expect(list.refresh).toBeFalsy();
    expect(list.resetSelectedRows).toBeFalsy();
    expect(items.value).toBeNull();
    await fetchListData('/api/users', 1, 10, 'users', { column: 'name', direction: 'asc' });
    expect(items.value).toEqual(successResponse);
    expect(list.refresh).toBeFalsy();
    expect(list.resetSelectedRows).toBeTruthy();
  });

  it('can get errors from fetchListData', async () => {
    const { fetchListData } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await fetchListData('/api/users', 1, 10, 'users', { column: 'name', direction: 'asc' });
    expect(response).toEqual(errorResponse);
  });

  it('can get items from fetchData', async () => {
    const { fetchData, items } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    expect(list.refresh).toBeFalsy();
    expect(list.resetSelectedRows).toBeFalsy();
    expect(items.value).toBeNull();
    await fetchData('/api/users', {});
    expect(items.value).toEqual(successResponse);
    expect(list.refresh).toBeFalsy();
    expect(list.resetSelectedRows).toBeFalsy();
  });

  it('can get errors from fetchData', async () => {
    const { fetchData } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await fetchData('/api/users', {});
    expect(response).toEqual(errorResponse);
  });

  it('can get response from getData', async () => {
    const { getData } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve({ data: successResponse }));

    const response = await getData('/api/users');
    expect(response).toEqual(successResponse);
  });

  it('can get errors from getData', async () => {
    const { getData } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await getData('/api/users');
    expect(response).toEqual(errorResponse);
  });

  it('can run handleDeleteItem', async () => {
    const { handleDeleteItem } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    expect(list.refresh).toBeFalsy();
    expect(list.resetSelectedRows).toBeFalsy();
    await handleDeleteItem('/api/users', 1);
    expect(list.refresh).toBeTruthy();
    expect(list.resetSelectedRows).toBeFalsy();
  });

  it('can get errors from handleDeleteItem', async () => {
    const { handleDeleteItem } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await handleDeleteItem('/api/users', 1);
    expect(response).toEqual(errorResponse);
  });

  it('can get response from handleListAction', async () => {
    const { handleListAction } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    const response = await handleListAction('/api/users', {});
    expect(response).toEqual(successResponse);
  });

  it('can get errors from handleListAction', async () => {
    const { handleListAction } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await handleListAction('/api/users', {});
    expect(response).toEqual(errorResponse);
  });

  it('can get response from handleRowsImport', async () => {
    const { handleRowsImport } = useApi();

    vi.stubGlobal('$fetch', () => Promise.resolve(successResponse));

    const response = await handleRowsImport('/api/users', {});
    expect(response).toEqual(successResponse);
  });

  it('can get errors from handleRowsImport', async () => {
    const { handleRowsImport } = useApi();

    vi.stubGlobal('$fetch', () => Promise.reject(errorResponse));

    const response = await handleRowsImport('/api/users', {});
    expect(response).toEqual(errorResponse);
  });
});
