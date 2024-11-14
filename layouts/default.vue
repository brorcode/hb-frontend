<template>
  <div>
    <TransitionRoot
      as="template"
      :show="sidebarOpen"
    >
      <Dialog
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon
                      class="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component -->
              <AppSidebar mobile />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component -->
      <AppSidebar />
    </div>

    <div class="lg:pl-72 bg-gray-100 min-h-screen">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          data-testid="button-open-close-sidebar"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <!-- Separator -->
        <div
          class="h-6 w-px bg-gray-900/10 lg:hidden"
          aria-hidden="true"
        />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form
            class="relative flex flex-1"
            action="#"
            method="GET"
          >
            <label
              for="search-field"
              class="sr-only"
            >Search</label>
            <MagnifyingGlassIcon
              class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            >
          </form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Notifications dropdown -->
            <AppNotifications />

            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="relative"
            >
              <MenuButton
                id="user-menu"
                class="-m-1.5 flex items-center p-1.5"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                  <span class="text-white text-md font-normal">
                    {{ user?.name?.split(' ').map(word => word.charAt(0)).join('') }}
                  </span>
                </div>
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >{{ user?.name }}</span>
                  <ChevronDownIcon
                    class="ml-2 h-5 w-5 text-gray-400"
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
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <div
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer',
                      ]"
                      @click="handleClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import AppSidebar from '~/components/AppSidebar.vue';
import { usePersistentState } from '~/composables/usePersistentState';

const config = useRuntimeConfig();
const { apiFetch } = useApi();
const [user, setUser] = usePersistentState<User>('user');

const userNavigation = [
  { name: 'Профайл', href: `/profile`, clickEvent: null },
  {
    name: 'Выйти',
    href: undefined,
    clickEvent: async () => {
      await apiFetch<User>('POST', config.public.apiLogoutUrl);
      setUser(null);
      navigateTo('/login', { replace: true });
    },
  },
];

const handleClick = async (item: { name: string; href?: string; clickEvent?: (() => Promise<void>) | null }) => {
  sidebarOpen.value = false;
  if (item.clickEvent) {
    await item.clickEvent();
    return;
  }

  navigateTo(item.href);
};

const sidebarOpen = ref(false);
</script>
