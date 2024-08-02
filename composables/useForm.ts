import { deepCopy } from '~/utils/deepCopy';
import type { Reactive } from 'vue';
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
    onSuccess: (response: any) => void
  ) => {
    try {
      const body = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.value])
      );
      const response = await apiFetch<T>(method, endpoint, body);
      onSuccess(response);
    } catch (error) {
      handleError(error as ApiResponseError);
    }
  };

  const handleError = (error: ApiResponseError) => {
    const response = error.response;
    if (response.status === VALIDATION_ERROR_STATUS) {
      updateFormErrors(form, response._data.errors);
    }
  };

  const updateFormErrors = (form: Reactive<T>, errors: Record<string, string[]>) => {
    Object.entries(errors).forEach(([key, value]) => {
      form[key as keyof Form].errors = value;
    });
  };

  return {
    form,
    pending,
    handleFieldUpdate,
    submit
  };
}
