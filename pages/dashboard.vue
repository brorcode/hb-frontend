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
        <span class="text-sm font-medium">{{ toCurrency(totalByMonths?.total ?? 0) }}</span>
      </AppCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
      <AppCard>
        <ChartLine
          :labels="totalByMonths?.chart?.labels ?? []"
          :data="[
            {
              name: 'Доходы',
              color: '#16A34A',
              data: debitByMonths?.chart?.data ?? [],
            },
            {
              name: 'Расходы',
              color: '#DC2626',
              data: creditByMonths?.chart?.data ?? [],
            },
            {
              name: 'Баланс',
              color: '#4F46E5',
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
        :total="debitByMonths?.total ?? 0"
        item-key="debit"
        @show-transactions="goToTransactions($event, { id: transactionType.DEBIT_TYPE_ID, name: 'Доход' })"
      />

      <DashboardStat
        :data="creditByMonths?.data ?? []"
        title="Расходы"
        :total="creditByMonths?.total ?? 0"
        item-key="credit"
        @show-transactions="goToTransactions($event, { id: transactionType.CREDIT_TYPE_ID, name: 'Расход' })"
      />

      <DashboardStat
        :data="totalByMonths?.data ?? []"
        title="Накопления"
        :total="totalByMonths?.total ?? 0"
        item-key="total"
        @show-transactions="goToTransactions($event, null)"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <AppCard>
        <h4 class="text-title-md mb-2 font-bold text-black">
          Количество категорий
        </h4>
        <Multiselect
          v-model="categoryCount"
          mode="single"
          value-prop="value"
          label="name"
          :can-clear="false"
          :can-deselect="false"
          :options="[
            { value: 5, name: 5 },
            { value: 10, name: 10 },
            { value: 20, name: 20 },
            { value: 30, name: 30 },
            { value: 40, name: 40 },
            { value: 50, name: 50 },
            { value: 0, name: 'Все' },
          ]"
          @change="(newValue: number) => loadCategories(newValue)"
        />
      </AppCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <DashboardCategories
        :data="debitByCategories ?? []"
        title="Категории Доходов"
        item-key="debit-categories"
        @show-transactions="goToTransactionsByCategory($event)"
      />

      <DashboardCategories
        :data="creditByCategories ?? []"
        title="Категории Расходов"
        item-key="credit-categories"
        @show-transactions="goToTransactionsByCategory($event)"
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
import DashboardCategories from '~/components/pages/dashboard/DashboardCategories.vue';
import { useFiltersStore } from '~/stores/filters';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';
import { transactionType } from '~/utils/constants';

const transactionTypes = ref<RelationOption[]>([]);
const months = ref<number>(12);
const categoryCount = ref<number>(20);

const { getData, fetchData, apiFetch } = useApi();
const balance = ref(0);
const debitByMonths = ref<DashboardStats | null>(null);
const creditByMonths = ref<DashboardStats | null>(null);
const totalByMonths = ref<DashboardStats | null>(null);

const creditByCategories = ref<DashboardCategory[]>([]);
const debitByCategories = ref<DashboardCategory[]>([]);

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

onMounted(async () => {
  await loadData();
  await fetchData(dictionaryTransactionTypesApiUrl, {});
  transactionTypes.value = await apiFetch('POST', dictionaryTransactionTypesApiUrl);
});

const loadData = async () => {
  balance.value = await getData('/api/v1/dashboard/balance') as number;
  debitByMonths.value = await getData('/api/v1/dashboard/debit-by-months', 'POST', { months: months.value }) as DashboardStats;
  creditByMonths.value = await getData('/api/v1/dashboard/credit-by-months', 'POST', { months: months.value }) as DashboardStats;
  totalByMonths.value = await getData('/api/v1/dashboard/total-by-months', 'POST', { months: months.value }) as DashboardStats;

  await loadCategories();
};

// const loadData = async () => {
//   // Start all API calls concurrently
//   const [balanceResponse, debitResponse, creditResponse, totalResponse] = await Promise.all([
//     getData('/api/v1/dashboard/balance') as Promise<number>,
//     getData('/api/v1/dashboard/debit-by-months', 'POST', { months: months.value }) as Promise<DashboardStats>,
//     getData('/api/v1/dashboard/credit-by-months', 'POST', { months: months.value }) as Promise<DashboardStats>,
//     getData('/api/v1/dashboard/total-by-months', 'POST', { months: months.value }) as Promise<DashboardStats>,
//     loadCategories(),
//   ]);
//
//   // Assign responses to values
//   balance.value = balanceResponse;
//   debitByMonths.value = debitResponse;
//   creditByMonths.value = creditResponse;
//   totalByMonths.value = totalResponse;
//
//   // Load categories after all previous calls are complete
//   await loadCategories();
// };

const loadCategories = async (count = categoryCount.value) => {
  creditByCategories.value = await getData('/api/v1/dashboard/credit-by-categories', 'POST', { months: months.value, category_count: count }) as DashboardCategory[];
  debitByCategories.value = await getData('/api/v1/dashboard/debit-by-categories', 'POST', { months: months.value, category_count: count }) as DashboardCategory[];
};

const goToTransactions = (date: string, transactionType: RelationOption | null) => {
  const [yearStr, monthStr] = date.split(' ');
  const year = parseInt(yearStr, 10);
  const month = monthMap[monthStr.toLowerCase()]; // Convert to lower case for matching

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  filters.clearFilters(transactionFilterName, transactionFiltersInit as Filters<unknown>);
  filters.addPreSavedFilter(transactionFilterName, 'created_at_after', startDate);
  filters.addPreSavedFilter(transactionFilterName, 'created_at_before', endDate);
  if (transactionType) {
    filters.addPreSavedFilter(transactionFilterName, 'type', transactionType);
  }
  filters.applyPreSavedFilters(transactionFilterName);

  navigateTo('/transactions');
};

const goToTransactionsByCategory = (filter: RelationOption) => {
  filters.clearFilters(transactionFilterName, transactionFiltersInit as Filters<unknown>);
  filters.addPreSavedFilter(transactionFilterName, 'categories', [filter]);
  if (months.value) {
    filters.addPreSavedFilter(transactionFilterName, 'created_at_after', calculatePriorDate(months.value));
  }
  filters.applyPreSavedFilters(transactionFilterName);

  navigateTo('/transactions');
};

const calculatePriorDate = (priorMonths: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - priorMonths);
  date.setDate(1);

  return date;
};
</script>
