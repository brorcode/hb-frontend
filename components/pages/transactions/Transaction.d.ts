type Transaction = {
  id: number;
  amount: string;
  is_debit: boolean;
  is_transfer: boolean;
  category: RelationOption;
  account: RelationOption;
  created_at: string;
  updated_at: string;
};

type TransactionGetResponse = BaseItemResponse<Transaction>;
type TransactionListResponse = BaseItemsResponse<Transaction>;

type TransactionRow = Row<Transaction>;

type TransactionColumn = {
  field: keyof Transaction;
} & Column;

type TransactionFilters = Filters<{
  id: number | null;
  amount: number | null;
  categories: MultiSelect;
  accounts: MultiSelect;
  created_at_after: Date | null;
  created_at_before: Date | null;
}>;

type TransactionForm = Form<{
  amount: number | null;
  category_id: number | null;
  account_id: number | null;
  created_at: Date | null;
  is_debit: boolean;
  is_transfer: boolean;
  account_to: number | null;
}>;
