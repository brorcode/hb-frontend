type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryGetResponse = BaseItemResponse<Category>;
type CategoryListResponse = BaseItemsResponse<Category>;

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

type CategoryFormType = Form<{
  name: string;
  description: string;
}>;
