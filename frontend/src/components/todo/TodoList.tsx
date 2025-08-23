"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useTodos } from "@/app/hooks/useTodos";
import { queryClient } from "@/app/query-client";
import { addTodo, deleteTodo } from "@/services/todo";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoList() {
  const { token } = useAuth();
  const { data: todos, isLoading, error } = useTodos();

  const [newTask, setNewTask] = useState("");

  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      return addTodo({ title }, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // reload todo list
      setNewTask("");
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });

  const removeTaskMutation = useMutation({
    mutationFn: async (todoId: string) => {
      return deleteTodo(todoId, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // reload todo list
    },
    onError: (error) => {
      console.error("Error delete task:", error);
      alert("Error deleting task. please try again later");
    },
  });

  if (!token) return <p>Please log in to see your tasks.</p>;

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  if (error)
    return <p className="text-center py-4 text-red-500">Error loading tasks</p>;

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
          placeholder="Add new todo..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={() => addTaskMutation.mutate(newTask)}
          disabled={addTaskMutation.isPending}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <li key={todo.id} className="flex justify-between border p-2 rounded">
            <span>{todo.title}</span>
            <button
              onClick={() => removeTaskMutation.mutate(todo.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
