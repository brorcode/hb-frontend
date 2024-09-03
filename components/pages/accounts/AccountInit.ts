import { formatDate } from '~/utils/date';

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
    label: 'Name',
  },
};

const accountFormInit: AccountForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
};

const accountColumns: AccountColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'createdAt',
    header: 'Created At',
    body: (row: AccountRow) => formatDate(row.createdAt),
  },
  {
    field: 'updatedAt',
    header: 'Updated At',
    body: (row: AccountRow) => formatDate(row.updatedAt),
  },
];

export { accountApiUrl, accountFilterName, accountFormInit, accountFiltersInit, accountColumns };
