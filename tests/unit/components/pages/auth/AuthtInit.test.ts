import { describe, expect, it } from 'vitest';
import { forgotPasswordFormInit, loginFormInit, newPasswordFormInit, registerFormInit } from '~/components/pages/auth/AuthInit';

describe('AuthInit', () => {
  it('should export correct login form data', () => {
    expect(loginFormInit).toEqual({
      email: { key: 'email', value: '', label: 'Email', errors: [] },
      password: { key: 'password', value: '', label: 'Пароль', errors: [] },
    });
  });

  it('should export correct register form data', () => {
    expect(registerFormInit).toEqual({
      name: { key: 'name', value: '', label: 'Имя', errors: [] },
      email: { key: 'email', value: '', label: 'Email', errors: [] },
      password: { key: 'password', value: '', label: 'Пароль', errors: [] },
      password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
    });
  });

  it('should export correct forgot password form data', () => {
    expect(forgotPasswordFormInit).toEqual({
      email: { key: 'email', value: '', label: 'Email', errors: [] },
    });
  });

  it('should export correct new password form data', () => {
    expect(newPasswordFormInit).toEqual({
      token: { key: 'token', value: '', label: 'Token', errors: [] },
      email: { key: 'email', value: '', label: 'Email', errors: [] },
      password: { key: 'password', value: '', label: 'Пароль', errors: [] },
      password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
    });
  });
});
