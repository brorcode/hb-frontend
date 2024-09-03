type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
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
