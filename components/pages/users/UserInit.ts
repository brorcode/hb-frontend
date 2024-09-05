import { formatDate } from '~/utils/date';

const userFilterName = 'userFilter';
const userApiUrl = '/api/v1/users';

const userFiltersInit: UserFilters = {
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

const userFormInit: UserForm = {
  name: { key: 'name', value: '', label: 'Name', errors: [] },
  email: { key: 'email', value: '', label: 'Email', errors: [] },
  password: { key: 'password', value: '', label: 'Password', errors: [] },
};

const userColumns: UserColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'email',
    header: 'Email',
  },
  {
    field: 'created_at',
    header: 'Created At',
    body: (row: UserRow) => formatDate(row.created_at),
  },
  {
    field: 'updated_at',
    header: 'Updated At',
    body: (row: UserRow) => formatDate(row.updated_at),
  },
];

export { userApiUrl, userFilterName, userFormInit, userFiltersInit, userColumns };
