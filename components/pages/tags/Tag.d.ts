type Tag = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type TagGetResponse = BaseItemResponse<Tag>;
type TagListResponse = BaseItemsResponse<Tag>;

type TagRow = Row<Tag>;

type TagColumn = {
  field: keyof Tag;
} & Column;

type TagFilterFields = {
  id: number | null;
  name: string;
};
type TagFilters = Filters<TagFilterFields>;

type TagFormFields = {
  name: string;
};
type TagForm = Form<TagFormFields>;
