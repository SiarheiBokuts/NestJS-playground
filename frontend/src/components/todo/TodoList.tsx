"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useTodos } from "@/app/hooks/useTodos";
import { queryClient } from "@/app/query-client";
import { addTodo, completeTodo, deleteTodo } from "@/services/todo";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TodoInfoModal from "./TodoInfoModal";
import { Todo } from "@/types/todo";

export default function TodoList() {
  const { token } = useAuth();
  const { data: todos, isLoading, error } = useTodos();

  const [newTask, setNewTask] = useState("");

  // Todo Info Modal State
  const [isTodoInfoModalOpen, setIsTodoModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Mutations
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

  const completeTaskMutation = useMutation({
    mutationFn: async (todoId: string) => {
      return completeTodo(todoId, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // reload todo list
    },
    onError: (error) => {
      console.error("Error completing task:", error);
      alert("Error completing task. Please try again later.");
    },
  });

  if (!token) return <p>Please log in to see your tasks.</p>;

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  if (error)
    return <p className="text-center py-4 text-red-500">Error loading tasks</p>;

  return (
    <>
      <div>
        <div className="flex gap-2 pb-2">
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
            <li
              key={todo.id}
              className="flex justify-between border p-2 rounded"
            >
              <span>{todo.title}</span>

              <div className="flex">
                {/* Complete */}

                {todo.isCompleted ? null : (
                  <button
                    onClick={() => completeTaskMutation.mutate(todo.id)}
                    className="text-green-500 hover:text-green-700 cursor-pointer flex items-center w-5 h-5 mr-2"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}

                {/* Info */}
                <button
                  onClick={() => {
                    setSelectedTodo(todo);
                    setIsTodoModalOpen(true);
                  }}
                  className="text-neutral-500 hover:text-neutral-700 cursor-pointer flex items-center w-5 h-5 mr-2"
                >
                  <InformationCircleIcon className="w-5 h-5" />
                </button>

                {/* Remove */}
                <button
                  onClick={() => removeTaskMutation.mutate(todo.id)}
                  className="text-rose-500 hover:text-rose-700 cursor-pointer w-5 h-5"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <TodoInfoModal
        isOpen={isTodoInfoModalOpen}
        todo={selectedTodo!}
        onClose={() => setIsTodoModalOpen(false)}
      />
    </>
  );
}
