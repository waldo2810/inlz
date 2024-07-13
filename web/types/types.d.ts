type User = {
  name: string;
  email: string;
  password: string;
};

type DecodedTokenResponse = {
  email: string;
  id: string;
  iat: number;
  exp: number;
};
