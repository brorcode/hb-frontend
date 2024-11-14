import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FormGrid from '~/components/form/FormGrid.vue';

describe('FormGrid', () => {
  it('can mount the component and load slot', async () => {
    const component = await mountSuspended(FormGrid, {
      slots: {
        default: () => '<div>Slot FormGrid</div>',
      },
    });

    expect(component.html()).toContain('Slot FormGrid');
  });
});
