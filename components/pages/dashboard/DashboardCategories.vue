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
        <div
          data-testid="show-transactions-button"
          class="flex space-x-1 items-center cursor-pointer"
          @click="$emit('showTransactions', { id: item.id, name: item.title })"
        >
          <span class="hover:underline">{{ item.title }}</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 text-indigo-600" />
        </div>
      </div>
      <div class="text-sm font-medium text-meta-3">
        {{ toCurrency(item.total) }}
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { toCurrency } from '~/utils/money';

defineProps<{
  data: DashboardCategory[] | null;
  title: string;
  itemKey: string;
}>();

defineEmits(['showTransactions']);
</script>
