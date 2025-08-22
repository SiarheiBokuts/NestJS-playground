export interface SignUpData {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  token: string;
}

export interface AuthState {
  token: string | null;
  email: string | null;
}
