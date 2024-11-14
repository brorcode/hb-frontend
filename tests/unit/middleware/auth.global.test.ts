import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import type { Store } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import authMiddleware from '~/middleware/auth.global';

let navigateToCalled = false;

vi.mock('#app', () => ({
  useCookie: vi.fn(() => ({
    value: 'mock-xsrf-token',
  })),
}));

vi.mock('~/composables/usePersistentState', () => ({
  usePersistentState: vi.fn(),
}));

vi.mock('~/stores/flashMessages', () => ({
  useFlashMessagesStore: vi.fn(() => ({
    addMessage: vi.fn(),
  })),
}));

mockNuxtImport('navigateTo', () => () => navigateToCalled = true);

describe('auth middleware', () => {
  let mockUser: Ref;
  let mockFlashMessages: Store<'flashMessages', never>;

  beforeEach(() => {
    vi.clearAllMocks();
    navigateToCalled = false;
    mockUser = { value: null } as Ref;
    mockFlashMessages = {
      addMessage: vi.fn(),
      removeMessage: vi.fn(),
      $state: {},
      $patch: vi.fn(),
      $reset: vi.fn(),
      $subscribe: vi.fn(),
      $dispose: vi.fn(),
      $id: 'flashMessages',
    } as Store<'flashMessages', never>;

    vi.mocked(usePersistentState).mockReturnValue([mockUser, vi.fn()]);
    vi.mocked(useFlashMessagesStore).mockReturnValue(mockFlashMessages);
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

  const setupPermissions = (permissions: string[]) => {
    mockUser.value = { permissions };
  };

  it('should allow access to excluded routes without authentication', async () => {
    const to = createRoute('login', '/login');
    const from = createRoute('index', '/index');

    const result = await authMiddleware(to, from);

    expect(result).toBeUndefined();
    expect(navigateToCalled).toBeFalsy();
  });

  it('should redirect to login when user is not authenticated', async () => {
    const to = createRoute('protected-route', '/protected-route');
    const from = createRoute('index', '/index');

    await authMiddleware(to, from);

    expect(navigateToCalled).toBeTruthy();
  });

  it('should allow access when user is authenticated and has required permissions', async () => {
    setupPermissions(['admin']);

    const to = createRoute('admin-route', '/admin-route');
    const from = createRoute('index', '/index');

    vi.mock('~/config/routePermissions', () => ({
      routePermissions: {
        'admin-route': 'admin',
      },
    }));

    const result = await authMiddleware(to, from);

    expect(result).toBeUndefined();
    expect(navigateToCalled).toBeFalsy();
  });

  it('should redirect to forbidden when user lacks required permissions', async () => {
    setupPermissions(['user']);

    const to = createRoute('admin-route', '/admin-route');
    const from = createRoute('index', '/index');

    vi.mock('~/config/routePermissions', () => ({
      routePermissions: {
        'admin-route': 'admin',
      },
    }));

    await authMiddleware(to, from);

    expect(navigateToCalled).toBeTruthy();
  });
});
