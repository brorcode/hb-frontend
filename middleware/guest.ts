import { useCookie } from '#app';

export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const [user] = usePersistentState<User>('user');
  const xsrf = useCookie('XSRF-TOKEN');

  if (user.value && xsrf.value) {
    return navigateTo(config.public.homeUrl, { replace: true });
  }
});
