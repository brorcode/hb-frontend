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
import { useApi } from '~/composables/useApi';
import { toCurrency } from '~/utils/money';

const currentDate = new Date();
const periodOn = ref<InputDateYearMonth>({ month: currentDate.getMonth(), year: currentDate.getFullYear() });

const { getData } = useApi();
const monthlyBudget = ref<BudgetAnalytics | null>(null);

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  monthlyBudget.value = await getData('/api/v1/budget-analytics/monthly', 'POST', { period_on: periodOn.value }) as BudgetAnalytics;
};
</script>
