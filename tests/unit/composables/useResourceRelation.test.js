import { describe, expect, it } from 'vitest';

describe('usePersistentState', () => {
  it('initializes relation state with default values', () => {
    const initialForm = {
      name: { value: 'name1' },
      email: { value: 'email1' },
    };
    const { form } = useResourceRelation(initialForm);
    expect(form).toEqual(initialForm);
  });

  it('can update form by resource correctly', () => {
    const initialForm = { someField: { value: null } };
    const { initRelation, form, prepareForm } = useResourceRelation(initialForm);

    initRelation('someField', 'someResource', 1, 'Test Name');
    prepareForm('someResource');

    expect(form.someField.value).toBe(1);
    expect(form.someField.relation_value).toEqual({ id: 1, name: 'Test Name' });
  });
});
