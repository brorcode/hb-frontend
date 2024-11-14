import { useState } from '#app';

export const usePersistentState = <T>(
  key: string,
  initialValue?: T | null,
): [Ref<T | null>, (newValue: T | null) => void] => {
  const storedValue = localStorage.getItem(key);

  const initialState = () => {
    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      return initialValue;
    }
  };

  const state = useState<T | null>(key, initialState);

  const setState = (newValue: T | null) => {
    state.value = newValue;
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [state, setState];
};
