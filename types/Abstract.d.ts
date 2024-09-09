type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiResponseError = {
  response: {
    status: number;
    _data: {
      message: string;
      // todo errors we send not always??? it needs to check API responses to have one style for all
      errors: Record<string, string[]>;
    };
  };
};

type Row<T = object> = T & { [key: string]: typeof T[keyof T] };

type ResponseMeta = {
  perPage: number;
  currentPage: number;
  hasNextPage: boolean;
};

interface BaseResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

interface BaseItemsResponse<T> extends BaseResponse {
  data?: T[];
  meta?: ResponseMeta;
}

interface BaseItemResponse<T> extends BaseResponse {
  data?: T;
}

type Column = {
  field: string;
  header: string;
  sortable?: boolean;
  body?: fn;
};

type MultiSelect = RelationOption[];
type RelationOption = {
  id: number;
  name: string;
};

type Filter<T = Record<string, InputValue>, K extends keyof T = keyof T> = {
  key: keyof T;
  value: T[K];
  label: string;
};
type Filters<T = Record<string, InputValue>> = {
  [K in keyof T]: Filter<T, K>;
};

type FormField<T = Record<string, InputValue>, K extends keyof T = keyof T> = {
  key: keyof T;
  value: T[K];
  relation_key?: string;
  relation_value?: RelationOption | null;
  label: string;
  errors: string[];
};
type Form<T = Record<string, InputValue>> = {
  [K in keyof T]: FormField<T, K>;
};

type Sorting = {
  column: string | null;
  direction: 'ASC' | 'DESC' | null;
};

type TableAction = {
  action: (selectedItems: number[]) => void;
  icon: Component;
  title: string;
  type?: 'info' | 'warning' | 'danger';
};

type InputText = string;
type InputNumber = number;
type InputCheckbox = boolean;
type InputDate = Date;
type InputDateRange = [Date, Date];
type InputSelect = RelationOption;
type InputMultiSelect = RelationOption[];

type InputValue =
  InputText |
  InputNumber |
  InputCheckbox |
  InputDate |
  InputDateRange |
  InputSelect |
  InputMultiSelect |
  null;
