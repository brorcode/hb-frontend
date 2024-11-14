import { describe, expect, it } from 'vitest';

describe('utils: date', () => {
  it('can get month map', () => {
    expect(monthMap).toEqual({
      январь: 0,
      февраль: 1,
      март: 2,
      апрель: 3,
      май: 4,
      июнь: 5,
      июль: 6,
      август: 7,
      сентябрь: 8,
      октябрь: 9,
      ноябрь: 10,
      декабрь: 11,
    });
  });

  it('can get formatted date', () => {
    expect(formatDate('2022-01-01T00:00:00.000Z')).toEqual('01-01-2022');
    expect(formatDate('2023-03-02T12:55:04.000Z', true)).toEqual('02-03-2023 15:55:04');
  });
});
