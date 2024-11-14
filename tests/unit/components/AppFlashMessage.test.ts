import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppFlashMessage from '~/components/AppFlashMessage.vue';

describe('AppFlashMessage', () => {
  it('can see success messages', async () => {
    const store = useFlashMessagesStore();
    store.addMessage({
      type: 'success',
      message: 'Some message',
    });

    const component = await mountSuspended(AppFlashMessage);

    expect(component.html()).toContain('Удачно');
    expect(component.html()).toContain('Some message');
  });

  it('can see error messages', async () => {
    const store = useFlashMessagesStore();
    store.addMessage({
      type: 'error',
      message: 'Some message',
    });

    const component = await mountSuspended(AppFlashMessage);

    expect(component.html()).toContain('Ошибка');
    expect(component.html()).toContain('Some message');
  });
});
