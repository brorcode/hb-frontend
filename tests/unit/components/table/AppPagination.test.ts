import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import AppPagination from '~/components/table/AppPagination.vue';

describe('AppPagination', () => {
  it('can render the component', async () => {
    const component = await mountSuspended(AppPagination, {
      props: {
        hasNextPage: true,
        perPage: 10,
      },
    });

    expect(component.html()).not.toContain('Назад');
    expect(component.html()).toContain('Дальше');
  });

  it('can emit page change event', async () => {
    const component = await mountSuspended(AppPagination, {
      props: {
        hasNextPage: true,
        perPage: 10,
      },
    });

    const button = component.find('[data-testid="next-page-button"]');
    await button.trigger('click');

    expect(component.emitted('pageChange')).toBeTruthy();
  });

  it('can emit per page change event', async () => {
    const component = await mountSuspended(AppPagination, {
      props: {
        hasNextPage: true,
        perPage: 10,
      },
    });

    const select = component.find('.multiselect');
    await select.trigger('click');
    const selectOptions = component.findAll('.multiselect-option');
    await selectOptions.at(1)?.trigger('click');

    expect(component.emitted('perPageChange')).toBeTruthy();
  });
});
