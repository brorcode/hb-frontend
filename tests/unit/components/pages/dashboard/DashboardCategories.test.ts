import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import DashboardCategories from '~/components/pages/dashboard/DashboardCategories.vue';

describe('DashboardCategories', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(DashboardCategories, {
      props: {
        data: [],
        title: 'some title',
        itemKey: 'itemKey',
      },
    });

    expect(component.html()).toContain('some title');
    expect(component.html()).toContain('Нет данных за выбранный период');
  });

  it('can emit show transactions event on click', async () => {
    const component = await mountSuspended(DashboardCategories, {
      props: {
        data: [
          {
            id: 1,
            title: 'Январь 2022',
            total: 77,
          },
        ],
        title: 'some title',
        itemKey: 'itemKey',
      },
    });

    expect(component.html()).toContain('some title');
    expect(component.html()).toContain('77,00');
    expect(component.html()).toContain('Январь 2022');

    const button = component.find('[data-testid="show-transactions-button"]');
    await button.trigger('click');

    expect(component.emitted('showTransactions')).toBeTruthy();
  });
});
