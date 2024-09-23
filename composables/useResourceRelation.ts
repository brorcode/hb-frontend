import { reactive } from 'vue';
import { deepCopy } from '~/utils/deepCopy';
import { usePersistentState } from '~/composables/usePersistentState';

export type RelationResource = {
  key: string;
  resource: string;
};

type RelationState = {
  relation_value: RelationOption;
} & RelationResource;

export function useResourceRelation<T>(initialForm: Form<T> | null) {
  const [relation, setRelation] = usePersistentState<RelationState>('relation');
  const form = reactive(deepCopy(initialForm ?? {}) as Form<T>) as Form<T>;

  const initRelation = (key: string, resource: string, value: number, name: string) => {
    setRelation({
      key: key,
      resource: resource,
      relation_value: {
        id: value,
        name: name,
      },
    });
  };

  const prepareForm = (resource: string) => {
    if (relation.value && relation.value.resource === resource && form[relation.value.key as keyof T]) {
      const relationKey = relation.value.key as keyof Form<T>;

      form[relationKey].value = relation.value.relation_value.id as T[keyof T];
      form[relationKey].relation_value = relation.value.relation_value;
    }

    clearRelation();
  };

  const clearRelation = () => {
    setRelation(null);
  };

  return {
    form,
    initRelation,
    clearRelation,
    prepareForm,
  };
}
