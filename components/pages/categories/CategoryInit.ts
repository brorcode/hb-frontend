import { formatDate } from '~/utils/date';

const categoryFilterName = 'categoryFilter';
const categoryApiUrl = '/api/v1/categories';

const categoryFiltersInit: CategoryFilters = {
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

const categoryFormInit: CategoryForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
};

const categoryColumns: CategoryColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Название',
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: CategoryRow) => formatDate(row.created_at),
  },
];

export {
  categoryApiUrl,
  categoryFilterName,
  categoryFormInit,
  categoryFiltersInit,
  categoryColumns,
};
