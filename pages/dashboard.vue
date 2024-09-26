<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
    <AppCard>
      <div class="flex items-end justify-between">
        <div>
          <h4 class="text-title-md font-bold text-black">
            Баланс
          </h4>
          <span class="text-sm font-medium">{{ toCurrency(balance) }}</span>
        </div>

        <span class="flex items-center gap-1 text-sm font-medium text-meta-3 text-green-600">
          0.43%
          <ArrowUpIcon class="h-4 w-4" />
        </span>
      </div>
    </AppCard>

    <AppCard>
      <div class="flex items-end justify-between">
        <div>
          <h4 class="text-title-md font-bold text-black">
            Доход за месяц
          </h4>
          <span class="text-sm font-medium">{{ toCurrency(debitByMonth) }}</span>
        </div>

        <span class="flex items-center gap-1 text-sm font-medium text-meta-3 text-red-600">
          0.43%
          <ArrowDownIcon class="h-4 w-4" />
        </span>
      </div>
    </AppCard>

    <AppCard>
      <div class="flex items-end justify-between">
        <div>
          <h4 class="text-title-md font-bold text-black">
            Расход за месяц
          </h4>
          <span class="text-sm font-medium">{{ toCurrency(creditByMonth) }}</span>
        </div>

        <span class="flex items-center gap-1 text-sm font-medium text-meta-3 text-red-600">
          0.43%
          <ArrowDownIcon class="h-4 w-4" />
        </span>
      </div>
    </AppCard>

    <AppCard>
      <div class="flex items-end justify-between">
        <div>
          <h4 class="text-title-md font-bold text-black">
            Сумма за месяц
          </h4>
          <span class="text-sm font-medium">{{ toCurrency(totalByMonth) }}</span>
        </div>

        <span class="flex items-center gap-1 text-sm font-medium text-meta-3 text-red-600">
          0.43%
          <ArrowDownIcon class="h-4 w-4" />
        </span>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/20/solid';
import { useApi } from '~/composables/useApi';
import { toCurrency } from '~/utils/money';

const { getData } = useApi();
const balance = ref(0);
const debitByMonth = ref(0);
const creditByMonth = ref(0);
const totalByMonth = ref(0);

onMounted(async () => {
  balance.value = await getData('/api/v1/dashboard/balance') as number;
  debitByMonth.value = await getData('/api/v1/dashboard/debit-by-month') as number;
  creditByMonth.value = await getData('/api/v1/dashboard/credit-by-month') as number;
  totalByMonth.value = await getData('/api/v1/dashboard/total-by-month') as number;
});
</script>
