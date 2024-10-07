type Loan = {
  id: number;
  name: string;
  type: RelationOption;
  amount: number;
  amount_left: number;
  deadline_on: string;
  created_at: string;
  updated_at: string;
};

type LoanGetResponse = BaseItemResponse<Loan>;
type LoanListResponse = BaseItemsResponse<Loan>;

type LoanRow = Row<Loan>;

type LoanColumn = {
  field: keyof Loan;
} & Column;

type LoanFilterFields = {
  id: number | null;
  name: string;
};
type LoanFilters = Filters<LoanFilterFields>;

type LoanFormFields = {
  name: string;
  type_id: number | null;
  amount: number | null;
  deadline_on: Date | string | null;
};
type LoanForm = Form<LoanFormFields>;
