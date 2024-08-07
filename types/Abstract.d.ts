type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiResponseError = {
  response: {
    status: number;
    _data: {
      message: string;
      errors: Record<string, string[]>;
    };
  };
};

type BaseRow = {
  id: number;
};

type Row<T = object> = BaseRow & T & { [key: string]: any };

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

interface ListData<T> {
  items: T[];
  isLastPage: boolean;
}

interface BaseItemsResponse<T> {
  // data?: ListData<T>;
  data?: T[];
  meta?: ResponseMeta;
  error?: {
    code: string;
    message: string;
    details?: ErrorDetails;
  };
  notification?: ApiNotification;
}

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
  body?: fn;
};

type Filter = {
  key: string;
  value: any;
  label: string;
};

type Filters<T = Record<string, any>> = {
  [P in keyof T]: Overwrite<Filter, { value: T[P] }>;
};

type FormField = {
  key: string;
  value: any;
  label: string;
  errors: string[];
};

type Form<T = Record<string, any>> = {
  [P in keyof T]: Overwrite<FormField, { value: T[P] }>;
};

type Sorting = {
  column: string | null;
  direction: 'ASC' | 'DESC' | null;
};
