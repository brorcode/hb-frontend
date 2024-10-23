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
    label: 'Название',
  },
};

const tagFormInit: TagForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
};

const tagColumns: TagColumn[] = [
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
    header: 'Сумма',
    sortable: false,
    body: (row: TagRow) => toCurrency(row.amount),
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: TagRow) => formatDate(row.created_at),
  },
];

export { tagApiUrl, tagFilterName, tagFormInit, tagFiltersInit, tagColumns };
