import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppNotifications from '~/components/AppNotifications.vue';

mockNuxtImport('useApi', () => {
  return () => ({
    apiFetch: vi.fn(() => Promise.resolve({
      data: [
        {
          message: 'Message 1',
          is_viewed: false,
          created_at: '5 минут назад',
        },
        {
          message: 'Message 2',
          is_viewed: true,
          created_at: '10 минут назад',
        },
      ],
      hasNew: true,
    })),
  });
});

describe('AppNotification', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(AppNotifications);

    const button = component.find('[data-testid="show-notifications-button"]');
    await button.trigger('click');

    expect(component.html()).toContain('Message 1');
    expect(component.html()).toContain('5 минут наза');
    expect(component.html()).toContain('Message 2');
    expect(component.html()).toContain('10 минут наза');
  });
});
