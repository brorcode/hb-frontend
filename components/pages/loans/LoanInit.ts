import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/money';

const loanFilterName = 'loanFilter';
const loanApiUrl = '/api/v1/loans';

const loanFiltersInit: LoanFilters = {
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
};

const loanFormInit: LoanForm = {
  name: { key: 'name', value: '', label: 'Название', errors: [] },
  type_id: {
    key: 'type_id',
    value: null,
    relation_key: 'type',
    relation_value: null,
    label: 'Тип',
    errors: [],
  },
  amount: { key: 'amount', value: null, label: 'Сумма', errors: [] },
  deadline_on: { key: 'deadline_on', value: null, label: 'Дата Возврата', errors: [] },
};

const loanColumns: LoanColumn[] = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Название',
  },
  {
    field: 'type',
    header: 'Тип',
    body: (row: LoanRow) => row.type.name,
  },
  {
    field: 'amount',
    header: 'Сумма',
    body: (row: LoanRow) => toCurrency(row.amount),
  },
  {
    field: 'amount_left',
    header: 'Остаток',
    body: (row: LoanRow) => toCurrency(row.amount_left),
  },
  {
    field: 'created_at',
    header: 'Дата Долга',
    body: (row: LoanRow) => formatDate(row.created_at),
  },
  {
    field: 'deadline_on',
    header: 'Дата Возврата',
    body: (row: LoanRow) => formatDate(row.deadline_on),
  },
];

export { loanApiUrl, loanFilterName, loanFormInit, loanFiltersInit, loanColumns };
