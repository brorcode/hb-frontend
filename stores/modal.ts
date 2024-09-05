import { defineStore } from 'pinia';

interface Modal {
  title: string;
  text: string;
  open?: boolean;
  action: () => void;
  pending?: boolean;
  actionText: string;
  extraComponent?: Component;
}

export const useModalStore = defineStore('modal', {
  state: (): Modal => ({
    title: '',
    text: '',
    open: false,
    action: () => {},
    actionText: '',
  }),
  actions: {
    showModal(modal: Modal) {
      this.title = modal.title;
      this.text = modal.text;
      this.action = modal.action;
      this.pending = modal.pending;
      this.actionText = modal.actionText;
      this.extraComponent = modal.extraComponent;
      this.open = true;
    },
    hideModal() {
      this.open = false;
    },
  },
});
