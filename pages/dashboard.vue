<template>
  <div class="space-y-4 md:space-y-6 2xl:space-y-7.5">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <AppCard>
        <h4 class="text-title-md font-bold text-black">
          Баланс
        </h4>
        <span class="text-sm font-medium">{{ toCurrency(balance) }}</span>
      </AppCard>

      <AppCard>
        <h4 class="text-title-md mb-2 font-bold text-black">
          Период
        </h4>
        <Multiselect
          v-model="months"
          mode="single"
          value-prop="value"
          label="name"
          :can-clear="false"
          :can-deselect="false"
          :options="[
            { value: 1, name: '1 месяц' },
            { value: 3, name: '3 месяца' },
            { value: 6, name: '6 месяцев' },
            { value: 9, name: '9 месяцев' },
            { value: 12, name: '1 год' },
            { value: 24, name: '2 года' },
            { value: 36, name: '3 года' },
            { value: 0, name: 'За все время' },
          ]"
          @change="loadData"
        />
      </AppCard>

      <AppCard>
        <h4 class="text-title-md font-bold text-black">
          Накопления
        </h4>
        <span class="text-sm font-medium">{{ profit }}</span>
      </AppCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
      <AppCard>
        <ChartLine
          :labels="totalByMonths?.chart?.labels ?? []"
          :data="[
            {
              name: 'Доходы',
              color: '#4F46E5',
              data: debitByMonths?.chart?.data ?? [],
            },
            {
              name: 'Расходы',
              color: '#DC2626',
              data: creditByMonths?.chart?.data ?? [],
            },
            {
              name: 'Баланс',
              color: '#16A34A',
              data: totalByMonths?.chart?.data ?? [],
            },
          ]"
        />
      </AppCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <DashboardStat
        :data="debitByMonths?.data ?? []"
        title="Доходы"
        item-key="debit"
      />

      <DashboardStat
        :data="creditByMonths?.data ?? []"
        title="Расходы"
        item-key="credit"
      />

      <DashboardStat
        :data="totalByMonths?.data ?? []"
        title="Накопления"
        item-key="total"
      />
    </div>

    <!--    <div class="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5"> -->
    <!--      <AppCard> -->
    <!--        <h4 class="text-title-md font-bold text-black"> -->
    <!--          Накопления -->
    <!--        </h4> -->
    <!--        <div -->
    <!--          v-for="item in totalByMonths?.data" -->
    <!--          :key="`totla_${item.id}`" -->
    <!--          class="flex justify-between" -->
    <!--        > -->
    <!--          <div class="flex justify-between gap-1 w-7/12 text-sm font-medium"> -->
    <!--            <span>{{ item.month }}</span> -->
    <!--            <span -->
    <!--              :class="[ -->
    <!--                item.down ? 'text-red-600' : 'text-green-600', -->
    <!--                'flex items-center gap-1 text-sm font-medium text-meta-3', -->
    <!--              ]" -->
    <!--            > -->
    <!--              {{ item.percentage }}% -->
    <!--              <ArrowDownIcon -->
    <!--                v-if="item.down" -->
    <!--                class="h-4 w-4" -->
    <!--              /> -->
    <!--              <ArrowUpIcon -->
    <!--                v-else -->
    <!--                class="h-4 w-4" -->
    <!--              /> -->
    <!--            </span> -->
    <!--          </div> -->
    <!--          <div class="text-sm font-medium text-meta-3"> -->
    <!--            {{ toCurrency(item.total) }} -->
    <!--          </div> -->

    <!--          <div class="text-sm font-medium text-meta-3"> -->
    <!--            {{ toCurrency(item.balance ?? 0) }} -->
    <!--          </div> -->
    <!--        </div> -->
    <!--      </AppCard> -->
    <!--    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/20/solid';
import Multiselect from '@vueform/multiselect';
import { useApi } from '~/composables/useApi';
import { toCurrency } from '~/utils/money';
import DashboardStat from '~/components/pages/dashboard/DashboardStat.vue';
import ChartLine from '~/components/charts/ChartLine.vue';

const months = ref<number | null>(12);

const { getData } = useApi();
const balance = ref(0);
const debitByMonths = ref<DashboardStats | null>(null);
const creditByMonths = ref<DashboardStats | null>(null);
const totalByMonths = ref<DashboardStats | null>(null);

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  balance.value = await getData('/api/v1/dashboard/balance') as number;
  debitByMonths.value = await getData('/api/v1/dashboard/debit-by-month', 'POST', { months: months.value }) as DashboardStats;
  creditByMonths.value = await getData('/api/v1/dashboard/credit-by-month', 'POST', { months: months.value }) as DashboardStats;
  totalByMonths.value = await getData('/api/v1/dashboard/total-by-month', 'POST', { months: months.value }) as DashboardStats;
};

const profit = computed(() => {
  const firstTotal = totalByMonths.value?.data[0]?.balance ?? 0;
  const lastTotal = totalByMonths.value?.data[totalByMonths.value?.data.length - 1]?.balance ?? 0;

  if (firstTotal === 0 && lastTotal === 0) {
    return 'Нет данных за выбранный период';
  }

  return toCurrency(firstTotal - lastTotal);
});
</script>
