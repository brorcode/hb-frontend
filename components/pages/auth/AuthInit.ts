const loginFormInit: LoginForm = {
  email: { key: 'email', value: '', label: 'Email', errors: [] },
  password: { key: 'password', value: '', label: 'Пароль', errors: [] },
};

const registerFormInit: RegisterForm = {
  name: { key: 'name', value: '', label: 'Имя', errors: [] },
  email: { key: 'email', value: '', label: 'Email', errors: [] },
  password: { key: 'password', value: '', label: 'Пароль', errors: [] },
  password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
};

const forgotPasswordFormInit: ForgotPasswordForm = {
  email: { key: 'email', value: '', label: 'Email', errors: [] },
};

const newPasswordFormInit: NewPasswordForm = {
  token: { key: 'token', value: '', label: 'Token', errors: [] },
  email: { key: 'email', value: '', label: 'Email', errors: [] },
  password: { key: 'password', value: '', label: 'Пароль', errors: [] },
  password_confirmation: { key: 'password_confirmation', value: '', label: 'Введите пароль еще раз', errors: [] },
};

export { loginFormInit, registerFormInit, forgotPasswordFormInit, newPasswordFormInit };
