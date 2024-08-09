export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const [user] = usePersistentState<User>('user');

  if (user.value) {
    return navigateTo(config.public.homeUrl, { replace: true });
  }
});
