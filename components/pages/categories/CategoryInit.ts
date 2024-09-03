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
    label: 'Name',
  },
};

const categoryFormInit: CategoryForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
};

const categoryColumns: CategoryColumn[] = [
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
    body: (row: CategoryRow) => formatDate(row.createdAt),
  },
  {
    field: 'updatedAt',
    header: 'Updated At',
    body: (row: CategoryRow) => formatDate(row.updatedAt),
  },
];

export {
  categoryApiUrl,
  categoryFilterName,
  categoryFormInit,
  categoryFiltersInit,
  categoryColumns,
};
