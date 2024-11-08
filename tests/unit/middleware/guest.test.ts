import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import guestMiddleware from '~/middleware/guest';

let navigateToCalled = false;

vi.mock('#app', () => ({
  useCookie: vi.fn(() => ({
    value: 'mock-xsrf-token',
  })),
}));

vi.mock('~/composables/usePersistentState', () => ({
  usePersistentState: vi.fn(),
}));

mockNuxtImport('navigateTo', () => () => navigateToCalled = true);

describe('guest middleware', () => {
  let mockUser: Ref;

  beforeEach(() => {
    vi.clearAllMocks();
    navigateToCalled = false;
    mockUser = { value: 1 } as Ref;

    vi.mocked(usePersistentState).mockReturnValue([mockUser, vi.fn()]);
  });

  const createRoute = (name: string, path: string) => ({
    name,
    params: {},
    matched: [],
    fullPath: path,
    path,
    query: {},
    hash: '',
    meta: {},
    redirectedFrom: undefined,
    href: path,
  });

  it('should allow access to excluded routes without checking', async () => {
    const to = createRoute('verify-email-id-hash', '/verify-email-id-hash');
    const from = createRoute('index', '/index');

    const result = await guestMiddleware(to, from);

    expect(result).toBeUndefined();
    expect(navigateToCalled).toBeFalsy();
  });

  it('should redirect to the home page when user is authenticated', async () => {
    const to = createRoute('protected-route', '/protected-route');
    const from = createRoute('index', '/index');

    await guestMiddleware(to, from);

    expect(navigateToCalled).toBeTruthy();
  });
});
