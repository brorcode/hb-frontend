<template>
  <div
    v-if="notifications?.length ?? 0 > 0"
    class="flex items-center gap-x-4 lg:gap-x-6"
  >
    <Menu
      as="div"
      class="relative"
    >
      <MenuButton
        id="notifications"
        data-testid="show-notifications-button"
        class="-m-1.5 flex items-center p-1.5"
        @click="readNotifications"
      >
        <span class="sr-only">View notifications</span>
        <span class="flex relative h-6 w-6">
          <span
            v-if="hasNew"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
          />
          <BellIcon
            class="h-6 w-6 absolute"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="divide-y divide-gray-200 overflow-y-scroll max-h-64 h-auto absolute px-3 text-sm text-gray-900 right-0 z-10 mt-2.5 w-[25rem] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          <MenuItem
            v-for="(notification, index) in notifications"
            :key="`notification-${index}`"
          >
            <div class="py-1 leading-6">
              <div :class="[notification.is_viewed ? 'font-light' : 'font-bold']">
                {{ notification.message }}
              </div>
              <div class="mt-2 font-light">
                {{ notification.created_at }}
              </div>
            </div>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>

    <!-- Separator -->
    <div
      class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon } from '@heroicons/vue/24/outline';

const list = useListStore();
const { apiFetch } = useApi();
const route = useRoute();

const notifications = ref<Notifications[] | null>(null);
const hasNew = ref<boolean>(false);

onMounted(async () => {
  await getNotifications();
});

watch(() => route.path, async () => {
  await getNotifications();
});

const getNotifications = async () => {
  try {
    const response = await apiFetch<NotificationsResponse>('GET', 'api/v1/notifications');
    notifications.value = response.data;
    hasNew.value = response.has_new;
  }
  catch (e) {
    notifications.value = null;
    hasNew.value = false;
    return e;
  }
};

const markAsViewed = async () => {
  try {
    const response = await apiFetch<NotificationsResponse>('POST', 'api/v1/notifications/read');
    notifications.value = response.data;
    hasNew.value = response.has_new;
    if (response.has_new) {
      list.needRefresh(true);
    }
  }
  catch (e) {
    return e;
  }
};

const readNotifications = async () => {
  // get new notifications
  await getNotifications();

  // mark them as viewed
  setTimeout(markAsViewed, 1000);
};
</script>
