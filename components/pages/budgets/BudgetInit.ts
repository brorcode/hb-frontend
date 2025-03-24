import { toCurrency } from '~/utils/money';

const budgetFilterName = 'budgetFilter';
const budgetApiUrl = '/api/v1/budgets';

const budgetFiltersInit: BudgetFilters = {
  period_on: { key: 'period_on', value: null, label: 'Дата' },
};

const budgetFormInit: BudgetForm = {
  period_on: { key: 'period_on', value: null, label: 'Дата', errors: [] },
};

const budgetColumns: BudgetColumn[] = [
  {
    field: 'id',
    header: 'ID',
    sortable: false,
  },
  {
    field: 'period_on_for_list',
    header: 'Дата',
    sortable: false,
  },
  {
    field: 'total',
    header: 'Сумма',
    sortable: false,
    body: (row: BudgetRow) => toCurrency(row.total),
  },
];

export { budgetApiUrl, budgetFilterName, budgetFormInit, budgetFiltersInit, budgetColumns };
