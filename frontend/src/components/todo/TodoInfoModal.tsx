"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Todo } from "@/types/todo";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
}

export default function TodoInfoModal({ isOpen, onClose, todo }: ModalProps) {
  if (!todo) return null;

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
          <DialogTitle className="text-xl font-bold mb-4">
            Todo info
          </DialogTitle>

          <div className="flex flex-col gap-4">
            <p>
              <span className="font-semibold">ID:</span> {todo.id}
            </p>
            <p>
              <span className="font-semibold">Title:</span> {todo.title}
            </p>
            <p>
              <span className="font-semibold">Completed:</span>
              {todo.isCompleted ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>
              {new Date(todo.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Completed At: </span>
              {todo.completedAt
                ? new Date(todo.completedAt).toLocaleString()
                : "Not completed"}
            </p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
