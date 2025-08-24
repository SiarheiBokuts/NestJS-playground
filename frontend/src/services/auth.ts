import { AuthResponse, SignUpData } from "@/types/auth";
import axios from "axios";
import { withAuthHeader } from "./helpers/withAuthHeader";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  // Simulate a delay for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await axios.post(`${API_BASE}/register`, data);
  return response.data;
};

export const login = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE}/login`, data);
  return response.data;
};

export const validateToken = async (
  token: string
): Promise<Omit<AuthResponse, "token">> => {
  const response = await axios.post(`${API_BASE}/validate`, null, {
    headers: withAuthHeader(token!),
  });
  return response.data;
};
