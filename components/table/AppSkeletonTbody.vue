<template>
  <tbody class="divide-y divide-gray-200 bg-white animate-pulse">
    <tr v-for="rowIndex in rowsCount" :key="`skeleton-tbody-row-${rowIndex}`">
      <td
        v-for="columnIndex in columnsCount"
        :key="`skeleton-tbody-column-${columnIndex}`"
        :class="['px-3 py-4', columnIndex === 0 ? 'pl-0' : '']"
      >
        <div class="h-2 bg-slate-200 rounded"></div>
      </td>
      <td class="px-3 py-4">
        <div class="h-2 bg-slate-200 rounded"></div>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
defineProps<{
  rowsCount: number;
  columnsCount: number;
}>();
</script>
