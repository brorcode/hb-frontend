<template>
  <div class="relative">
    <div class="flex items-center justify-between pt-4 pb-4">
      <div class="flex">
        <TableActions
          v-if="tableActions"
          :table-actions="tableActions"
          :selected-rows="selectedRows"
        />
      </div>
      <div class="flex justify-end">
        <NuxtLink
          :to="`${path}/create`"
          class="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Добавить {{ titleSingular }}
        </NuxtLink>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-300">
        <AppSkeletonThead
          v-if="loading"
          :columns="columns"
        />
        <thead v-else>
          <tr>
            <th
              v-if="tableActions"
              scope="col"
              class="relative px-7 sm:w-12 sm:px-6"
            >
              <input
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                :checked="indeterminate || (listData.length > 0 && selectedRows.length === listData.length)"
                @change="handleAllRowsClick"
              >
            </th>
            <th
              v-for="(column, columnIndex) in columns"
              :key="`thead-column-${columnIndex}-${column.field}`"
              scope="col"
              class="px-3 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
            >
              <div
                :class="['group inline-flex', (column.sortable ?? true) ? 'cursor-pointer' : '']"
                @click="handleSortingChange(column)"
              >
                {{ column.header }}
                <span
                  v-if="column.sortable ?? true"
                  :class="[
                    'ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200',
                    sorting.column === column.field ? 'bg-gray-200' : '',
                  ]"
                >
                  <ChevronUpIcon
                    v-if="sorting.column === column.field && sorting.direction === 'ASC'"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    v-else-if="sorting.column === column.field && sorting.direction === 'DESC'"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                  <ChevronUpDownIcon
                    v-else
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </th>
            <th
              scope="col"
              class="relative px-3 py-4 text-sm font-semibold text-gray-900 text-right"
            >
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>

        <AppSkeletonTbody
          v-if="loading"
          :columns-count="columns.length"
          :rows-count="perPage"
        />
        <tbody
          v-else
          class="divide-y divide-gray-200 bg-white"
        >
          <tr v-if="!listData.length">
            <td :colspan="columns.length + (tableActions ? 2 : 1)">
              <div class="text-center p-4">
                Nothing found
              </div>
            </td>
          </tr>
          <tr
            v-for="row in listData"
            v-else
            :key="`tbody-row-${row.id}`"
            :class="[selectedRows.includes(row.id) && 'bg-gray-50']"
          >
            <td
              v-if="tableActions"
              class="relative px-7 sm:w-12 sm:px-6"
            >
              <div
                v-if="selectedRows.includes(row.id)"
                class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
              />
              <input
                v-model="selectedRows"
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                :value="row.id"
              >
            </td>
            <td
              v-for="(column, columnIndex) in columns"
              :key="`tbody-column-${columnIndex}-${column.field}`"
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
            >
              <component :is="handleBody(column, row)" />
            </td>
            <td class="relative whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
              <div class="space-x-2 flex justify-end">
                <NuxtLink
                  class="text-indigo-600 hover:text-indigo-900"
                  :to="`${path}/${row.id}/${pageMode.EDIT}`"
                ><PencilIcon class="h-5 w-5" /></NuxtLink>
                <NuxtLink
                  class="text-indigo-600 hover:text-indigo-900"
                  :to="`${path}/${row.id}/${pageMode.VIEW}`"
                ><EyeIcon class="h-5 w-5" /></NuxtLink>
                <TrashIcon
                  class="text-red-600 h-5 w-5 cursor-pointer"
                  @click="() => deleteItem(row.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AppPagination
      :per-page="perPage"
      :has-next-page="meta?.hasNextPage"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';
import { isVNode } from 'vue';
import AppSkeletonThead from '~/components/table/AppSkeletonThead.vue';
import AppSkeletonTbody from '~/components/table/AppSkeletonTbody.vue';
import AppPagination from '~/components/table/AppPagination.vue';
import { defaultSorting } from '~/utils/constants';
import TableActions from '~/components/table/TableActions.vue';

const props = defineProps<{
  path: string;
  title: string;
  titleSingular: string;
  loading: boolean;
  columns: Column[];
  perPage: number;
  listData: Row[];
  meta?: ResponseMeta;
  tableActions?: TableAction[];
  defaultSort?: Sorting;
}>();

const emit = defineEmits(['pageChange', 'perPageChange', 'applySorting', 'deleteItem']);
const modal = useModalStore();
const list = useListStore();

const sorting = reactive<Sorting>(props.defaultSort ?? deepCopy(defaultSorting) as Sorting);
const selectedRows = ref<number[]>([]);

watch(() => list.resetSelectedRows, reset => reset && clearSelectedRows());

const indeterminate = computed(
  () => selectedRows.value.length > 0 && selectedRows.value.length < props.listData.length,
);

const handleSortingChange = (column: Column) => {
  if (column.sortable === false) {
    return;
  }

  const field = column.field;
  if (sorting.column === field) {
    if (sorting.direction === 'ASC') {
      // If the clicked column is already sorted in DESC order, reset the sorting
      sorting.column = null;
      sorting.direction = null;
    }
    else {
      // If the clicked column is already sorted in ASC order, toggle the direction
      sorting.direction = 'ASC';
    }
  }
  else {
    // If a different column is clicked, reset the sorting
    sorting.column = field;
    sorting.direction = 'DESC';
  }

  // Emit the event with the new sorting parameters
  emit('applySorting', sorting);
  clearSelectedRows();
};

const handlePageChange = (page: number) => {
  emit('pageChange', page);
  clearSelectedRows();
};

const handlePerPageChange = (newPerPage: number) => {
  emit('perPageChange', newPerPage);
  clearSelectedRows();
};

const deleteItem = (id: number) => {
  modal.showModal({
    title: 'Удалить',
    text: 'Вы уверены, что хотите продолжить?',
    action: async () => {
      emit('deleteItem', id);
      modal.hideModal();
    },
    icon: TrashIcon,
    type: 'danger',
    actionText: 'Удалить',
  });
};

const clearSelectedRows = () => {
  selectedRows.value = [];
  list.needResetSelectedRows(false);
};

const handleAllRowsClick = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedRows.value = target.checked ? props.listData.map(row => row.id) : [];
};

const handleBody = (column: Column, row: Row) => {
  if (column.body) {
    const body = column.body(row);

    if (isVNode(body)) {
      return body;
    }

    return h('span', { innerHTML: column.body(row) });
  }

  return h('span', { innerHTML: row[column.field] ?? 'N/A' });
};
</script>
