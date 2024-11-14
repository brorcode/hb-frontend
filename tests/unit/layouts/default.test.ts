import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import Default from '~/layouts/default.vue';

mockNuxtImport('useApi', () => {
  return () => ({
    apiFetch: vi.fn(),
  });
});

describe('default layout', () => {
  it('renders correctly', async () => {
    const layout = await mountSuspended(Default, {
      slots: {
        default: () => '<div>Test Slot Content</div>',
      },
    });
    expect(layout.exists()).toBeTruthy();
    expect(layout.find('div').text()).toContain('Test Slot Content');
  });

  it('can open the sidebar when the button is clicked', async () => {
    const layout = await mountSuspended(Default);
    const button = layout.find('button[data-testid="button-open-close-sidebar"]');
    const wrapper = layout.vm as unknown as { sidebarOpen: { value: boolean } };
    expect(wrapper.sidebarOpen.value).toBeFalsy();
    await button.trigger('click');
    expect(wrapper.sidebarOpen.value).toBeTruthy();
  });

  it('handles user navigation correctly', async () => {
    const layout = await mountSuspended(Default);
    const item = { name: 'Выйти', clickEvent: vi.fn() };
    const wrapper = layout.vm as unknown as { handleClick: (item: { name: string; clickEvent: () => void }) => Promise<void> };

    await wrapper.handleClick(item);
    expect(item.clickEvent).toHaveBeenCalled();
  });
});
