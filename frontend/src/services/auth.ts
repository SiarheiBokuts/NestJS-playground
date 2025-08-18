import { SignUpData } from "@/types/auth";
import axios from "axios";

const API_BASE = "/api";

export const signUp = async (data: SignUpData) => {
  const response = await axios.post(`${API_BASE}/signup`, data);
  return response.data;
};

export const login = async (data: SignUpData) => {
  const response = await axios.post(`${API_BASE}/login`, data);
  return response.data;
};
