export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const [user] = usePersistentState<User>('user');
  console.log('user', user.value);

  if (user.value) {
    return navigateTo(config.public.homeUrl, { replace: true });
  }
});
