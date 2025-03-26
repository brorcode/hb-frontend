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

    <table
      v-else
      class="w-full"
    >
      <thead>
        <tr>
          <th class="text-left text-sm font-bold">
            Название
          </th>
          <th class="text-right text-sm font-bold text-meta-3">
            Исполнение
          </th>
          <th class="text-right text-sm font-bold text-meta-3">
            Запланировано
          </th>
          <th class="text-right text-sm font-bold text-meta-3">
            Реально
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="item in data"
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
              {{ toCurrency(item.total_spent) }}
            </td>
          </tr>

          <BudgetAnalyticsChildCategories
            v-if="expandedRows[item.id]"
            :item-id="item.id"
            :loading="loadingStates[item.id]"
            :child-data="childData[item.id] || []"
          />
        </template>
      </tbody>
    </table>
  </AppCard>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import BudgetAnalyticsChildCategories from '~/components/pages/budget-analytics/BudgetAnalyticsChildCategories.vue';
import { useBudgetAnalyticsLoadChildCategories } from '~/components/pages/budget-analytics/useBudgetAnalyticsLoadChildCategories';
import { toCurrency } from '~/utils/money';

const props = defineProps<{
  data: BudgetAnalyticsItem[] | null;
  title: string;
  periodOn: InputDateYearMonth;
}>();

const { expandedRows, childData, loadingStates, toggleExpand } = useBudgetAnalyticsLoadChildCategories(props.periodOn);
</script>
