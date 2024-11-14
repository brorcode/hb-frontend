export const goBack = (path: string) => {
  const router = useRouter();

  if (router.options.history.state.back) {
    router.back();
    return;
  }

  navigateTo(path);
};
