type User = {
  id: number;
  name: string;
  email: string;
  has_verified_email: boolean;
  permissions: string[];
  created_at: string;
};

type UserGetResponse = BaseItemResponse<User>;
type UserListResponse = BaseItemsResponse<User>;

type UserRow = Row<User>;

type UserColumn = {
  field: keyof User;
} & Column;

type UserFilterFields = {
  id: number | null;
  name: string;
};

type UserFilters = Filters<UserFilterFields>;

type UserFormFields = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type UserForm = Form<UserFormFields>;
