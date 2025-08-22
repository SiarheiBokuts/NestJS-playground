"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const API_BASE = "http://localhost:4200/todos";

export const useTodos = () => {
  const { token } = useAuth();

  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(API_BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });

  return { data, error, isLoading };
};
