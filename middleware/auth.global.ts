export default defineNuxtRouteMiddleware((to) => {
  const [user] = usePersistentState<User>('user');

  const excludedRoutes = ['/', '/login']; // Define routes to exclude
  if (excludedRoutes.includes(to.path)) {
    return; // Skip middleware for these routes
  }

  if (!user.value) {
    return navigateTo('/login', { replace: true });
  }
});
