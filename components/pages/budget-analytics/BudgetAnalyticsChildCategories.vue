<template>
  <tr>
    <td
      colspan="4"
      class="py-2"
    >
      <div
        v-if="loading"
        class="text-sm font-medium pl-6"
      >
        Загрузка...
      </div>
      <div
        v-else-if="childData.length === 0"
        class="text-sm font-medium pl-6"
      >
        Нет данных
      </div>
      <div
        v-else
        :key="`child-data-${itemId}`"
        class="pl-6 border-l-2 border-indigo-100 ml-2"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left text-xs font-bold">
                Название
              </th>
              <th class="text-right text-xs font-bold text-meta-3">
                Сумма
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="childItem in childData"
              :key="`child_item_${childItem.id}`"
            >
              <td class="text-xs font-medium">
                {{ childItem.name }}
              </td>
              <td class="text-right text-xs font-medium text-meta-3">
                {{ toCurrency(childItem.total_spent) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { toCurrency } from '~/utils/money';

defineProps<{
  itemId: number;
  loading: boolean;
  childData: BudgetAnalyticsChildItem[];
}>();
</script>
