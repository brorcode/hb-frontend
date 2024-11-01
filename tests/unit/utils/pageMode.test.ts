import { describe, expect, it } from 'vitest';

describe('utils: pageMode', () => {
  it('can get page mode', () => {
    expect(pageMode.VIEW).toEqual('view');
    expect(pageMode.EDIT).toEqual('edit');
  });
});
