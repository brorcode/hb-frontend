type LoginFormFields = {
  email: string;
  password: string;
};
type LoginForm = Form<LoginFormFields>;
type LoginResponse = BaseItemResponse<User>;

type RegisterFormFields = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
type RegisterForm = Form<RegisterFormFields>;

type ForgotPasswordFormFields = {
  email: string;
};
type ForgotPasswordForm = Form<ForgotPasswordFormFields>;

type NewPasswordFormFields = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};
type NewPasswordForm = Form<NewPasswordFormFields>;
