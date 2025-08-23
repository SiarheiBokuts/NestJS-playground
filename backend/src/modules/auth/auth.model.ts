export type JwtTokenPayload = {
  email: string;
  id: string;
};

export type JwtTokenData = JwtTokenPayload & {
  iat: number;
  exp?: number;
};

export type AuthResponse = {
  email: string;
  token: string;
};
