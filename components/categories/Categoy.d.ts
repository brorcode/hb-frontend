type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryGetResponse = BaseGetResponse<Category>;
type CategoryListResponse = BaseListResponse<Category>;

type CategoryRow = {
  field: keyof Category;
} & Row;

type CategoryColumn = {
  field: keyof Category;
} & Column;

type CategoryFilters = Filters<{
  id: number;
  name: string;
  description: string;
}>;

type CategoryForm = Form<{
  name: string;
  description: string;
}>;
