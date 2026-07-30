"use client";

import Link from "next/link";
import {
  AlertCircle,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

import BurgerForm from "@/components/admin/menu/burger-form";

import { getBurger } from "@/lib/api/burgers";

import type { Burger } from "@/lib/types/burger";

export default function EditMenuItemPage() {
  const params = useParams<{
    id: string;
  }>();

  const burgerId = Number(params.id);

  const [burger, setBurger] =
    useState<Burger | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (
      !Number.isInteger(burgerId) ||
      burgerId <= 0
    ) {
      return;
    }

    let cancelled = false;

    getBurger(burgerId)
      .then((item) => {
        if (!cancelled) {
          setBurger(item);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load this item."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [burgerId]);

  if (
    !Number.isInteger(burgerId) ||
    burgerId <= 0
  ) {
    return (
      <ErrorState message="The burger ID is invalid." />
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center gap-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          <Loader2
            size={20}
            className="animate-spin text-amber-500"
          />
          Loading menu item...
        </div>
      </div>
    );
  }

  if (error || !burger) {
    return (
      <ErrorState
        message={
          error ??
          "This menu item could not be found."
        }
      />
    );
  }

  return (
    <div className="min-h-full bg-zinc-50 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1400px]">
        <BurgerForm
          mode="edit"
          burgerId={burgerId}
          initialData={burger}
        />
      </div>
    </div>
  );
}

function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-400">
          <AlertCircle size={22} />
        </div>

        <h1 className="mt-4 text-lg font-bold text-zinc-950 dark:text-white">
          Unable to open item
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {message}
        </p>

        <Link
          href="/admin/menu"
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-bold text-white dark:bg-white dark:text-zinc-950"
        >
          <ChevronLeft size={17} />
          Back to Menu
        </Link>
      </div>
    </div>
  );
}