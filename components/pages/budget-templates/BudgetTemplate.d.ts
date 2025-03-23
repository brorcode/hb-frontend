type BudgetTemplate = {
  id: number;
  category: RelationOption;
  amount: number;
  created_at: string;
  updated_at: string;
};

type BudgetTemplateGetResponse = BaseItemResponse<BudgetTemplate>;
type BudgetTemplateListResponse = BaseItemsResponse<BudgetTemplate>;

type BudgetTemplateRow = Row<BudgetTemplate>;

type BudgetTemplateColumn = {
  field: keyof BudgetTemplate;
} & Column;

type BudgetTemplateFilterFields = {
  id: number | null;
  amount: number | null;
  categories: MultiSelect;
};
type BudgetTemplateFilters = Filters<BudgetTemplateFilterFields>;

type BudgetTemplateFormFields = {
  amount: number | null;
  category_id: number | null;
};
type BudgetTemplateForm = Form<BudgetTemplateFormFields>;
