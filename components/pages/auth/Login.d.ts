type LoginFormFields = {
  email: string;
  password: string;
};

type LoginForm = Form<LoginFormFields>;

type LoginResponse = BaseItemResponse<User>;
