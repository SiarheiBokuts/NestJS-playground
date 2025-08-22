"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useTodos } from "@/app/hooks/useTodos";

export default function TodoList() {
  const { token } = useAuth();
  const { data: todos, isLoading, error } = useTodos();

  if (!token) return <p>Please log in to see your tasks.</p>;

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  if (error)
    return <p className="text-center py-4 text-red-500">Error loading tasks</p>;

  return (
    <ul className="flex flex-col gap-2">
      {todos?.map((todo) => (
        <li key={todo.id} className="flex justify-between border p-2 rounded">
          <span>{todo.text}</span>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </li>
      ))}
    </ul>
  );
}
