"use client";

import Link from "next/link";
import {
  ImageIcon,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import type { Burger } from "@/lib/types/burger";

type MenuItemRowProps = {
  burger: Burger;
  layout: "desktop" | "mobile";
  onDelete: (burger: Burger) => void;
};

function formatPrice(price: string) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return price;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(value);
}

function BurgerImage({
  burger,
  size = "large",
}: {
  burger: Burger;
  size?: "small" | "large";
}) {
  const sizeClass =
    size === "large"
      ? "size-16"
      : "size-12";

  if (!burger.imageUrl) {
    return (
      <div
        className={`
          flex
          ${sizeClass}
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-zinc-100
          text-zinc-400
          dark:bg-zinc-800
        `}
      >
        <ImageIcon size={20} />
      </div>
    );
  }

  return (
    <img
      src={burger.imageUrl}
      alt={burger.name}
      loading="lazy"
      className={`
        ${sizeClass}
        shrink-0
        rounded-xl
        object-cover
      `}
    />
  );
}

export default function MenuItemRow({
  burger,
  layout,
  onDelete,
}: MenuItemRowProps) {
  const statusClass = burger.isAvailable
    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-300"
    : "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-300";

  if (layout === "mobile") {
    return (
      <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex gap-3">
          <BurgerImage
            burger={burger}
            size="large"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                  {burger.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  {burger.description ||
                    "No description"}
                </p>
              </div>

              <Star
                size={18}
                className={
                  burger.isFeatured
                    ? "shrink-0 text-amber-400"
                    : "shrink-0 text-zinc-300 dark:text-zinc-700"
                }
                fill={
                  burger.isFeatured
                    ? "currentColor"
                    : "none"
                }
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                {burger.category}
              </span>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  px-2
                  py-1
                  text-[11px]
                  font-semibold
                  ring-1
                  ring-inset
                  ${statusClass}
                `}
              >
                <span className="size-1.5 rounded-full bg-current" />

                {burger.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <p className="text-sm font-bold text-zinc-950 dark:text-white">
            {formatPrice(burger.price)}
          </p>

          <div className="flex gap-2">
            <Link
              href={`/admin/menu/${burger.id}/edit`}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label={`Edit ${burger.name}`}
            >
              <Pencil size={15} />
            </Link>

            <button
              type="button"
              onClick={() => onDelete(burger)}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              aria-label={`Delete ${burger.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <tr className="border-b border-zinc-100 transition last:border-0 hover:bg-zinc-50/70 dark:border-zinc-800 dark:hover:bg-zinc-800/40">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <BurgerImage
            burger={burger}
            size="small"
          />

          <div className="min-w-0">
            <p className="max-w-[240px] truncate text-sm font-bold text-zinc-950 dark:text-white">
              {burger.name}
            </p>

            <p className="mt-1 max-w-[280px] truncate text-xs text-zinc-500 dark:text-zinc-400">
              {burger.description ||
                "No description"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
          {burger.category}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {formatPrice(burger.price)}
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold
            ring-1
            ring-inset
            ${statusClass}
          `}
        >
          <span className="size-1.5 rounded-full bg-current" />

          {burger.isAvailable
            ? "Available"
            : "Unavailable"}
        </span>
      </td>

      <td className="px-5 py-4">
        <Star
          size={19}
          className={
            burger.isFeatured
              ? "text-amber-400"
              : "text-zinc-300 dark:text-zinc-700"
          }
          fill={
            burger.isFeatured
              ? "currentColor"
              : "none"
          }
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/menu/${burger.id}/edit`}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label={`Edit ${burger.name}`}
          >
            <Pencil size={15} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(burger)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            aria-label={`Delete ${burger.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}