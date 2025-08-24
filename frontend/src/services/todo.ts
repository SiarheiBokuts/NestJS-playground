import { CreateTodoDto, Todo } from "@/types/todo";
import axios from "axios";
import { withAuthHeader } from "./helpers/withAuthHeader";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/todos`;

export const addTodo = async (
  data: CreateTodoDto,
  token: string
): Promise<Todo> => {
  const response = await axios.post(
    `${API_BASE}`,
    data,

    {
      headers: withAuthHeader(token!),
    }
  );
  return response.data;
};

export const deleteTodo = async (
  todoId: string,
  token: string
): Promise<Todo> => {
  const response = await axios.delete(`${API_BASE}/${todoId}`, {
    headers: withAuthHeader(token!),
  });

  return response.data;
};

export const completeTodo = async (
  todoId: string,
  token: string
): Promise<Todo> => {
  const response = await axios.post(
    `${API_BASE}/${todoId}/complete`,
    {},
    {
      headers: withAuthHeader(token!),
    }
  );

  return response.data;
};
