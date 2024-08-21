type Transaction = {
  id: number;
  amount: string;
  createdAt: string;
  updatedAt: string;
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
}>;

type TransactionForm = Form<{
  amount: string;
}>;
