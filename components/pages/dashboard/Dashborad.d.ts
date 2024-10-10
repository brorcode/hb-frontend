type Chart = {
  labels: string[];
  data: number[];
};

type ChartData = {
  name: string;
  color: string;
  data: number[];
};

type DashboardStatItem = {
  id: number;
  month: string;
  total: number;
  percentage: number;
  down: boolean;
  balance?: number;
};

type DashboardStats = {
  data: DashboardStatItem[];
  chart: Chart;
};
