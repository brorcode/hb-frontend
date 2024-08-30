type Transaction = {
  id: number;
  amount: string;
  category: RelationOption;
  account: RelationOption;
  created_at: string;
  updated_at: string;
};

type TransactionGetResponse = BaseItemResponse<Transaction>;
type TransactionListResponse = BaseItemsResponse<Transaction>;

type TransactionRow = {
  field: keyof Transaction;
} & Row;

type TransactionColumn = {
  field: keyof Transaction;
} & Column;

type TransactionFilters = Filters<{
  id: number;
  amount: string;
  categories: MultiSelect;
  accounts: MultiSelect;
  created_at_after: Date;
  created_at_before: Date;
}>;

type TransactionForm = Form<{
  amount: string;
  category_id: number;
  account_id: number;
  created_at: Date;
  is_debit: boolean;
  is_transfer: boolean;
  account_to: number;
}>;
