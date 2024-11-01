import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('flash messages store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can run add message action', () => {
    const store = useFlashMessagesStore();

    expect(store.messages).toEqual([]);
    store.addMessage({
      type: 'success',
      title: 'Some success title',
      message: 'Some success message',
    });

    store.addMessage({
      type: 'error',
      message: 'Some fail message',
    });

    expect(store.messages).toEqual([
      {
        id: 1,
        show: true,
        success: true,
        title: 'Удачно',
        message: 'Some success message',
      },
      {
        id: 2,
        show: true,
        success: false,
        title: 'Ошибка',
        message: 'Some fail message',
      },
    ]);
  });

  it('can shows default error message when no message', () => {
    const store = useFlashMessagesStore();

    expect(store.messages).toEqual([]);
    store.addMessage({});

    expect(store.messages).toEqual([
      {
        id: 1,
        show: true,
        success: false,
        title: 'Ошибка',
        message: 'Что-то пошло не так',
      },
    ]);
  });

  it('can run remove message action', () => {
    const store = useFlashMessagesStore();

    expect(store.messages).toEqual([]);
    store.addMessage({});
    store.addMessage({});
    store.addMessage({});
    expect(store.messages.length).toEqual(3);
    store.removeMessage(1);
    expect(store.messages.length).toEqual(2);
  });
});
