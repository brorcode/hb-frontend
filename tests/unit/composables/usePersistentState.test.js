import { describe, expect, it } from 'vitest';

describe('usePersistentState', () => {
  it('returns an array with the initial value', () => {
    const [state] = usePersistentState('test-key1', 'initial-value');
    expect(state.value).toBe('initial-value');
  });

  it('returns an array with the stored value from local storage', () => {
    localStorage.setItem('test-key2', JSON.stringify('stored-value'));
    const [state] = usePersistentState('test-key2');
    expect(state.value).toBe('stored-value');
  });

  it('updates the state and local storage with setState', () => {
    const [state, setState] = usePersistentState('test-key3', 'initial-value');
    setState('new-value');
    expect(state.value).toBe('new-value');
    expect(localStorage.getItem('test-key3')).toBe(JSON.stringify('new-value'));
  });

  it('handles null values with setState', () => {
    const [state, setState] = usePersistentState('test-key4', 'initial-value');
    setState(null);
    expect(state.value).toBeNull();
    expect(localStorage.getItem('test-key4')).toBe('null');
  });

  it('handles different data types', () => {
    const [state, setState] = usePersistentState('test-key5', { foo: 'bar' });
    expect(state.value).toEqual({ foo: 'bar' });
    setState(123);
    expect(state.value).toBe(123);
    expect(localStorage.getItem('test-key5')).toBe(JSON.stringify(123));
  });

  it('handles JSON parsing errors', () => {
    localStorage.setItem('test-key6', ' invalid-json ');
    const [state] = usePersistentState('test-key6');
    expect(state.value).toBeUndefined();
  });
});
