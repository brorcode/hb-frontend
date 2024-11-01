import AppRelationLink from '~/components/AppRelationLink.vue';
import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const categoryParentFilterName = 'categoryParentFilter';
const categoryChildFilterName = 'categoryChildFilter';
const categoryApiUrl = '/api/v1/categories';
const categoryParentApiUrl = '/api/v1/categories/parent';
const categoryChildApiUrl = '/api/v1/categories/child';

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
  parent_categories: {
    key: 'parent_categories',
    value: [],
    label: 'Родительские Категории',
  },
};

const categoryFormInit: CategoryForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
  parent_id: {
    key: 'parent_id',
    value: null,
    relation_key: 'parent_category',
    relation_value: null,
    label: 'Родительская Категория',
    errors: [],
  },
  is_child: { key: 'is_child', value: false, label: '', errors: [] },
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
    field: 'parent_category',
    header: 'Родительская Категория',
    sortable: false,
    body: (row: CategoryRow) => {
      if (!row.parent_category) {
        return '';
      }

      return h(AppRelationLink, {
        item: row.parent_category,
        routeName: 'categories-parent-id-mode',
        linkUrl: `/categories/parent/${row.parent_category.id}/view`,
      });
    },
  },
  // {
  //   field: 'transactions_credit',
  //   header: 'Количество расходов',
  //   sortable: false,
  //   body: (row: CategoryRow) => row.transactions_credit?.count ?? 0,
  // },
  {
    field: 'transactions_credit',
    header: 'Сумма Расходов',
    sortable: false,
    body: (row: CategoryRow) => toCurrency(row.transactions_credit?.amount ?? 0),
  },
  // {
  //   field: 'transactions_debit',
  //   header: 'Количество Доходов',
  //   sortable: false,
  //   body: (row: CategoryRow) => row.transactions_debit?.count ?? 0,
  // },
  {
    field: 'transactions_debit',
    header: 'Сумма Доходов',
    sortable: false,
    body: (row: CategoryRow) => toCurrency(row.transactions_debit?.amount ?? 0),
  },
  // {
  //   field: 'transactions_transfer',
  //   header: 'Количество Переводов',
  //   sortable: false,
  //   body: (row: CategoryRow) => row.transactions_transfer?.count ?? 0,
  // },
  {
    field: 'transactions_transfer',
    header: 'Сумма Переводов',
    sortable: false,
    body: (row: CategoryRow) => toCurrency(row.transactions_transfer?.amount ?? 0),
  },
  {
    field: 'created_at',
    header: 'Дата',
    body: (row: CategoryRow) => formatDate(row.created_at),
  },
];

export { categoryApiUrl, categoryChildApiUrl, categoryChildFilterName, categoryColumns, categoryFiltersInit, categoryFormInit, categoryParentApiUrl, categoryParentFilterName };
