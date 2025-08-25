"use client";

import { useAuth } from "./context/AuthContext";
import TodoList from "@/components/todo/TodoList";
import AppHeader from "@/components/header/AppHeader";

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 gap-8 font-sans">
      {/* Header */}
      <AppHeader />

      {/* Main content */}
      <main className="w-full max-w-md flex flex-col gap-4">
        {token ? (
          <div>
            <p className="text-center text-gray-600">
              Welcome to your Todo App. Add tasks below!
            </p>
            <TodoList />
          </div>
        ) : (
          <p className="text-center text-gray-600">Log in to see your Todos</p>
        )}
      </main>
    </div>
  );
}
