import type { Ref } from 'vue';
import { useState } from '#app';

export const usePersistentState = <T>(
  key: string,
  initialValue?: T | null,
): [Ref<T | null>, (newValue: T | null) => void] => {
  const storedValue = localStorage.getItem(key);
  const state = useState<T | null>(key, () =>
    storedValue ? JSON.parse(storedValue) : initialValue,
  );

  const setState = (newValue: T | null) => {
    state.value = newValue;
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [state, setState];
};
