import { describe, expect, it } from 'vitest';

describe('utils: deepCopy', () => {
  it('can do deep copy for an object', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const copy = deepCopy(obj) as typeof obj;

    expect(copy).not.toBe(obj);
    expect(copy).toEqual(obj);
    expect(copy.b).not.toBe(obj.b);
    expect(copy.b).toEqual(obj.b);
  });

  it('can do deep copy for a date', () => {
    const date = new Date('2023-03-05T12:33:54.000Z');

    const copy = deepCopy(date) as typeof date;

    expect(copy).not.toBe(date);
    expect(copy.getTime()).toEqual(date.getTime());
  });
});
