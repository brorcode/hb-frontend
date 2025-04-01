type BudgetAnalyticsItem = {
  id: number;
  name: string;
  budget_amount: number;
  total_spent: number;
  difference: number;
  execution_rate: number;
};

type BudgetAnalytics = {
  data: BudgetAnalyticsItem[];
  total_spent: number;
  total_budget: number | null;
  difference: number | null;
  execution_rate: number | null;
};

type BudgetAnalyticsData = {
  period_on: string;
  total_budget: number;
  total_spent: number;
  budget_planned: BudgetAnalytics;
  budget_not_planned: BudgetAnalytics;
};

type BudgetAnalyticsChildItem = {
  id: number;
  name: string;
  total_spent: number;
};

type BudgetAnalyticsChart = {
  labels: string[];
  data: ChartData[];
};
