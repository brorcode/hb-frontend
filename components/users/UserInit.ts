import { formatDate } from '~/utils/date';

const userFilterName = 'userFilter';

const userFiltersInit: UserFilters = {
  id: {
    key: 'id',
    value: '',
    label: 'ID'
  },
  name: {
    key: 'name',
    value: '',
    label: 'Name'
  }
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

export { userFilterName, userFiltersInit, userColumns };
