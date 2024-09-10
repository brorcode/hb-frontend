import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const accountFilterName = 'accountFilter';
const accountApiUrl = '/api/v1/accounts';

const accountFiltersInit: AccountFilters = {
  id: {
    key: 'id',
    value: null,
    label: 'ID',
  },
  name: {
    key: 'name',
    value: '',
    label: 'Название',
  },
};

const accountFormInit: AccountForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
};

const accountColumns: AccountColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Название',
  },
  {
    field: 'amount',
    header: 'Баланс',
    body: (row: AccountRow) => toCurrency(row.amount),
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: AccountRow) => formatDate(row.created_at),
  },
];

export { accountApiUrl, accountFilterName, accountFormInit, accountFiltersInit, accountColumns };
