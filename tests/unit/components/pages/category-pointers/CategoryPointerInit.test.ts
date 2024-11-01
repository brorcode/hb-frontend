import { describe, expect, it } from 'vitest';
import { categoryPointerApiUrl } from '~/components/pages/category-pointers/CategoryPointerInit';

describe('CategoryPointerInit', () => {
  it('should export correct category pointer API URL', () => {
    expect(categoryPointerApiUrl).toBe('/api/v1/category-pointers');
  });
});
