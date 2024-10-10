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
        <span>{{ item.month }}</span>
        <span
          v-if="item.percentage !== 0"
          :class="[
            (item.down && itemKey === 'credit') ? 'text-green-600'
            : ((item.down || itemKey === 'credit') ? 'text-red-600'
              : 'text-green-600'),
            'flex items-center gap-1 text-sm font-medium text-meta-3',
          ]"
        >
          {{ item.percentage }}%
          <ArrowDownIcon
            v-if="item.down"
            class="h-4 w-4"
          />
          <ArrowUpIcon
            v-else
            class="h-4 w-4"
          />
        </span>
      </div>
      <div class="text-sm font-medium text-meta-3">
        {{ toCurrency(item.total) }}
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid';
import { toCurrency } from '~/utils/money';

defineProps<{
  data: DashboardStatItem[] | null;
  title: string;
  itemKey: string;
}>();
</script>
