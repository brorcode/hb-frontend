import { TrashIcon } from '@heroicons/vue/20/solid';
import { useApi } from '~/composables/useApi';

export const tagTransactionsRelationActions = (): TableAction[] => {
  const modal = useModalStore();
  const list = useListStore();
  const route = useRoute();
  const errors = ref<string[]>([]);
  const { id } = route.params as { id: string };

  const { handleListAction } = useApi();

  return [
    {
      action: (selectedItems: number[]) => {
        modal.showModal({
          title: 'Открепить тег',
          text: 'Вы собираетесь открепить тег от выбранных транзакций. Вы уверены, что хотите продолжить?',
          action: async () => {
            modal.pending = true;
            const response = await handleListAction(`/api/v1/tags/${id}/transactions/detach`, {
              selected_items: selectedItems,
            }).finally(() => modal.pending = false);

            const error = response as ApiResponseError;
            errors.value = error?.response?._data?.errors['tag_id'] ?? [];

            if (!errors.value.length) {
              modal.hideModal();
              list.needRefresh(true);
            }
          },
          actionText: 'Открепить',
          type: 'warning',
          icon: TrashIcon,
        });
      },
      icon: TrashIcon,
      title: 'Открепить тег',
      type: 'warning',
    },
  ];
};
