<template>
  <Menu
    as="div"
    class="relative inline-block text-left"
  >
    <div v-if="selectedRows?.length > 0">
      <MenuButton
        data-testid="show-table-actions-button"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Выбрано: {{ selectedRows?.length }}
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="(action, index) in tableActions"
            :key="`table-action-${index}`"
            v-slot="{ active }"
          >
            <a
              href="#"
              :class="[
                active
                  ? colorActiveTextVariants[action.type ?? 'info']
                  : colorTextVariants[action.type ?? 'info'],
                'group flex items-center px-4 py-2 text-sm',
              ]"
              @click="action.action(selectedRows)"
            >
              <component
                :is="action.icon"
                :class="`mr-3 h-5 w-5 ${colorIconVariants[action.type ?? 'info']}`"
                aria-hidden="true"
              />
              {{ action.title }}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

defineProps<{
  selectedRows: number[];
  tableActions?: TableAction[];
}>();

const colorActiveTextVariants = {
  info: 'bg-gray-100 text-gray-900',
  warning: 'bg-yellow-100 text-yellow-900',
  danger: 'bg-red-100 text-red-900',
};

const colorTextVariants = {
  info: 'text-gray-700',
  warning: 'text-yellow-700',
  danger: 'text-red-700',
};

const colorIconVariants = {
  info: 'text-gray-400 group-hover:text-gray-500',
  warning: 'text-yellow-400 group-hover:text-yellow-500',
  danger: 'text-red-400 group-hover:text-red-500',
};
</script>
