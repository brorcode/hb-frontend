type Account = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type AccountGetResponse = BaseItemResponse<Account>;
type AccountListResponse = BaseItemsResponse<Account>;

type AccountRow = {
  field: keyof Account;
} & Row;

type AccountColumn = {
  field: keyof Account;
} & Column;

type AccountFilters = Filters<{
  id: number;
  name: string;
}>;

type AccountForm = Form<{
  name: string;
}>;
