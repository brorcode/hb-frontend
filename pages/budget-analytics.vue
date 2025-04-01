<template>
  <div class="space-y-4 md:space-y-6 2xl:space-y-7.5">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <AppCard>
        <h4 class="text-title-md font-bold text-black">
          Бюджет
        </h4>
        <span class="text-sm font-medium">{{ toCurrency(monthlyBudget?.total_budget ?? 0) }}</span>
      </AppCard>

      <AppCard>
        <h4 class="text-title-md mb-2 font-bold text-black">
          Период: {{ monthlyBudget?.period_on }}
        </h4>
        <VueDatePicker
          v-model="periodOn"
          format="dd-MM-yyyy"
          locale="ru-RU"
          select-text="Выбрать"
          cancel-text="Отмена"
          month-picker
          @update:model-value="loadData"
        />
      </AppCard>

      <AppCard>
        <h4 class="text-title-md font-bold text-black">
          Потрачено
        </h4>
        <span class="text-sm font-medium">{{ toCurrency(monthlyBudget?.total_spent ?? 0) }}</span>
      </AppCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <BudgetAnalyticsPlannedTable
        :budget="monthlyBudget?.budget_planned ?? null"
        title="План"
        :period-on="periodOn"
        @show-chart="showChart($event)"
        @show-transactions="goToTransactionsByCategory($event)"
      />

      <BudgetAnalyticsNotPlannedTable
        :budget="monthlyBudget?.budget_not_planned ?? null"
        title="Без плана"
        :period-on="periodOn"
        @show-chart="showChart($event)"
        @show-transactions="goToTransactionsByCategory($event)"
      />
    </div>

    <div
      v-if="chart"
      class="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5"
    >
      <AppCard>
        <ChartLine
          :labels="chart?.labels ?? []"
          :data="chart?.data ?? []"
        />
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import ChartLine from '~/components/charts/ChartLine.vue';
import BudgetAnalyticsNotPlannedTable from '~/components/pages/budget-analytics/BudgetAnalyticsNotPlannedTable.vue';
import BudgetAnalyticsPlannedTable from '~/components/pages/budget-analytics/BudgetAnalyticsPlannedTable.vue';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';
import { useApi } from '~/composables/useApi';
import { useFiltersStore } from '~/stores/filters';
import { transactionType } from '~/utils/constants';
import { subtractMonths } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

const currentDate = new Date();
const periodOn = ref<InputDateYearMonth>({ month: currentDate.getMonth(), year: currentDate.getFullYear() });
const chart = ref<BudgetAnalyticsChart | null>(null);

const { getData } = useApi();
const monthlyBudget = ref<BudgetAnalyticsData>();

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  monthlyBudget.value = await getData('/api/v1/budget-analytics/monthly', 'POST', { period_on: periodOn.value }) as BudgetAnalyticsData;
};

const showChart = async (body: { category_id: number; is_child: boolean }) => {
  chart.value = await getData('/api/v1/budget-analytics/category/chart', 'POST', body) as BudgetAnalyticsChart;
};

const goToTransactionsByCategory = (filter: RelationOption) => {
  filters.clearFilters(transactionFilterName, transactionFiltersInit as Filters<unknown>);
  filters.addPreSavedFilter(transactionFilterName, 'categories', [filter]);
  filters.addPreSavedFilter(transactionFilterName, 'type', { id: transactionType.CREDIT_TYPE_ID, name: 'Расход' });
  filters.addPreSavedFilter(transactionFilterName, 'created_at_after', subtractMonths(12));
  filters.applyPreSavedFilters(transactionFilterName);

  navigateTo('/transactions');
};
</script>
