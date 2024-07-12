type LoginUserResponse = {
  access_token: string;
};

type LoginUserError = {
  message: string;
  error: string;
  statusCode: number;
};
