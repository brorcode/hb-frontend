import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppNavbar from '~/components/AppNavbar.vue';
import { routePermissions } from '~/config/routePermissions';

const permissionsArray = Array.from(new Set(Object.values(routePermissions)));

mockNuxtImport('usePersistentState', () => {
  return () => ([
    {
      value: {
        permissions: permissionsArray,
      },
    },
  ]);
});

describe('AppMavbar', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppNavbar);

    expect(component.html()).toContain('Статистика');
    expect(component.html()).toContain('Пользователи');
    expect(component.html()).toContain('Категории: Родительские');
    expect(component.html()).toContain('Категории: Дочерние');
    expect(component.html()).toContain('Аккаунты');
    expect(component.html()).toContain('Транзакции');
    expect(component.html()).toContain('Теги');
    expect(component.html()).toContain('Указатели Категорий');
    expect(component.html()).toContain('Долги');
  });
});
