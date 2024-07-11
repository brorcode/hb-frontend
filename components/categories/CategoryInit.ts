import { formatDate } from '~/utils/date';

const config = useRuntimeConfig();

const categoryFilterName = 'categoryFilter';
const categoryApiUrl = `${config.public.apiUrl}/categories`;

const categoryFiltersInit: CategoryFilters = {
  id: {
    key: 'id',
    value: null,
    label: 'ID'
  },
  name: {
    key: 'name',
    value: null,
    label: 'Name'
  },
  description: {
    key: 'description',
    value: null,
    label: 'Description'
  }
};

const categoryFormInit: CategoryForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
  description: { key: 'description', value: '', label: 'Description', errors: [] }
};

const categoryColumns: CategoryColumn[] = [
  {
    field: 'id',
    header: 'ID'
  },
  {
    field: 'name',
    header: 'Name'
  },
  {
    field: 'description',
    header: 'Description'
  },
  {
    field: 'createdAt',
    header: 'Created At',
    body: (row: UserRow) => formatDate(row.createdAt)
  },
  {
    field: 'updatedAt',
    header: 'Updated At',
    body: (row: UserRow) => formatDate(row.updatedAt)
  }
];

export {
  categoryApiUrl,
  categoryFilterName,
  categoryFormInit,
  categoryFiltersInit,
  categoryColumns
};
