import AppRelationLink from '~/components/AppRelationLink.vue';
import { toCurrency } from '~/utils/money';

const budgetTemplateFilterName = 'budgetTemplateFilter';
const budgetTemplateApiUrl = '/api/v1/budget-templates';

const budgetTemplateFiltersInit: BudgetTemplateFilters = {
  id: { key: 'id', value: null, label: 'ID' },
  amount: { key: 'amount', value: null, label: 'Сумма' },
  categories: { key: 'categories', value: [], label: 'Категории' },
};

const budgetTemplateFormInit: BudgetTemplateForm = {
  amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
  category_id: {
    key: 'category_id',
    value: null,
    relation_key: 'category',
    relation_value: null,
    label: 'Категория',
    errors: [],
  },
};

const budgetTemplateColumns: BudgetTemplateColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'category',
    header: 'Категория',
    sortable: false,
    body: (row: BudgetTemplateRow) => {
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
    body: (row: BudgetTemplateRow) => toCurrency(row.amount),
  },
];

export { budgetTemplateApiUrl, budgetTemplateFilterName, budgetTemplateFormInit, budgetTemplateFiltersInit, budgetTemplateColumns };
