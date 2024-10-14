import { SquaresPlusIcon, TrashIcon } from '@heroicons/vue/20/solid';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryTagsApiUrl } from '~/utils/dictionary';
import { useApi } from '~/composables/useApi';

export const transactionActions = (): TableAction[] => {
  const modal = useModalStore();
  const list = useListStore();
  const tagId = ref<number | null>(null);
  const errors = ref<string[]>([]);

  const { handleListAction } = useApi();

  const handleFieldUpdate = (value: number) => {
    errors.value = [];
    tagId.value = value;
  };

  const extraTagActionComponent = markRaw(defineComponent({
    setup() {
      return () => h(FormSelect, {
        'apiUrl': dictionaryTagsApiUrl,
        'fieldKey': 'tag_id',
        'errors': errors.value,
        'disabled': modal.pending,
        'onUpdate:modelValue': handleFieldUpdate,
      });
    },
  }));

  return [
    {
      action: (selectedItems: number[]) => {
        tagId.value = null;
        errors.value = [];

        modal.showModal({
          title: 'Добавить тег',
          text: 'Выберите тег, который необходимо добавить.',
          action: async () => {
            modal.pending = true;
            const response = await handleListAction(`/api/v1/tags/${tagId.value}/transactions/attach`, {
              selected_items: selectedItems,
            }).finally(() => modal.pending = false);

            const error = response as ApiResponseError;
            const tagErrors = error?.response?._data?.errors || {};
            errors.value = tagErrors['tag_id'] || [];

            if (!errors.value.length) {
              modal.hideModal();
              list.needRefresh(true);
            }
          },
          actionText: 'Добавить',
          icon: SquaresPlusIcon,
          extraComponent: extraTagActionComponent,
        });
      },
      icon: SquaresPlusIcon,
      title: 'Добавить тег',
    },
    {
      action: (selectedItems: number[]) => {
        modal.showModal({
          title: 'Удалить транзакции',
          text: 'Выберите собираетесь удалить выбранные транзакции. Вы уверены, что хотите продолжить?',
          action: async () => {
            modal.pending = true;
            errors.value = [];
            await handleListAction(`/api/v1/transactions/destroy-many`, {
              selected_items: selectedItems,
            }, 'DELETE').finally(() => modal.pending = false);

            modal.hideModal();
            list.needRefresh(true);
          },
          icon: TrashIcon,
          type: 'danger',
          actionText: 'Удалить',
        });
      },
      icon: TrashIcon,
      title: 'Удалить',
      type: 'danger',
    },
  ];
};
