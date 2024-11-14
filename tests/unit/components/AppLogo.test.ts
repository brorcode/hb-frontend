import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppLogo from '~/components/AppLogo.vue';

describe('AppLogo', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppLogo);

    expect(component.html()).toContain('Бюджет');
  });
});
