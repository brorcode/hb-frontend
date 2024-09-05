import { formatDate } from '~/utils/date';

const transactionFilterName = 'transactionFilter';
const transactionApiUrl = '/api/v1/transactions';

const transactionFiltersInit: TransactionFilters = {
  id: {
    key: 'id',
    value: null,
    label: 'ID',
  },
  amount: {
    key: 'amount',
    value: null,
    label: 'Amount',
  },
  categories: {
    key: 'categories',
    value: [],
    label: 'Categories',
  },
  accounts: {
    key: 'accounts',
    value: [],
    label: 'Accounts',
  },
  created_at_after: {
    key: 'created_at_after',
    value: null,
    label: 'Date After',
  },
  created_at_before: {
    key: 'created_at_before',
    value: null,
    label: 'Date Before',
  },
};

const transactionFormInit: TransactionForm = {
  amount: { key: 'amount', value: null, label: 'Amount', errors: [] },
  category_id: {
    key: 'category_id',
    value: null,
    relation_key: 'category',
    relation_value: null,
    label: 'Category',
    errors: [],
  },
  account_id: {
    key: 'account_id',
    value: null,
    relation_key: 'account',
    relation_value: null,
    label: 'Account',
    errors: [],
  },
  created_at: { key: 'created_at', value: null, label: 'Date', errors: [] },
  is_debit: { key: 'is_debit', value: true, label: 'Расход?', errors: [] },
  is_transfer: { key: 'is_transfer', value: false, label: 'Перевод?', errors: [] },
  account_to: {
    key: 'account_to',
    value: null,
    relation_key: 'account',
    relation_value: null,
    label: 'Account To',
    errors: [],
  },
};

const transactionColumns: TransactionColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'amount',
    header: 'Amount',
    body: (row: TransactionRow) => {
      let amount = Number(row.amount);
      amount = row.is_debit ? amount * -1 : amount;

      return `${amount} ₽`;
    },
  },
  {
    field: 'category',
    header: 'Category',
    sortable: false,
    body: (row: TransactionRow) => row.category.name,
  },
  {
    field: 'account',
    header: 'Account',
    sortable: false,
    body: (row: TransactionRow) => row.account.name,
  },
  {
    field: 'created_at',
    header: 'Created At',
    body: (row: TransactionRow) => formatDate(row.created_at),
  },
  {
    field: 'updated_at',
    header: 'Updated At',
    body: (row: TransactionRow) => formatDate(row.updated_at),
  },
];

export {
  transactionApiUrl,
  transactionFilterName,
  transactionFormInit,
  transactionFiltersInit,
  transactionColumns,
};
