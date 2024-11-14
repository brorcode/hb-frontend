import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppSidebar from '~/components/AppSidebar.vue';

describe('AppSidebar', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppSidebar);

    expect(component.findComponent({ name: 'AppLogo' }).exists()).toBe(true);
    expect(component.findComponent({ name: 'AppNavbar' }).exists()).toBe(true);
  });
});
