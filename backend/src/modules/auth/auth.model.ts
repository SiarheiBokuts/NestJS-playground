export type JwtTokenPayload = {
  email: string;
  id: string;
};

export type AuthResponse = {
  email: string;
  token: string;
};
