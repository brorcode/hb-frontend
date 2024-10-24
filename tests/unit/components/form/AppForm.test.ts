import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import AppForm from '~/components/form/AppForm.vue';

mockNuxtImport('goBack', () => {
  return () => vi.fn();
});

describe('AppForm', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: false,
      },
    });

    expect(component.find('form').exists()).toBeTruthy();
    expect(component.html()).toContain('Назад');
    expect(component.html()).toContain('Сохранить');
  });

  it('can run the event on the submit button click', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: false,
      },
    });

    const submitButton = component.find('[data-testid="form-submit-button"]');
    await submitButton.trigger('click');

    expect(component.emitted('submit-form')).toBeTruthy();
  });

  it('can click the back button', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: false,
      },
    });

    const backButton = component.find('[data-testid="form-back-button"]');
    await backButton.trigger('click');
  });

  it('can not see animation when no pending', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: false,
        mode: pageMode.EDIT,
      },
    });

    expect(component.find('.animate-spin').exists()).toBeFalsy();
  });

  it('can see animation when pending', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: true,
        mode: pageMode.EDIT,
      },
    });

    expect(component.find('.animate-spin').exists()).toBeTruthy();
  });

  it('can load slot', async () => {
    const component = await mountSuspended(AppForm, {
      props: {
        backUrl: '/some-url',
        pending: false,
      },
      slots: {
        default: () => '<div>Slot Content</div>',
      },
    });

    expect(component.html()).toContain('Slot Content');
  });
});
