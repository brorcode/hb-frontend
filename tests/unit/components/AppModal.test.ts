import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppModal from '~/components/AppModal.vue';

type ModalTest = {
  title: string;
  text: string;
  open?: boolean;
  action: () => void;
  pending?: boolean;
  actionText: string;
  extraComponent?: Component;
  icon: Component;
  type?: ModalType;
};

mockNuxtImport('useModalStore', () => {
  return () => ({
    title: 'Modal title',
    text: 'Modal test',
    open: false,
    action: () => vi.fn(),
    actionText: 'Run action',
    icon: ArrowPathIcon,
    pending: false,
  });
});

describe('AppModal', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppModal);
    const wrapper = component.vm as unknown as {
      modal: ModalTest;
      colorIconBgVariants: Record<ModalType, string>;
      colorIconVariants: Record<ModalType, string>;
      colorButtonVariants: Record<ModalType, string>;
    };

    expect(wrapper.modal.title).toBe('Modal title');
    expect(wrapper.modal.text).toBe('Modal test');
    expect(wrapper.modal.actionText).toBe('Run action');
    expect(wrapper.modal.icon).toBe(ArrowPathIcon);
    expect(wrapper.modal.open).toBeFalsy();
    expect(wrapper.modal.pending).toBeFalsy();
    expect(wrapper.colorIconBgVariants['info']).toBe('bg-indigo-100');
    expect(wrapper.colorIconBgVariants['danger']).toBe('bg-red-100');
    expect(wrapper.colorIconBgVariants['warning']).toBe('bg-yellow-100');
    expect(wrapper.colorIconVariants['info']).toBe('text-indigo-600');
    expect(wrapper.colorIconVariants['danger']).toBe('text-red-600');
    expect(wrapper.colorIconVariants['warning']).toBe('text-yellow-600');
    expect(wrapper.colorButtonVariants['info']).toBe('bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-300');
    expect(wrapper.colorButtonVariants['danger']).toBe('bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-300');
    expect(wrapper.colorButtonVariants['warning']).toBe('bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 disabled:bg-yellow-300');
  });
});
