import { useCookie } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const [user] = usePersistentState<User>('user');
  const xsrf = useCookie('XSRF-TOKEN');

  const excludedRoutes = ['/', '/login']; // Define routes to exclude
  if (excludedRoutes.includes(to.path)) {
    return; // Skip middleware for these routes
  }

  if (!user.value || !xsrf.value) {
    return navigateTo('/login', { replace: true });
  }
});
