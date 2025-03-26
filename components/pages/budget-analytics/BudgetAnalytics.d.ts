type BudgetAnalyticsItem = {
  id: number;
  name: string;
  budget_amount: number;
  total_spent: number;
  difference: number;
  execution_rate: number;
};

type BudgetAnalytics = {
  period_on: string;
  total_budget: number;
  total_spent: number;
  budget_planned: BudgetAnalyticsItem[];
  budget_not_planned: BudgetAnalyticsItem[];
};

type BudgetAnalyticsChildItem = {
  id: number;
  name: string;
  total_spent: number;
};
