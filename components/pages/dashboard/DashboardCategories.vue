<template>
  <AppCard>
    <h4 class="text-title-md mb-1 font-bold text-black">
      {{ title }}
    </h4>
    <div
      v-if="data?.length === 0"
      class="text-sm font-medium"
    >
      Нет данных за выбранный период
    </div>
    <div
      v-for="item in data"
      :key="`${itemKey}_${item.id}`"
      class="flex justify-between"
    >
      <div class="flex justify-between gap-1 w-[65%] text-sm font-medium">
        <span>{{ item.title }}</span>
      </div>
      <div class="text-sm font-medium text-meta-3">
        {{ toCurrency(item.total) }}
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { toCurrency } from '~/utils/money';

defineProps<{
  data: DashboardCategory[] | null;
  title: string;
  itemKey: string;
}>();
</script>
