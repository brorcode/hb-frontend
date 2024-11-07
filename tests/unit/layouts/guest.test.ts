import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Guest from '~/layouts/guest.vue';

describe('guest layout', () => {
  it('renders correctly', async () => {
    const layout = await mountSuspended(Guest, {
      slots: {
        default: () => '<div>Test Slot Content</div>',
      },
    });
    expect(layout.exists()).toBeTruthy();
    expect(layout.find('div.isolate').exists()).toBeTruthy();
    expect(layout.find('div').text()).toContain('Test Slot Content');
  });
});
