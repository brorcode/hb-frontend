import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppCard from '~/components/AppCard.vue';

describe('AppCard', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppCard, {
      slots: {
        default: () => '<div>Some slot content</div>',
      },
    });

    expect(component.html()).toContain('Some slot content');
  });
});
