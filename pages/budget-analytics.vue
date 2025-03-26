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
        :data="monthlyBudget?.budget_planned ?? []"
        title="План"
        :period-on="periodOn"
      />

      <BudgetAnalyticsNotPlannedTable
        :data="monthlyBudget?.budget_not_planned ?? []"
        title="Без плана"
        :period-on="periodOn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import BudgetAnalyticsNotPlannedTable from '~/components/pages/budget-analytics/BudgetAnalyticsNotPlannedTable.vue';
import BudgetAnalyticsPlannedTable from '~/components/pages/budget-analytics/BudgetAnalyticsPlannedTable.vue';
import { transactionFilterName, transactionFiltersInit } from '~/components/pages/transactions/TransactionInit';
import { useApi } from '~/composables/useApi';
import { useFiltersStore } from '~/stores/filters';
import { toCurrency } from '~/utils/money';

const months = ref<number>(12);
const currentDate = new Date();
// const month = ref<InputDateYearMonth>({ month: currentDate.getMonth(), year: currentDate.getFullYear() });
const periodOn = ref<InputDateYearMonth>({ month: 9, year: 2024 });

const { getData } = useApi();
const monthlyBudget = ref<BudgetAnalytics | null>(null);
const filters = useFiltersStore();
filters.initFilters(transactionFilterName, transactionFiltersInit);

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  monthlyBudget.value = await getData('/api/v1/budget-analytics/monthly', 'POST', { period_on: periodOn.value }) as BudgetAnalytics;
};

const goToTransactions = (date: string, transactionType: RelationOption | null) => {
  const [yearStr, monthStr] = date.split(' ');
  const year = parseInt(yearStr, 10);
  const month = monthMap[monthStr.toLowerCase()];

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

const showChildCategories = (filter: RelationOption, transactionType: RelationOption) => {
  filters.clearFilters(transactionFilterName, transactionFiltersInit as Filters<unknown>);
  filters.addPreSavedFilter(transactionFilterName, 'categories', [filter]);
  filters.addPreSavedFilter(transactionFilterName, 'type', transactionType);
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
