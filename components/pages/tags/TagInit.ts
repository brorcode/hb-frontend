import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const tagFilterName = 'tagFilter';
const tagApiUrl = '/api/v1/tags';

const tagFiltersInit: TagFilters = {
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

const tagFormInit: TagForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
};

const tagColumns: TagColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'amount',
    header: 'Amount',
    body: (row: TagRow) => toCurrency(row.amount),
  },
  {
    field: 'created_at',
    header: 'Created At',
    body: (row: TagRow) => formatDate(row.created_at),
  },
  {
    field: 'updated_at',
    header: 'Updated At',
    body: (row: TagRow) => formatDate(row.updated_at),
  },
];

export { tagApiUrl, tagFilterName, tagFormInit, tagFiltersInit, tagColumns };
