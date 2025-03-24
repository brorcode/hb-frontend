import AppRelationLink from '~/components/AppRelationLink.vue';
import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const budgetItemFilterName = 'budgetItemFilter';
const budgetItemApiUrl = '/api/v1/budget-items';

const budgetItemFiltersInit: BudgetItemFilters = {
  id: { key: 'id', value: null, label: 'ID' },
  amount: { key: 'amount', value: null, label: 'Сумма' },
  categories: { key: 'categories', value: [], label: 'Категории' },
  period_on: { key: 'period_on', value: null, label: 'Дата' },
};

const budgetItemFormInit: BudgetItemForm = {
  amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
  category_id: {
    key: 'category_id',
    value: null,
    relation_key: 'category',
    relation_value: null,
    label: 'Категория',
    errors: [],
  },
  period_on: { key: 'period_on', value: null, label: 'Дата', errors: [] },
};

const budgetItemColumns: BudgetItemColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'period_on_for_list',
    header: 'Дата',
    sortable: false,
  },
  {
    field: 'category',
    header: 'Категория',
    sortable: false,
    body: (row: BudgetItemRow) => {
      return h(AppRelationLink, {
        item: row.category,
        routeName: 'categories-parent-id-mode',
        linkUrl: `/categories/parent/${row.category.id}/view`,
      });
    },
  },
  {
    field: 'amount',
    header: 'Сумма',
    body: (row: BudgetItemRow) => toCurrency(row.amount),
  },
];

export { budgetItemApiUrl, budgetItemFilterName, budgetItemFormInit, budgetItemFiltersInit, budgetItemColumns };
