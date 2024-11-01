import { describe, expect, it } from 'vitest';

describe('utils: money', () => {
  it('can format money', () => {
    expect(toCurrency(44).replace(/\u00A0/g, ' ')).toEqual('44,00 ₽');
    expect(toCurrency(-422.01).replace(/\u00A0/g, ' ')).toEqual('-422,01 ₽');
    expect(toCurrency(0).replace(/\u00A0/g, ' ')).toEqual('0,00 ₽');
    expect(toCurrency(111.237).replace(/\u00A0/g, ' ')).toEqual('111,24 ₽');
    expect(toCurrency(100000.50).replace(/\u00A0/g, ' ')).toEqual('100 000,50 ₽');
  });
});
