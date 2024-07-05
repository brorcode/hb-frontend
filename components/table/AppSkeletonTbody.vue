<template>
  <tbody class="divide-y divide-gray-200 bg-white animate-pulse">
    <tr v-for="row in rows" :key="`skeleton-tbody-row-${row.id}`">
      <td
        v-for="(column, columnIndex) in columns"
        :key="`skeleton-tbody-column-${columnIndex}-${column.field}`"
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
  columns: Column[];
  rows?: Row[];
}>();
</script>
