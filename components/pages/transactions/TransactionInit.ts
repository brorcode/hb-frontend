import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

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
    label: 'Сумма',
  },
  categories: {
    key: 'categories',
    value: [],
    label: 'Категории',
  },
  accounts: {
    key: 'accounts',
    value: [],
    label: 'Аккаунты',
  },
  tags: {
    key: 'tags',
    value: [],
    label: 'Теги',
  },
  created_at_after: {
    key: 'created_at_after',
    value: null,
    label: 'Дата после',
  },
  created_at_before: {
    key: 'created_at_before',
    value: null,
    label: 'Дата до',
  },
};

const transactionFormInit: TransactionForm = {
  amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
  category_id: {
    key: 'category_id',
    value: null,
    relation_key: 'category',
    relation_value: null,
    label: 'Категория',
    errors: [],
  },
  account_id: {
    key: 'account_id',
    value: null,
    relation_key: 'account',
    relation_value: null,
    label: 'Аккаунт',
    errors: [],
  },
  created_at: { key: 'created_at', value: null, label: 'Дата', errors: [] },
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
    header: 'Сумма',
    body: (row: TransactionRow) => toCurrency(row.amount),
  },
  {
    field: 'category',
    header: 'Категория',
    sortable: false,
    body: (row: TransactionRow) => row.category.name,
  },
  {
    field: 'account',
    header: 'Аккаунт',
    sortable: false,
    body: (row: TransactionRow) => row.account.name,
  },
  {
    field: 'tags',
    header: 'Теги',
    sortable: false,
    body: (row: TransactionRow) => row.tags.join(', '),
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: TransactionRow) => formatDate(row.created_at),
  },
];

export {
  transactionApiUrl,
  transactionFilterName,
  transactionFormInit,
  transactionFiltersInit,
  transactionColumns,
};
