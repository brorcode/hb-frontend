<template>
  <thead class="animate-pulse">
    <tr>
      <th
        v-for="(column, columnIndex) in columns"
        :key="`skeleton-thead-column-${columnIndex}-${column.field}`"
        scope="col"
        class="px-3 py-4"
      >
        <div class="h-2 bg-slate-200 rounded" />
      </th>
      <th
        scope="col"
        class="px-3 py-4"
      >
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
defineProps<{
  columns: Column[];
}>();
</script>
