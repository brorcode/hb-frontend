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

  it('can get formatted month name', () => {
    // Test each month number to ensure it returns the correct month name
    expect(formatMonthName(0)).toBe('январь');
    expect(formatMonthName(1)).toBe('февраль');
    expect(formatMonthName(2)).toBe('март');
    expect(formatMonthName(3)).toBe('апрель');
    expect(formatMonthName(4)).toBe('май');
    expect(formatMonthName(5)).toBe('июнь');
    expect(formatMonthName(6)).toBe('июль');
    expect(formatMonthName(7)).toBe('август');
    expect(formatMonthName(8)).toBe('сентябрь');
    expect(formatMonthName(9)).toBe('октябрь');
    expect(formatMonthName(10)).toBe('ноябрь');
    expect(formatMonthName(11)).toBe('декабрь');
  });

  it('returns undefined for invalid month numbers', () => {
    expect(formatMonthName(-1)).toBeUndefined();
    expect(formatMonthName(12)).toBeUndefined();
    expect(formatMonthName(100)).toBeUndefined();
  });
});
