type Budget = {
  id: number;
  period_on_for_list: string;
  period_on: string;
  total: number;
  deletable: boolean;
};

type BudgetGetResponse = BaseItemResponse<Budget>;
type BudgetListResponse = BaseItemsResponse<Budget>;

type BudgetRow = Row<Budget>;

type BudgetColumn = {
  field: keyof Budget;
} & Column;

type BudgetFilterFields = {
  period_on: { month: number | string; year: number | string } | null;
};
type BudgetFilters = Filters<BudgetFilterFields>;

type BudgetFormFields = {
  period_on: Date | string | null;
};
type BudgetForm = Form<BudgetFormFields>;
