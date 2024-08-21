import { formatDate } from '~/utils/date';

const transactionFilterName = 'transactionFilter';
const transactionApiUrl = '/api/v1/transactions';

const transactionFiltersInit: TransactionFilters = {
  id: {
    key: 'id',
    value: null,
    label: 'ID'
  },
  amount: {
    key: 'amount',
    value: null,
    label: 'amount'
  }
};

const transactionFormInit: TransactionForm = {
  amount: { key: 'amount', value: '', label: 'Amount', errors: [] }
};

const transactionColumns: TransactionColumn[] = [
  {
    field: 'id',
    header: 'ID'
  },
  {
    field: 'amount',
    header: 'Amount'
  },
  {
    field: 'createdAt',
    header: 'Created At',
    body: (row: TransactionRow) => formatDate(row.createdAt)
  },
  {
    field: 'updatedAt',
    header: 'Updated At',
    body: (row: TransactionRow) => formatDate(row.updatedAt)
  }
];

export {
  transactionApiUrl,
  transactionFilterName,
  transactionFormInit,
  transactionFiltersInit,
  transactionColumns
};
