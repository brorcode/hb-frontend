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
            Реально
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="item in data"
          :key="`not_planned_item__${item.id}`"
        >
          <tr>
            <td class="text-sm font-medium">
              <div
                data-testid="show-transactions-button"
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
