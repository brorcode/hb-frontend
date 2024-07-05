import { defineStore } from 'pinia';

interface NotificationStore {
  id: number;
  show: boolean;
  success: boolean | null;
  title: string | null;
  message: string | null;
}

interface NotificationsState {
  notifications: NotificationStore[];
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsState => ({
    notifications: []
  }),
  actions: {
    addNotification(success: boolean, title: string, message: string) {
      const notification: NotificationStore = {
        id: this.notifications.length + 1,
        show: true,
        success,
        title,
        message
      };
      this.notifications.push(notification);

      setTimeout(() => {
        this.removeNotification(notification.id);
      }, 3000);
    },
    removeNotification(id: number) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    }
  }
});
