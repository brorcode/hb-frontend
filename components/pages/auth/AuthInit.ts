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

export { loginFormInit, registerFormInit };
