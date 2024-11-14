type Account = {
  id: number;
  name: string;
  is_archived: boolean;
  amount: number;
  created_at: string;
  updated_at: string;
};

type AccountGetResponse = BaseItemResponse<Account>;
type AccountListResponse = BaseItemsResponse<Account>;

// type AccountRow = {
//   field: keyof Account;
// } & Row;

type AccountRow = Row<Account>;

type AccountColumn = {
  field: keyof Account;
} & Column;

type AccountFilterFields = {
  id: number | null;
  name: string;
  show_archived: true | null;
};
type AccountFilters = Filters<AccountFilterFields>;

type AccountFormFields = {
  name: string;
  is_archived: boolean;
};
type AccountForm = Form<AccountFormFields>;
