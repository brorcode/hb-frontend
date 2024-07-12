type BaseRow = {
  id: number;
};

type Row<T = object> = BaseRow & T & { [key: string]: any };
// type Row<T = object> = BaseRow & T;

interface ErrorDetails {
  [key: string]: string[];
}

type NotificationType = 'success' | 'error';

interface Notification {
  type: NotificationType;
  title: string;
  message: string;
}

interface ListData<T> {
  items: T[];
  isLastPage: boolean;
}

interface BaseListResponse<T> {
  data?: ListData<T>;
  error?: {
    code: string;
    message: string;
    details?: ErrorDetails;
  };
  notification?: Notification;
}

// type BaseListResponse<T> = {
//   data?: ListData<T>;
//   error?: {
//     code: string;
//     message: string;
//   };
// };

interface BaseGetResponse<T> {
  data?: { item: T };
  error?: {
    code: string;
    message: string;
    details?: ErrorDetails;
  };
  notification?: Notification;
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
  // [P in keyof T]: Filter;
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
