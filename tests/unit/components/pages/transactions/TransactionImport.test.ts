import { SquaresPlusIcon } from '@heroicons/vue/20/solid';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TransactionImport from '~/components/pages/transactions/TransactionImport.vue';
import { useModalStore } from '~/stores/modal';

const modalStorageShowModalSpy = vi.spyOn(useModalStore(), 'showModal');
const modalStorageHideModalSpy = vi.spyOn(useModalStore(), 'hideModal');
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
        handleRowsImport: () => Promise.resolve({
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

describe('transactionImport', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    listRefreshCalled = false;
  });

  it('renders the import component correctly', async () => {
    const component = await mountSuspended(TransactionImport);

    expect(component.html()).toContain('Импортировать Транзакции');
  });

  it('should show modal when click import transaction button', async () => {
    const component = await mountSuspended(TransactionImport);
    component.find('[data-testid="import-transactions-button"]').trigger('click');

    expect(modalStorageShowModalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Импортировать транзакции',
      text: 'Выберите аккаунт и загрузите CSV файл.',
      actionText: 'Добавить',
      icon: SquaresPlusIcon,
      extraComponent: expect.anything(),
    }));
  });

  it('should call hideModal and refresh list no errors in API response', async () => {
    const component = await mountSuspended(TransactionImport);
    component.find('[data-testid="import-transactions-button"]').trigger('click');
    const modal = useModalStore();

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeTruthy();
    expect(modalStorageHideModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call hideModal and refresh list if account_id errors in API response', async () => {
    useApiMock.mockImplementation(() => {
      return {
        handleRowsImport: () => Promise.resolve({
          response: {
            _data: {
              errors: {
                account_id: ['some error'],
              },
            },
          },
        }),
      };
    });

    const component = await mountSuspended(TransactionImport);
    component.find('[data-testid="import-transactions-button"]').trigger('click');
    const modal = useModalStore();

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeFalsy();
    expect(modalStorageHideModalSpy).not.toHaveBeenCalled();
  });

  it('should not call hideModal and refresh list if file errors in API response', async () => {
    useApiMock.mockImplementation(() => {
      return {
        handleRowsImport: () => Promise.resolve({
          response: {
            _data: {
              errors: {
                file: ['some error'],
              },
            },
          },
        }),
      };
    });

    const component = await mountSuspended(TransactionImport);
    component.find('[data-testid="import-transactions-button"]').trigger('click');
    const modal = useModalStore();

    // Simulate modal action run
    expect(listRefreshCalled).toBeFalsy();
    await modal.action();
    expect(listRefreshCalled).toBeFalsy();
    expect(modalStorageHideModalSpy).not.toHaveBeenCalled();
  });
});
