"use client";
import { SignUpData } from "@/types/auth";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SignUpData) => void;
  loading?: boolean;
  error?: Error | null;
}

export default function SignUpModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
}: ModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded"
          />
          {error && (
            <p className="text-red-500 text-sm">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(error as any)?.response?.data?.message ||
                "Something went wrong"}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
