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
    label: 'Имя',
  },
};

const userFormInit: UserForm = {
  name: { key: 'name', value: '', label: 'Имя', errors: [] },
  email: { key: 'email', value: '', label: 'Email', errors: [] },
  password: { key: 'password', value: '', label: 'Пароль', errors: [] },
};

const userColumns: UserColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Имя',
  },
  {
    field: 'email',
    header: 'Email',
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: UserRow) => formatDate(row.created_at),
  },
];

export { userApiUrl, userFilterName, userFormInit, userFiltersInit, userColumns };
