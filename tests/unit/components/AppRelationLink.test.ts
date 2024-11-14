import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppRelationLink from '~/components/AppRelationLink.vue';

mockNuxtImport('useRoute', () => {
  return () => ({
    name: 'routeName',
  });
});

describe('AppRelationLink', () => {
  it('can see link if route does not match', async () => {
    const component = await mountSuspended(AppRelationLink, {
      props: {
        item: {
          id: 1,
          name: 'Some name',
        },
        routeName: 'routeName_other',
        linkUrl: '/users',
      },
    });

    expect(component.findComponent({ name: 'NuxtLink' }).exists()).toBe(true);
    expect(component.html()).toContain('Some name');
  });

  it('can not see link if route matches', async () => {
    const component = await mountSuspended(AppRelationLink, {
      props: {
        item: {
          id: 1,
          name: 'Some name',
        },
        routeName: 'routeName',
        linkUrl: '/users',
      },
    });

    expect(component.findComponent({ name: 'NuxtLink' }).exists()).toBe(false);
    expect(component.html()).toContain('Some name');
  });
});
