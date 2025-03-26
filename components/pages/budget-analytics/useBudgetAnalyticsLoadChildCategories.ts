import { reactive, ref } from 'vue';
import { useApi } from '~/composables/useApi';

export const useBudgetAnalyticsLoadChildCategories = (periodOn: InputDateYearMonth) => {
  const { getData } = useApi();

  const expandedRows = ref<Record<number, boolean>>({});
  const childData = ref<Record<number, BudgetAnalyticsChildItem[]>>({});
  const loadingStates = reactive<Record<number, boolean>>({});

  const toggleExpand = async (id: number) => {
    // Toggle expanded state
    expandedRows.value[id] = !expandedRows.value[id];

    // If expanding and no data loaded yet, fetch child data
    if (expandedRows.value[id] && !childData.value[id]) {
      loadingStates[id] = true;

      try {
        const response = await getData('/api/v1/budget-analytics/monthly/categories/child', 'POST', {
          period_on: periodOn,
          parent_category_id: id,
        });

        childData.value[id] = response as BudgetAnalyticsChildItem[];
      }
      catch (error) {
        childData.value[id] = [];
      }
      finally {
        loadingStates[id] = false;
      }
    }
  };

  return {
    expandedRows,
    childData,
    loadingStates,
    toggleExpand,
  };
};
