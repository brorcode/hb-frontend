import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppSkeletonTbody from '~/components/table/AppSkeletonTbody.vue';

describe('AppSkeletonTbody', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppSkeletonTbody, {
      props: {
        rowsCount: 10,
        columnsCount: 5,
      },
    });

    expect(component.findAll('tr').length).toBe(10);
    // 5 columns multiple to 10 rows and plus 10 additional td (by one in each tr)
    expect(component.findAll('td').length).toBe((5 * 10) + 10);
  });
});
