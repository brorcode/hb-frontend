import { SquaresPlusIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { transactionActions } from '~/components/pages/transactions/TransactionActions';
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

describe('transactionActions', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    listRefreshCalled = false;
  });

  it('should show modal when add tab action is triggered', () => {
    const actions = transactionActions();

    // Trigger the action
    actions[0].action([1, 2]);

    expect(modalStorageShowModalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Добавить тег',
      text: 'Выберите тег, который необходимо добавить.',
      actionText: 'Добавить',
      icon: SquaresPlusIcon,
      extraComponent: expect.anything(),
    }));
  });

  it('should show modal when remove tab action is triggered', () => {
    const actions = transactionActions();

    // Trigger the action
    actions[1].action([1, 2]);

    expect(modalStorageShowModalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Удалить транзакции',
      text: 'Выберите собираетесь удалить выбранные транзакции. Вы уверены, что хотите продолжить?',
      actionText: 'Удалить',
      type: 'danger',
      icon: TrashIcon,
    }));
  });

  it('should call handleListAction and refresh list on successful add tag action', async () => {
    const actions = transactionActions();
    const modal = useModalStore();

    // Trigger the action
    actions[0].action([1, 2]);

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeTruthy();
  });

  it('should call handleListAction and refresh list on successful remove tag action', async () => {
    const actions = transactionActions();
    const modal = useModalStore();

    // Trigger the action
    actions[1].action([1, 2]);

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeTruthy();
  });

  it('should call handleListAction and does not refresh list on failed add tag action', async () => {
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

    const actions = transactionActions();
    const modal = useModalStore();

    // Trigger the action
    actions[0].action([1, 2]);

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeFalsy();
  });
});
