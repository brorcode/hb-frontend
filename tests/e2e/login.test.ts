import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('Login Page', () => {
  test('contains title', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading')).toHaveText('Contact sales');
  });

  test('displays validation error on empty fields', async ({ page }) => {
    // Mock the API call before navigating
    await page.route('*/**/sanctum/csrf-cookie', async (route) => {
      await route.fulfill({ status: 201 });
    });
    await page.route('*/**/api/v1/login', async (route) => {
      const json = {
        message: 'Заполните форму правильно.',
        errors: {
          email: ['Поле email обязательно.'],
          password: ['Поле пароль обязательно.']
        }
      };
      await route.fulfill({ json, status: 422 });
    });

    await page.goto('/login');

    await expect(page.getByText('Заполните форму правильно.')).not.toBeVisible();
    await expect(page.getByText('Поле email обязательно.')).not.toBeVisible();
    await expect(page.getByText('Поле пароль обязательно.')).not.toBeVisible();

    await page.getByTestId('form-submit-button').click();

    await expect(page.getByText('Заполните форму правильно.')).toBeVisible();
    await expect(page.getByText('Поле email обязательно.')).toBeVisible();
    await expect(page.getByText('Поле пароль обязательно.')).toBeVisible();
  });

  test('redirects to users on successful login', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'XSRF-TOKEN',
        value: 'some_token',
        path: '/',
        domain: '127.0.0.1'
      }
    ]);

    // Mock the API call before navigating
    await page.route('*/**/sanctum/csrf-cookie', async (route) => {
      await route.fulfill({ status: 201 });
    });
    await page.route('*/**/api/v1/login', async (route) => {
      const json = {
        name: 'Test',
        email: 'test@test.test'
      };
      await route.fulfill({ json });
    });

    await page.route('*/**/api/v1/users', async (route) => {
      const json = {
        data: [
          {
            id: 1,
            name: 'Test User',
            email: 'test@test.test',
            createdAt: '2024-08-07T09:47:05.000000Z',
            updatedAt: '2024-08-08T09:47:05.000000Z'
          }
        ],
        meta: {
          perPage: 10,
          currentPage: 1,
          hasNextPage: false
        }
      };
      await route.fulfill({ json });
    });

    await page.goto('/login');

    await page.getByTestId('form-email').fill('test@test.test');
    await page.getByTestId('form-password').fill('password');

    await page.getByTestId('form-submit-button').click();

    await expect(page).toHaveURL('/users');
    await expect(page.getByText('test@test.test')).toBeVisible();
    await expect(page.getByText('07-08-2024 09:47:05')).toBeVisible();
    await expect(page.getByText('08-08-2024 09:47:05')).toBeVisible();
  });
});
