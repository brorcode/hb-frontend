type CategoryTransactionStats = {
  count: number;
  amount: number;
};

type Category = {
  id: number;
  name: string;
  parent_category: RelationOption | null;
  transactions_debit: CategoryTransactionStats;
  transactions_credit: CategoryTransactionStats;
  transactions_transfer: CategoryTransactionStats;
  created_at: string;
  updated_at: string;
};

type CategoryGetResponse = BaseItemResponse<Category>;
type CategoryListResponse = BaseItemsResponse<Category>;

type CategoryRow = Row<Category>;

type CategoryColumn = {
  field: keyof Category;
} & Column;

type CategoryFilterFileds = {
  id: number | null;
  name: string;
  parent_categories: InputMultiSelect;
};

type CategoryFilters = Filters<CategoryFilterFileds>;

type CategoryFormFields = {
  name: string;
  parent_id: number | null;
  is_child: boolean;
};

type CategoryForm = Form<CategoryFormFields>;
