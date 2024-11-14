import { CheckIcon } from '@heroicons/vue/24/outline';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('modal store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can run show modal action', () => {
    const store = useModalStore();

    expect(store.title).toBe('');
    expect(store.text).toBe('');
    expect(store.open).toBeFalsy();
    expect(store.action).toBeInstanceOf(Function);
    expect(store.actionText).toBe('');
    expect(store.icon).toBe(CheckIcon);
    expect(store.type).toBe('info');

    store.showModal({
      title: 'Modal title',
      text: 'Modal test',
      action: () => {},
      actionText: 'Run action',
      icon: CheckIcon,
      type: 'warning',
    });

    expect(store.title).toBe('Modal title');
    expect(store.text).toBe('Modal test');
    expect(store.open).toBeTruthy();
    expect(store.action).toBeInstanceOf(Function);
    expect(store.actionText).toBe('Run action');
    expect(store.icon).toBe(CheckIcon);
    expect(store.type).toBe('warning');
  });

  it('can run hide modal action', () => {
    const store = useModalStore();

    expect(store.open).toBeFalsy();

    store.showModal({
      title: 'Modal title',
      text: 'Modal test',
      action: () => {},
      actionText: 'Run action',
      icon: CheckIcon,
      type: 'warning',
    });

    expect(store.open).toBeTruthy();

    store.hideModal();

    expect(store.open).toBeFalsy();
  });
});
