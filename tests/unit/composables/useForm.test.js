import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VALIDATION_ERROR_STATUS } from '~/constants/statusCodes';

let initialForm;

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

const { useApiMock } = vi.hoisted(() => {
  return {
    useApiMock: vi.fn(() => {
      return {
        apiFetch: () => Promise.resolve({
          data: successResponse,
        }),
      };
    }),
  };
});

mockNuxtImport('useApi', () => {
  return useApiMock;
});

describe('useForm', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    initialForm = {
      name: { value: '', errors: [] },
      email: { value: '', errors: [] },
      is_active: { value: false, errors: [] },
      category_id: { value: false, relation_key: 'category', relation_value: null, errors: [] },
    };
  });

  it('updates field value correctly', () => {
    const { handleFieldUpdate, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    handleFieldUpdate('name', 'New Name');
    expect(form.name.value).toBe('New Name');
    expect(form.name.errors).toEqual([]);
  });

  it('submits form data correctly', async () => {
    const { submit, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    expect(form.category_id.relation_value).toBeNull();
    await submit('/api/users', 'POST', vi.fn());
    expect(form.name.value).toBe('Test Name');
    expect(form.category_id.relation_value).toBe('Category Relation Name');
  });

  it('can handle form data errors correctly', async () => {
    useApiMock.mockImplementation(() => {
      return {
        apiFetch: () => Promise.reject({
          response: errorResponse,
        }),
      };
    });

    const { submit, form } = useForm(initialForm);

    expect(form.name.errors).toEqual([]);
    expect(form.category_id.errors).toEqual([]);
    await submit('/api/users', 'POST', vi.fn());
    expect(form.name.errors).toEqual(['Name is required']);
    expect(form.category_id.errors).toEqual(['Category is required']);
  });

  it('gets fetchItem form data correctly', async () => {
    useApiMock.mockImplementation(() => {
      return {
        apiFetch: () => Promise.resolve({
          data: successResponse,
        }),
      };
    });

    const { fetchItem, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    await fetchItem('/api/users', 1);
    expect(form.name.value).toBe('Test Name');
  });

  it('can get fetchItem form data errors', async () => {
    useApiMock.mockImplementation(() => {
      return {
        apiFetch: () => Promise.reject({
          response: errorResponse,
        }),
      };
    });

    const { fetchItem, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    const errors = await fetchItem('/api/users', 1);
    expect(form.name.value).toBe('');
    expect(errors).toEqual({ response: errorResponse });
  });

  it('gets fetchUser form data correctly', async () => {
    useApiMock.mockImplementation(() => {
      return {
        apiFetch: () => Promise.resolve({
          data: successResponse,
        }),
      };
    });

    const { fetchUser, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    await fetchUser();
    expect(form.name.value).toBe('Test Name');
  });

  it('can get fetchUser form data errors', async () => {
    useApiMock.mockImplementation(() => {
      return {
        apiFetch: () => Promise.reject({
          response: errorResponse,
        }),
      };
    });

    const { fetchUser, form } = useForm(initialForm);

    expect(form.name.value).toBe('');
    const errors = await fetchUser();
    expect(form.name.value).toBe('');
    expect(errors).toEqual({ response: errorResponse });
  });
});
