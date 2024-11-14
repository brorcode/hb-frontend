import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let backCalled = false;
let navagateToCalled = false;

const { useRouterMock } = vi.hoisted(() => {
  return {
    useRouterMock: vi.fn(() => {
      return {
        options: {
          history: {
            state: {
              back: true,
            },
          },
        },
        back: () => backCalled = true,
      };
    }),
  };
});

mockNuxtImport('useRouter', () => {
  return useRouterMock;
});

mockNuxtImport('navigateTo', () => () => navagateToCalled = true);

describe('utils: helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    backCalled = false;
    navagateToCalled = false;
  });

  it('calls router.back() when router.options.history.state.back is true', () => {
    expect(backCalled).toBeFalsy();
    expect(navagateToCalled).toBeFalsy();
    goBack('/path');
    expect(backCalled).toBeTruthy();
    expect(navagateToCalled).toBeFalsy();
  });

  it('calls navigateTo(path) regardless of router.options.history.state.back value', () => {
    useRouterMock.mockImplementation(() => {
      return {
        options: {
          history: {
            state: {
              back: false,
            },
          },
        },
        back: () => backCalled = true,
      };
    });

    expect(backCalled).toBeFalsy();
    expect(navagateToCalled).toBeFalsy();
    goBack('/path');
    expect(backCalled).toBeFalsy();
    expect(navagateToCalled).toBeTruthy();
  });
});
