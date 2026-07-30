"use client";

import {
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import type { Burger } from "@/lib/types/burger";

type DeleteItemDialogProps = {
  item: Burger | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteItemDialog({
  item,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteItemDialogProps) {
  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-item-title"
    >
      <div className="w-full rounded-t-3xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-w-md sm:rounded-3xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-400">
            <Trash2 size={20} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="inline-flex size-9 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="delete-item-title"
          className="mt-5 text-lg font-bold text-zinc-950 dark:text-white"
        >
          Delete menu item?
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {item.name}
          </span>{" "}
          will be permanently removed from
          the database. Its Cloudinary image
          will also be deleted.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="h-11 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={16} />
            )}

            {isDeleting
              ? "Deleting..."
              : "Delete Item"}
          </button>
        </div>
      </div>
    </div>
  );
}