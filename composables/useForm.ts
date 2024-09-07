import { reactive } from 'vue';
import { deepCopy } from '~/utils/deepCopy';
import { VALIDATION_ERROR_STATUS } from '~/constants/statusCodes';

export function useForm<T, R = Row>(initialForm: Form<T>) {
  const { apiFetch, pending } = useApi();
  const form = reactive(deepCopy(initialForm) as Form<T>) as Form<T>;

  const handleFieldUpdate = (key: keyof Form<T>, value: T[keyof T]) => {
    form[key].errors = [];
    form[key].value = value;
  };

  const submit = async (
    endpoint: string,
    method: HttpMethod,
    onSuccess?: (response: BaseItemResponse<R>) => void,
  ) => {
    try {
      clearErrors();

      const body = Object.fromEntries(
        Object.entries(form)
          .filter(([, value]) => {
            const field = value as FormField<T>;

            if (typeof field.value === 'boolean') {
              return true;
            }
            // filter out falsy values
            return field.value !== undefined && field.value !== null && field.value !== '';
          })
          .map(([key, value]) => {
            const field = value as FormField<T>;

            return [key, field.value];
          }),
      );

      const response = await apiFetch<BaseItemResponse<Row>>(method, endpoint, body);
      if (response.data) {
        updateForm(response.data);
      }
      if (onSuccess) {
        onSuccess(response as BaseItemResponse<R>);
      }
    }
    catch (error) {
      handleError(error as ApiResponseError);
    }
  };

  const fetchItem = async (endpoint: string, id: number) => {
    try {
      const response = await apiFetch<BaseItemResponse<Row>>('GET', `${endpoint}/${id}`);

      if (response.data) {
        updateForm(response.data);
      }
    }
    catch (e) {
      return e;
    }
  };

  const clearErrors = () => {
    Object.values(form).forEach((item) => {
      const field = item as FormField<T>;
      field.errors = [];
    });
  };

  const updateForm = (data: Row) => {
    Object.entries(form).forEach(([key]) => {
      const formKey = key as keyof T;
      const relationKey = form[formKey].relation_key;

      if (relationKey !== undefined) {
        form[formKey].relation_value = data[relationKey];
        form[formKey].value = data[relationKey].id;
        return;
      }
      if (data[key] !== undefined) {
        form[formKey].value = data[key];
      }
    });
  };

  const handleError = (error: ApiResponseError) => {
    const response = error.response;
    if (response.status === VALIDATION_ERROR_STATUS) {
      updateFormErrors(response._data.errors);
    }
  };

  const updateFormErrors = (errors: Record<string, string[]>) => {
    // Update errors based on the new errors object
    Object.entries(errors).forEach(([key, value]) => {
      if (form[key as keyof Form<T>]) {
        form[key as keyof Form<T>].errors = value;
      }
    });
  };

  return {
    form,
    pending,
    handleFieldUpdate,
    submit,
    fetchItem,
  };
}
