import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import TableActions from '~/components/table/TableActions.vue';

describe('TableActions', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(TableActions, {
      props: {
        selectedRows: [1, 2, 3],
        tableActions: [
          { action: () => vi.fn(), icon: PlusIcon, title: 'Add something' },
          { action: () => vi.fn(), icon: TrashIcon, title: 'Delete something' },
        ],
      },
    });

    expect(component.html()).toContain('Выбрано: 3');
    expect(component.html()).not.toContain('Add something');
    expect(component.html()).not.toContain('Delete something');

    const tableActionsButton = component.find('[data-testid="show-table-actions-button"]');
    await tableActionsButton.trigger('click');

    expect(component.html()).toContain('Add something');
    expect(component.html()).toContain('Delete something');

    const wrapper = component.vm as unknown as {
      colorActiveTextVariants: Record<ModalType, string>;
      colorTextVariants: Record<ModalType, string>;
      colorIconVariants: Record<ModalType, string>;
    };

    expect(wrapper.colorActiveTextVariants['info']).toBe('bg-gray-100 text-gray-900');
    expect(wrapper.colorActiveTextVariants['warning']).toBe('bg-yellow-100 text-yellow-900');
    expect(wrapper.colorActiveTextVariants['danger']).toBe('bg-red-100 text-red-900');
    expect(wrapper.colorTextVariants['info']).toBe('text-gray-700');
    expect(wrapper.colorTextVariants['warning']).toBe('text-yellow-700');
    expect(wrapper.colorTextVariants['danger']).toBe('text-red-700');
    expect(wrapper.colorIconVariants['info']).toBe('text-gray-400 group-hover:text-gray-500');
    expect(wrapper.colorIconVariants['warning']).toBe('text-yellow-400 group-hover:text-yellow-500');
    expect(wrapper.colorIconVariants['danger']).toBe('text-red-400 group-hover:text-red-500');
  });
});
