"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose?: () => void;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose ?? (() => {})}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
    >
      {/* Overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          <DialogTitle className="text-xl font-bold mb-4">
            Confirmation
          </DialogTitle>

          <p className="mb-6">{message}</p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                onCancel?.();
                onClose?.();
              }}
            >
              No
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              onClick={() => {
                onConfirm();
                onClose?.();
              }}
            >
              Yes
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
