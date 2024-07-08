type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type UserListResponse = BaseListResponse<User>;

type UserRow = {
  field: keyof User;
} & Row;

type UserColumn = {
  field: keyof User;
} & Column;

type UserFilters = Filters<{
  id: number;
  name: string;
}>;

type UserForm = Form<{
  name: string;
  email: string;
}>;
