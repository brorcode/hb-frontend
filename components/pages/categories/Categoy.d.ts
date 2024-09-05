type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type CategoryGetResponse = BaseItemResponse<Category>;
type CategoryListResponse = BaseItemsResponse<Category>;

type CategoryRow = Row<Category>;

type CategoryColumn = {
  field: keyof Category;
} & Column;

type CategoryFilters = Filters<{
  id: number | null;
  name: string;
}>;

type CategoryForm = Form<{
  name: string;
}>;
