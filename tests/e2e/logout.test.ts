import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('Logout Page', () => {
  test('can logout', async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();

    // Set up local storage before navigating to the page
    await context.addInitScript(() => {
      const user = { name: 'Test User', email: 'test@example.com' };
      localStorage.setItem('user', JSON.stringify(user));
    });

    // Create a new page in the context
    const page = await context.newPage();

    await page.route('*/**/api/v1/profile', async (route) => {
      const json = {
        data: {
          id: 1,
          name: 'Test User',
          email: 'test@test.test',
          created_at: '2024-08-07T09:47:05.000000Z',
          updated_at: '2024-08-08T09:47:05.000000Z',
        },
      };
      await route.fulfill({ json });
    });

    await page.context().addCookies([
      {
        name: 'XSRF-TOKEN',
        value: 'some_token',
        path: '/',
        domain: '127.0.0.1',
      },
    ]);

    // Mock the API call before navigating
    await page.route('*/**/api/v1/logout', async (route) => {
      await route.fulfill({ status: 204 });
    });

    await page.goto('/profile');

    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Выйти' }).click();

    await expect(page).toHaveURL('/login');
  });
});
