import { useCookie } from '#app';

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const [user] = usePersistentState<User>('user');
  const xsrf = useCookie('XSRF-TOKEN');

  const excludedRouteNames = ['verify-email-id-hash']; // Define routes to exclude
  if (excludedRouteNames.includes(to.name as string)) {
    return; // Skip middleware for these routes
  }

  if (user.value && xsrf.value) {
    return navigateTo(config.public.homeUrl, { replace: true });
  }
});
