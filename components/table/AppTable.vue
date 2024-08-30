<template>
  <table class="min-w-full divide-y divide-gray-300">
    <AppSkeletonThead v-if="loading" :columns="columns" />
    <thead v-else>
      <tr>
        <th
          v-for="(column, columnIndex) in columns"
          :key="`thead-column-${columnIndex}-${column.field}`"
          scope="col"
          :class="[
            'px-3 py-4 text-left text-sm font-semibold text-gray-900',
            columnIndex === 0 ? 'pl-0' : ''
          ]"
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
                sorting.column === column.field ? 'bg-gray-200' : ''
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
              <ChevronUpDownIcon v-else class="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </th>
        <th
          scope="col"
          class="relative px-3 py-4 pr-0 text-sm font-semibold text-gray-900 text-right"
        >
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>

    <AppSkeletonTbody v-if="loading" :columns-count="columns.length" />
    <tbody v-else class="divide-y divide-gray-200 bg-white">
      <tr v-if="!listData?.length">
        <td :colspan="columns.length">
          <div class="text-center p-4">Nothing found</div>
        </td>
      </tr>
      <tr v-for="row in listData" v-else :key="`tbody-row-${row.id}`">
        <td
          v-for="(column, columnIndex) in columns"
          :key="`tbody-column-${columnIndex}-${column.field}`"
          :class="[
            'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
            columnIndex === 0 ? 'pl-0' : ''
          ]"
        >
          {{ column.body ? column.body(row) : (row[column.field] ?? 'N/A') }}
        </td>
        <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
          <div class="space-x-2 flex justify-end">
            <NuxtLink
              class="text-indigo-600 hover:text-indigo-900"
              :to="`${path}/${row.id}/${pageMode.EDIT}`"
              ><PencilIcon class="h-5 w-5"
            /></NuxtLink>
            <NuxtLink
              class="text-indigo-600 hover:text-indigo-900"
              :to="`${path}/${row.id}/${pageMode.VIEW}`"
              ><EyeIcon class="h-5 w-5"
            /></NuxtLink>
            <TrashIcon
              class="text-red-600 h-5 w-5 cursor-pointer"
              @click="$emit('deleteItem', row.id)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <AppPagination
    :per-page="perPage"
    :has-next-page="meta?.hasNextPage"
    @page-change="$emit('pageChange', $event, sorting)"
    @per-page-change="$emit('perPageChange', $event)"
  />
</template>

<script setup lang="ts">
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import AppSkeletonThead from '~/components/table/AppSkeletonThead.vue';
import AppSkeletonTbody from '~/components/table/AppSkeletonTbody.vue';
import AppPagination from '~/components/table/AppPagination.vue';
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';
import { defaultSorting } from '~/utils/constants';

defineProps<{
  path: string;
  loading: boolean;
  columns: Column[];
  perPage: number;
  meta?: ResponseMeta;
  listData?: Row[];
}>();

const emit = defineEmits(['pageChange', 'perPageChange', 'applySorting', 'deleteItem']);

const sorting = reactive<Sorting>(defaultSorting);

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
    } else {
      // If the clicked column is already sorted in ASC order, toggle the direction
      sorting.direction = 'ASC';
    }
  } else {
    // If a different column is clicked, reset the sorting
    sorting.column = field;
    sorting.direction = 'DESC';
  }

  // Emit the event with the new sorting parameters
  emit('applySorting', sorting);
};
</script>
