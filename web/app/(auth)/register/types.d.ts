type RegisterUserResponse = {
  access_token: string;
};

type RegisterUserError = {
  message: string;
  error: string;
  statusCode: number;
};
