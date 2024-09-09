import { defineStore } from 'pinia';
import { CheckIcon } from '@heroicons/vue/24/outline';

export type ModalType = 'info' | 'warning' | 'danger';

interface Modal {
  title: string;
  text: string;
  open?: boolean;
  action: () => void;
  pending?: boolean;
  actionText: string;
  extraComponent?: Component;
  icon: Component;
  type?: ModalType;
}

export const useModalStore = defineStore('modal', {
  state: (): Modal => ({
    title: '',
    text: '',
    open: false,
    action: () => {},
    actionText: '',
    icon: CheckIcon,
    type: 'info',
  }),
  actions: {
    showModal(modal: Modal) {
      this.title = modal.title;
      this.text = modal.text;
      this.action = modal.action;
      this.pending = modal.pending;
      this.actionText = modal.actionText;
      this.extraComponent = modal.extraComponent;
      this.icon = modal.icon;
      this.type = modal.type;
      this.open = true;
    },
    hideModal() {
      this.open = false;
    },
  },
});
