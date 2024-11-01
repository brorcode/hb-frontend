import { describe, expect, it } from 'vitest';

describe('utils: constants', () => {
  it('can get default sorting', () => {
    expect(defaultSorting).toEqual({
      column: 'created_at',
      direction: 'DESC',
    });
  });

  it('can get transaction type', () => {
    expect(transactionType.DEBIT_TYPE_ID).toEqual(1);
    expect(transactionType.CREDIT_TYPE_ID).toEqual(2);
  });
});
