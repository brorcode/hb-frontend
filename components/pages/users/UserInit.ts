import { formatDate } from '~/utils/date';

const userFilterName = 'userFilter';
const userApiUrl = '/api/v1/users';
const userProfileApiUrl = '/api/v1/profile';

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
  password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
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
    body: (row: UserRow) => {
      return row.email;
    },
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: UserRow) => formatDate(row.created_at),
  },
];

export { userApiUrl, userProfileApiUrl, userFilterName, userFormInit, userFiltersInit, userColumns };
