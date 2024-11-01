import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppSidebar from '~/components/AppSidebar.vue';
import AppUpsert from '~/components/AppUpsert.vue';
import { userFormInit } from '~/components/pages/users/UserInit';

mockNuxtImport('useForm', () => {
  return () => ({
    fetchItem: vi.fn(),
    pending: false,
  });
});

describe('AppUpsert', () => {
  it('can render the component on create mode', async () => {
    const component = await mountSuspended(AppUpsert, {
      props: {
        title: 'some title',
        formComponent: AppSidebar,
        formInit: userFormInit,
        apiUrl: '/some-url',
        path: 'users',
      },
    });

    expect(component.html()).toContain('Добавить some title');
    expect(component.findComponent({ name: 'AppForm' }).exists()).toBe(true);
  });
});
