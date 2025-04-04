<template>
  <AppCard>
    <h4
      v-if="budget?.data?.length === 0"
      class="text-title-md mb-1 font-bold text-black"
    >
      {{ title }}
    </h4>

    <div
      v-if="budget?.data?.length === 0"
      class="text-sm font-medium"
    >
      Нет данных за выбранный период
    </div>

    <table
      v-else
      class="w-full"
    >
      <thead>
        <tr>
          <th class="text-left text-title-md font-bold pb-1">
            {{ title }}
          </th>
          <th class="text-right text-sm font-medium pb-1">
            <div
              v-if="budget?.execution_rate && budget?.execution_rate !== 0"
              :class="[
                budget?.execution_rate > 100 ? 'text-red-600' : 'text-green-600',
                'flex items-center justify-end gap-1 text-sm font-medium text-meta-3',
              ]"
            >
              {{ budget?.execution_rate }}%
            </div>
          </th>
          <th class="text-right text-sm font-medium pb-1">
            {{ toCurrency(budget?.total_budget ?? 0) }}
          </th>
          <th class="text-right text-sm font-medium pb-1">
            {{ toCurrency(budget?.total_spent ?? 0) }}
          </th>
        </tr>
        <tr>
          <th class="text-left text-sm">
            Название
          </th>
          <th class="text-right text-sm">
            Исполнение
          </th>
          <th class="text-right text-sm">
            Запланировано
          </th>
          <th class="text-right text-sm">
            Реально
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="item in budget?.data"
          :key="`planned_item_${item.id}`"
        >
          <tr>
            <td class="text-sm font-medium">
              <div
                class="flex space-x-1 items-center cursor-pointer"
                @click="toggleExpand(item.id)"
              >
                <span class="hover:underline">{{ item.name }}</span>
                <ChevronDownIcon
                  v-if="expandedRows[item.id]"
                  class="h-4 w-4 text-indigo-600"
                />
                <ChevronRightIcon
                  v-else
                  class="h-4 w-4 text-indigo-600"
                />
              </div>
            </td>
            <td class="text-right">
              <div
                v-if="item.execution_rate && item.execution_rate !== 0"
                :class="[
                  item.execution_rate > 100 ? 'text-red-600' : 'text-green-600',
                  'flex items-center justify-end gap-1 text-sm font-medium text-meta-3',
                ]"
              >
                {{ item.execution_rate }}%
              </div>
            </td>
            <td class="text-right text-sm font-medium text-meta-3">
              {{ toCurrency(item.budget_amount) }}
            </td>
            <td class="text-right text-sm font-medium text-meta-3">
              <div
                class="flex space-x-1 items-center cursor-pointer justify-end"
                @click="$emit('showChart', { category_id: item.id, is_child: false })"
              >
                <span class="hover:underline">{{ toCurrency(item.total_spent) }}</span>
                <ChartBarIcon
                  class="h-4 w-4 text-indigo-600"
                />
              </div>
            </td>
          </tr>

          <BudgetAnalyticsChildCategories
            v-if="expandedRows[item.id]"
            :item-id="item.id"
            :loading="loadingStates[item.id]"
            :child-data="childData[item.id] || []"
            @show-chart="$emit('showChart', $event)"
            @show-transactions="$emit('showTransactions', $event)"
          />
        </template>
      </tbody>
    </table>
  </AppCard>
</template>

<script setup lang="ts">
import { ChartBarIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import BudgetAnalyticsChildCategories from '~/components/pages/budget-analytics/BudgetAnalyticsChildCategories.vue';
import {
  useBudgetAnalyticsLoadChildCategories,
} from '~/components/pages/budget-analytics/useBudgetAnalyticsLoadChildCategories';
import { toCurrency } from '~/utils/money';

const props = defineProps<{
  budget: BudgetAnalytics | null;
  title: string;
  periodOn: InputDateYearMonth;
}>();

defineEmits(['showChart', 'showTransactions']);

const { expandedRows, childData, loadingStates, toggleExpand } = useBudgetAnalyticsLoadChildCategories(toRef(props, 'periodOn'));
</script>
