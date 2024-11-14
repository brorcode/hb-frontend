import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import DashboardStat from '~/components/pages/dashboard/DashboardStat.vue';

describe('DashboardStat', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(DashboardStat, {
      props: {
        data: [],
        title: 'some title',
        total: 77,
        itemKey: 'itemKey',
      },
    });

    expect(component.html()).toContain('some title');
    expect(component.html()).toContain('77,00');
    expect(component.html()).toContain('Нет данных за выбранный период');
  });

  it('can emit show transactions event on click', async () => {
    const component = await mountSuspended(DashboardStat, {
      props: {
        data: [
          {
            id: 1,
            month: 'Январь 2022',
            total: 77,
            percentage: 55.44,
          },
        ],
        title: 'some title',
        total: 77,
        itemKey: 'itemKey',
      },
    });

    expect(component.html()).toContain('some title');
    expect(component.html()).toContain('77,00');
    expect(component.html()).toContain('Январь 2022');
    expect(component.html()).toContain('55.44%');

    const button = component.find('[data-testid="show-transactions-button"]');
    await button.trigger('click');

    expect(component.emitted('showTransactions')).toBeTruthy();
  });
});
