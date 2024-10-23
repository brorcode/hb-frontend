<template>
  <nav class="flex flex-1 flex-col">
    <ul
      role="list"
      class="flex flex-1 flex-col gap-y-7"
    >
      <li>
        <ul
          role="list"
          class="-mx-2 space-y-1"
        >
          <li
            v-for="item in navigation"
            :key="item.name"
          >
            <NuxtLink
              :to="item.href"
              :class="[
                $route.path.includes(item.href)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
              ]"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        <div class="text-xs font-semibold leading-6 text-gray-400">
          Your teams
        </div>
        <ul
          role="list"
          class="-mx-2 mt-2 space-y-1"
        >
          <li
            v-for="team in teams"
            :key="team.name"
          >
            <NuxtLink
              :to="team.href"
              :class="[
                $route.path.includes(team.href)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
              ]"
            ><span
               class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
             >{{ team.initial }}</span>
              <span class="truncate">{{ team.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="mt-auto">
        <a
          href="#"
          class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <Cog6ToothIcon
            class="h-6 w-6 shrink-0"
            aria-hidden="true"
          />
          Settings
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {
  BanknotesIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  FolderIcon,
  HomeIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline';
import { Permission } from '~/config/routePermissions';

const [user] = usePersistentState<User>('user');
const userPermissions = user.value?.permissions ?? [];

const generateNavigationItems = (permission: Permission, href: string, icon: Component, name: string) => {
  return userPermissions.includes(permission)
    ? [{ name, href, icon }]
    : [];
};

const navigation = [
  { name: 'Статистика', href: '/dashboard', icon: HomeIcon },
  ...generateNavigationItems(
    Permission.USERS_VIEW,
    '/users',
    UsersIcon,
    'Пользователи',
  ),
  ...generateNavigationItems(
    Permission.CATEGORIES_VIEW,
    '/categories/parent',
    FolderIcon,
    'Категории: Родительские',
  ),
  ...generateNavigationItems(
    Permission.CATEGORIES_VIEW,
    '/categories/child',
    FolderIcon,
    'Категории: Дочерние',
  ),
  ...generateNavigationItems(
    Permission.ACCOUNTS_VIEW,
    '/accounts',
    CreditCardIcon,
    'Аккаунты',
  ),
  ...generateNavigationItems(
    Permission.TRANSACTIONS_VIEW,
    '/transactions',
    BanknotesIcon,
    'Транзакции',
  ),
  ...generateNavigationItems(
    Permission.TAGS_VIEW,
    '/tags',
    TagIcon,
    'Теги',
  ),
  ...generateNavigationItems(
    Permission.CATEGORY_POINTERS_VIEW,
    '/category-pointers',
    TagIcon,
    'Указатели Категорий',
  ),
  ...generateNavigationItems(
    Permission.LOANS_VIEW,
    '/loans',
    TagIcon,
    'Долги',
  ),
];

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
  { id: 3, name: 'Workcation', href: '#', initial: 'W' },
];
</script>
