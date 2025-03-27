type DashboardStatItem = {
  id: number;
  month: string;
  total: number;
  percentage?: number;
  down?: boolean;
  balance?: number;
};

type DashboardStats = {
  data: DashboardStatItem[];
  chart: Chart;
  total: number;
};

type DashboardCategory = {
  id: number;
  title: string;
  total: number;
};
