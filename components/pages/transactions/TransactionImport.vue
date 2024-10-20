<template>
  <button
    data-testid="import-transactions-button"
    class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    @click.prevent="handleImport"
  >
    Импортировать Транзакции
  </button>
</template>

<script setup lang="ts">
import { SquaresPlusIcon } from '@heroicons/vue/20/solid';
import { useApi } from '~/composables/useApi';
import FormFileCSV from '~/components/form/FormFileCSV.vue';
import FormSelect from '~/components/form/FormSelect.vue';
import { dictionaryAccountsApiUrl } from '~/utils/dictionary';

const { handleRowsImport } = useApi();

const modal = useModalStore();
const list = useListStore();
const errors = reactive({
  file: [] as string[],
  accountId: [] as string[],
});
const accountId = ref<number | null>(null);
const formData = new FormData();

const handleFileUpload = (file: File) => {
  errors.file = [];
  formData.set('file', file);
};

const handleFieldUpdate = (value: number) => {
  errors.accountId = [];
  accountId.value = value;
};

const component = markRaw(defineComponent({
  setup() {
    return () => h('div', [
      h(FormSelect, {
        'apiUrl': dictionaryAccountsApiUrl,
        'fieldKey': 'account_id',
        'errors': errors.accountId,
        'disabled': modal.pending,
        'onUpdate:modelValue': handleFieldUpdate,
      }),
      h(FormFileCSV, {
        'fieldKey': 'file',
        'errors': errors.file,
        'disabled': modal.pending,
        'onUpdate:modelValue': handleFileUpload,
      }),
    ]);
  },
}));

const handleImport = () => {
  formData.delete('file');
  accountId.value = null;
  errors.file = [];
  errors.accountId = [];

  modal.showModal({
    title: 'Импортировать транзакции',
    text: 'Выберите аккаунт и загрузите CSV файл.',
    action: async () => {
      modal.pending = true;
      const response = await handleRowsImport(`/api/v1/accounts/${accountId.value}/transactions/import`, formData)
        .finally(() => modal.pending = false)
      ;

      const error = response as ApiResponseError;
      errors.accountId = error?.response?._data?.errors['account_id'] ?? [];
      errors.file = error?.response?._data?.errors['file'] ?? [];

      if (!errors.accountId.length && !errors.file.length) {
        modal.hideModal();
        list.needRefresh(true);
      }
    },
    actionText: 'Добавить',
    icon: SquaresPlusIcon,
    extraComponent: component,
  });
};
</script>
