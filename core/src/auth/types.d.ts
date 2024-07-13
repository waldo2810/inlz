type AccessToken = {
  access_token: string;
};

type AccessTokenPayload = {
  userId: string;
  email: string;
};

type AccessTokenDecoded = {
  email: string;
  id: string;
  iat: number;
  exp: number;
};
