type Budget = {
  id: number;
  period_on_for_list: string;
  period_on: string;
  total: number;
};

type BudgetGetResponse = BaseItemResponse<Budget>;
type BudgetListResponse = BaseItemsResponse<Budget>;

type BudgetRow = Row<Budget>;

type BudgetColumn = {
  field: keyof Budget;
} & Column;

type BudgetFilterFields = {
  period_on: InputDateYearMonth | null;
};
type BudgetFilters = Filters<BudgetFilterFields>;

type BudgetFormFields = {
  period_on: Date | string | null;
};
type BudgetForm = Form<BudgetFormFields>;
