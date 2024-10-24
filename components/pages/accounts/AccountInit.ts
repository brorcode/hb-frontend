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
  is_archived: {
    key: 'is_archived',
    value: null,
    label: 'Показать архивные?',
  },
};

const accountFormInit: AccountForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
  is_archived: { key: 'is_archived', value: false, label: 'Архивный?', errors: [] },
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
    sortable: false,
    body: (row: AccountRow) => toCurrency(row.amount),
  },
  {
    field: 'is_archived',
    header: 'Архивный',
    body: (row: AccountRow) => row.is_archived ? 'Да' : 'Нет',
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: AccountRow) => formatDate(row.created_at),
  },
];

export { accountApiUrl, accountFilterName, accountFormInit, accountFiltersInit, accountColumns };
