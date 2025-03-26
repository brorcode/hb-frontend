type BudgetItem = {
  id: number;
  category: RelationOption;
  amount: number;
  period_on_for_list: string;
};

type BudgetItemGetResponse = BaseItemResponse<BudgetItem>;
type BudgetItemListResponse = BaseItemsResponse<BudgetItem>;

type BudgetItemRow = Row<BudgetItem>;

type BudgetItemColumn = {
  field: keyof BudgetItem;
} & Column;

type BudgetItemFilterFields = {
  id: number | null;
  amount: number | null;
  categories: MultiSelect;
  period_on: InputDateYearMonth | null;
};
type BudgetItemFilters = Filters<BudgetItemFilterFields>;

type BudgetItemFormFields = {
  amount: number | null;
  category_id: number | null;
  period_on: number | null;
};
type BudgetItemForm = Form<BudgetItemFormFields>;
