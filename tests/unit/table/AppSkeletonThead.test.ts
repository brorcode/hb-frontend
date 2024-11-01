import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppSkeletonThead from '~/components/table/AppSkeletonThead.vue';

describe('AppSkeletonThead', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppSkeletonThead, {
      props: {
        columns: [
          { field: 'id', header: 'ID' },
          { field: 'name', header: 'Название' },
          { field: 'created_at', header: 'Дата создания' },
        ],
      },
    });

    expect(component.findAll('tr').length).toBe(1);
    // 3 columns plus 1 additional th for edit column
    expect(component.findAll('th').length).toBe(3 + 1);
  });
});
