type Project = {
  name: string;
  description?: string;
};

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
