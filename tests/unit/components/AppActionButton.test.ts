import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppActionButton from '~/components/AppActionButton.vue';

describe('AppActionButton', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppActionButton, {
      props: {
        text: 'Some button title',
        pending: false,
      },
    });

    expect(component.html()).toContain('Some button title');
  });
});
