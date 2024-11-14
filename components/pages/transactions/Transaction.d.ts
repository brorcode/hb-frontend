type Transaction = {
  id: number;
  amount: number;
  is_debit: boolean;
  is_transfer: boolean;
  category: RelationOption;
  account: RelationOption;
  tags: RelationOption[];
  created_at: string;
  updated_at: string;
};

type TransactionGetResponse = BaseItemResponse<Transaction>;
type TransactionListResponse = BaseItemsResponse<Transaction>;

type TransactionRow = Row<Transaction>;

type TransactionColumn = {
  field: keyof Transaction;
} & Column;

type TransactionFilterFields = {
  id: number | null;
  amount: number | null;
  type: RelationOption | null;
  categories: MultiSelect;
  accounts: MultiSelect;
  loans: MultiSelect;
  tags: MultiSelect;
  created_at_after: Date | null;
  created_at_before: Date | null;
};

type TransactionFilters = Filters<TransactionFilterFields>;

type TransactionFormFields = {
  amount: number | null;
  category_id: number | null;
  account_id: number | null;
  loan_id: number | null;
  created_at: Date | string | null;
  is_debit: boolean;
  is_transfer: boolean;
  account_to: number | null;
};

type TransactionForm = Form<TransactionFormFields>;
