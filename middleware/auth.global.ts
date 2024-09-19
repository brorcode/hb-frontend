import { useCookie } from '#app';
import { useNotificationsStore } from '~/stores/notifications';
import { usePersistentState } from '~/composables/usePersistentState';

export default defineNuxtRouteMiddleware(async (to) => {
  const [user] = usePersistentState<User>('user');
  const xsrf = useCookie('XSRF-TOKEN');
  const notifications = useNotificationsStore();

  const excludedRouteNames = ['index', 'login', 'register', 'verify-email-id-hash']; // Define routes to exclude
  if (excludedRouteNames.includes(to.name as string)) {
    return; // Skip middleware for these routes
  }

  if (!user.value || !xsrf.value) {
    notifications.addNotification({
      message: 'Ваша сессия истекла. Пожалуйста, войдите снова.',
    });

    return navigateTo('/login', { replace: true });
  }
});
