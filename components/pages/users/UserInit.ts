import { formatDate } from '~/utils/date';

const userFilterName = 'userFilter';
const userApiUrl = '/api/v1/users';

const userFiltersInit: UserFilters = {
  id: {
    key: 'id',
    value: null,
    label: 'ID'
  },
  name: {
    key: 'name',
    value: null,
    label: 'Name'
  }
};

const userFormInit: UserForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
  email: { key: 'email', value: '', label: 'Email', errors: [] }
};

const userColumns: UserColumn[] = [
  {
    field: 'id',
    header: 'ID'
  },
  {
    field: 'name',
    header: 'Name'
  },
  {
    field: 'email',
    header: 'Email'
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

export { userApiUrl, userFilterName, userFormInit, userFiltersInit, userColumns };
