"use client";
import { SignUpData } from "@/types/auth";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SignUpData) => void;
  loading?: boolean;
  error?: Error | null;
}

export default function LoginModal({
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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
    >
      {/* Overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          <DialogTitle className="text-xl font-bold mb-4">Login</DialogTitle>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            {error && (
              <p className="text-red-500 text-sm">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(error as any)?.response?.data?.message ||
                  "Something went wrong"}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 cursor-pointer rounded text-white ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                Login
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
