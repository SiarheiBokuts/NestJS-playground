import { CreateTodoDto, Todo } from "@/types/todo";
import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/todos`;

export const addTodo = async (
  data: CreateTodoDto,
  token: string
): Promise<Todo> => {
  const response = await axios.post(
    `${API_BASE}`,
    data,

    {
      headers: {
        Authorization: `Bearer ${token}`, // если нужно
      },
    }
  );
  return response.data;
};
