import { deepCopy } from '~/utils/deepCopy';
import { VALIDATION_ERROR_STATUS } from '~/constants/statusCodes';

export function useForm<T extends Record<string, any>>(initialForm: T) {
  const { apiFetch, pending } = useApi();
  const form = reactive(deepCopy(initialForm) as T);

  const handleFieldUpdate = (key: keyof Form, value: string) => {
    form[key].errors = [];
    form[key].value = value;
  };

  const submit = async (
    endpoint: string,
    method: HttpMethod,
    onSuccess?: (response: any) => void
  ) => {
    try {
      clearErrors();

      const body = Object.fromEntries(
        Object.entries(form)
          .filter(([, value]) => value.value) // filter out falsy values
          .map(([key, value]) => [key, value.value])
      );

      const response = await apiFetch<T>(method, endpoint, body);
      if (response.data) {
        updateForm(response.data);
      }
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      handleError(error as ApiResponseError);
    }
  };

  const fetchItem = async (endpoint: string, id: number) => {
    const response = await apiFetch<BaseItemResponse<Row>>('GET', `${endpoint}/${id}`);

    if (response.data) {
      updateForm(response.data);
    }
  };

  const clearErrors = () => {
    Object.values(form).forEach((field) => {
      field.errors = [];
    });
  };

  const updateForm = (data: Row) => {
    Object.entries(form).forEach(([key]) => {
      form[key].value = data[key];
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
      if (form[key as keyof UserForm]) {
        form[key as keyof UserForm].errors = value;
      }
    });
  };

  return {
    form,
    pending,
    handleFieldUpdate,
    submit,
    fetchItem
  };
}
