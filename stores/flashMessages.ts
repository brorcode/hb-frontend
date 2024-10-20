import { defineStore } from 'pinia';

export type ApiFlashMessage = {
  type?: 'success' | 'error';
  title?: string;
  message?: string;
};

interface FlashMessagesStore {
  id: number;
  show: boolean;
  success: boolean | null;
  title: string | null;
  message: string | null;
}

interface FlashMessagesState {
  messages: FlashMessagesStore[];
}

export const useFlashMessagesStore = defineStore('flashMessages', {
  state: (): FlashMessagesState => ({
    messages: [],
  }),
  actions: {
    addMessage(n?: ApiFlashMessage) {
      const message: FlashMessagesStore = {
        id: this.messages.length + 1,
        show: true,
        success: n?.type === 'success',
        title: n?.title || n?.type === 'success' ? 'Удачно' : 'Ошибка',
        message: n?.message || 'Что-то пошло не так',
      };
      this.messages.push(message);

      setTimeout(() => {
        this.removeMessage(message.id);
      }, 3000);
    },
    removeMessage(id: number) {
      const index = this.messages.findIndex(n => n.id === id);
      if (index !== -1) {
        this.messages.splice(index, 1);
      }
    },
  },
});
