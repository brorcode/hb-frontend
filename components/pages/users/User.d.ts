type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type UserGetResponse = BaseItemResponse<User>;
type UserListResponse = BaseItemsResponse<User>;

type UserRow = Row<User>;

type UserColumn = {
  field: keyof User;
} & Column;

type UserFilters = Filters<{
  id: number | null;
  name: string;
}>;

type UserForm = Form<{
  name: string;
  email: string;
  password: string;
}>;
