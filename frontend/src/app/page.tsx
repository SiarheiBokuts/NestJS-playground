"use client";

import { useState } from "react";
import Modal from "../components/auth/SignUpModal";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth";
import { SignUpData } from "@/types/auth";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { token, email, setAuth } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (data) => {
      setAuth(data.jwtToken, data.email);
      console.log("Sign Up Successful:", data);
      setIsSignUpModalOpen(false);
    },
  });

  const handleSubmit = (data: SignUpData) => {
    console.log("Submitting Sign Up Data:", data);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 gap-8 font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center border-b pb-4 mb-8">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <div className="flex gap-4">
          {token && email ? (
            <span>Logged in as: {email} </span>
          ) : (
            <>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
              </button>
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="w-full max-w-md flex flex-col gap-4">
        <p className="text-center text-gray-600">
          Welcome to your Todo App. Add tasks below!
        </p>

        {/* Example input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-1 border px-3 py-2 rounded"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add
          </button>
        </div>

        {/* Example task list */}
        <ul className="flex flex-col gap-2">
          <li className="flex justify-between items-center border p-2 rounded">
            <span>Example Task 1</span>
            <button className="text-red-500 hover:text-red-700">Delete</button>
          </li>
          <li className="flex justify-between items-center border p-2 rounded">
            <span>Example Task 2</span>
            <button className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        </ul>
      </main>

      {/* Modal */}

      <Modal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={handleSubmit}
        loading={mutation.isPending}
        error={mutation.error}
      />
    </div>
  );
}
