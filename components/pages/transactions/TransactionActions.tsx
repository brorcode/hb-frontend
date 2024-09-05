import { SquaresPlusIcon, TrashIcon } from '@heroicons/vue/20/solid';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryTagsApiUrl } from '~/utils/dictionary';
import { useApi } from '~/composables/useApi';

export const transactionActions = (): TableAction[] => {
  const modal = useModalStore();
  const list = useListStore();
  const tagId = ref();
  const errors = ref<string[]>([]);

  const { handleListAction } = useApi();

  const extraTagActionComponent = () => {
    return (
      <FormSelect
        apiUrl={dictionaryTagsApiUrl}
        fieldKey="tag_id"
        errors={errors.value}
        disabled={modal.pending}
        onUpdate:modelValue={handleFieldUpdate}
      />
    );
  };

  const handleFieldUpdate = (value: number) => {
    tagId.value = value;
  };

  return [
    {
      action: (selectedItems: number[]) => {
        modal.showModal({
          title: 'Добавить тег',
          text: 'Выберите тег, который необходимо добавить.',
          action: async () => {
            modal.pending = true;
            errors.value = [];
            const response = await handleListAction(`/api/v1/tags/${tagId.value}/transactions/attach`, {
              selected_items: selectedItems,
            }).finally(() => modal.pending = false);

            const error = response as ApiResponseError;
            errors.value = error?.response?._data?.errors['tag_id'] ?? [];

            if (!errors.value.length) {
              modal.hideModal();
              list.needRefresh(true);
            }
          },
          actionText: 'Добавить',
          extraComponent: extraTagActionComponent,
        });
      },
      icon: SquaresPlusIcon,
      title: 'Добавить тег',
    },
    {
      action: (selectedItems: number[]) => console.log('delete', selectedItems),
      icon: TrashIcon,
      title: 'Удалить',
      color: 'red',
    },
  ];
};
