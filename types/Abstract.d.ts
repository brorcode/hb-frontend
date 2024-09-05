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

interface ErrorDetails {
  [key: string]: string[];
}

type NotificationType = 'success' | 'error';

interface ApiNotification {
  type: NotificationType;
  title: string;
  message: string;
}

type ResponseMeta = {
  perPage: number;
  currentPage: number;
  hasNextPage: boolean;
};

// TODO check if error sends from server
interface BaseItemsResponse<T> {
  data?: T[];
  meta?: ResponseMeta;
  error?: {
    code: string;
    message: string;
    details?: ErrorDetails;
  };
  notification?: ApiNotification;
}

// TODO check if error sends from server
interface BaseItemResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: ErrorDetails;
  };
  notification?: ApiNotification;
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
  color?: 'red';
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
