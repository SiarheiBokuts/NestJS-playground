"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { Todo } from "@/types/todo";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/todos`;

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
