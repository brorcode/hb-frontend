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
          {{ column.header }}
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
          {{ column.body ? column.body(row) : row[column.field] ?? 'N/A' }}
        </td>
        <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
          <div class="space-x-2 flex justify-end">
            <NuxtLink
              class="text-indigo-600 hover:text-indigo-900"
              :to="`${url}/${row.id}/${pageMode.EDIT}`"
              ><PencilIcon class="h-5 w-5"
            /></NuxtLink>
            <NuxtLink
              class="text-indigo-600 hover:text-indigo-900"
              :to="`${url}/${row.id}/${pageMode.VIEW}`"
              ><EyeIcon class="h-5 w-5"
            /></NuxtLink>
            <TrashIcon class="text-red-600 h-5 w-5 cursor-pointer" @click="deleteItem(row.id)" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <AppPagination :has-next-page="meta?.hasNextPage" @page-change="handlePageChange" />
</template>

<script setup lang="ts">
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/vue/24/solid';
import AppSkeletonThead from '~/components/table/AppSkeletonThead.vue';
import AppSkeletonTbody from '~/components/table/AppSkeletonTbody.vue';
import AppPagination from '~/components/table/AppPagination.vue';

defineProps<{
  url: string;
  loading: boolean;
  columns: Column[];
  meta?: ResponseMeta;
  listData?: Row[];
}>();

const emit = defineEmits(['pageChange', 'deleteItem']);

const handlePageChange = (page: number) => {
  emit('pageChange', page);
};

const deleteItem = (id: number) => {
  emit('deleteItem', id);
};
</script>
