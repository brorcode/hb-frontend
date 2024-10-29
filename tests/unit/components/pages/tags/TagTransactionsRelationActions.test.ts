import { TrashIcon } from '@heroicons/vue/20/solid';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { tagTransactionsRelationActions } from '~/components/pages/tags/TagTransactionsRelationActions';
import { useModalStore } from '~/stores/modal';

const modalStorageShowModalSpy = vi.spyOn(useModalStore(), 'showModal');
let listRefreshCalled: boolean;

mockNuxtImport('useListStore', () => {
  return () => ({
    needRefresh: (value: boolean) => {
      listRefreshCalled = value;
    },
  });
});

const { useApiMock } = vi.hoisted(() => {
  return {
    useApiMock: vi.fn(() => {
      return {
        handleListAction: () => Promise.resolve({
          response: {
            _data: {
              errors: {},
            },
          },
        }),
      };
    }),
  };
});

mockNuxtImport('useApi', () => {
  return useApiMock;
});

describe('tagTransactionsRelationActions', () => {
  beforeEach(async () => {
    listRefreshCalled = false;
  });

  it('should show modal when action is triggered', () => {
    const actions = tagTransactionsRelationActions();

    // Trigger the action
    actions[0].action([1, 2]);

    expect(modalStorageShowModalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Открепить тег',
      text: 'Вы собираетесь открепить тег от выбранных транзакций. Вы уверены, что хотите продолжить?',
      actionText: 'Открепить',
      type: 'warning',
      icon: TrashIcon,
    }));
  });

  it('should call handleListAction and refresh list on successful detach', async () => {
    const actions = tagTransactionsRelationActions();
    const modal = useModalStore();

    // Trigger the action
    actions[0].action([1, 2]);

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeTruthy();
  });

  it('should call handleListAction and does not refresh list on failed detach', async () => {
    useApiMock.mockImplementation(() => {
      return {
        handleListAction: () => Promise.resolve({
          response: {
            _data: {
              errors: {
                tag_id: ['some error'],
              },
            },
          },
        }),
      };
    });

    const actions = tagTransactionsRelationActions();
    const modal = useModalStore();

    // Trigger the action
    actions[0].action([1, 2]);

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeFalsy();
  });
});
