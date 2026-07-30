"use client";

import {
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";

import MenuItemRow from "./menu-item-row";

import type { Burger } from "@/lib/types/burger";

type MenuTableProps = {
  items: Burger[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (burger: Burger) => void;
};

function LoadingState() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map(
        (_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800"
          />
        )
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
        <PackageOpen size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-zinc-950 dark:text-white">
        No menu items found
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Try changing your search or
        filters, or add a new menu item.
      </p>
    </div>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
) {
  const pages = new Set<number>();

  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage - 1);
  pages.add(currentPage);
  pages.add(currentPage + 1);

  return Array.from(pages)
    .filter(
      (page) =>
        page >= 1 && page <= totalPages
    )
    .sort((a, b) => a - b);
}

export default function MenuTable({
  items,
  loading,
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onDelete,
}: MenuTableProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  const firstItem =
    (page - 1) * pageSize + 1;

  const lastItem = Math.min(
    page * pageSize,
    totalCount
  );

  const visiblePages = getVisiblePages(
    page,
    totalPages
  );

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/70 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
              <th className="px-5 py-4">
                Item
              </th>
              <th className="px-5 py-4">
                Category
              </th>
              <th className="px-5 py-4">
                Price
              </th>
              <th className="px-5 py-4">
                Status
              </th>
              <th className="px-5 py-4">
                Featured
              </th>
              <th className="px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((burger) => (
              <MenuItemRow
                key={burger.id}
                burger={burger}
                layout="desktop"
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {items.map((burger) => (
          <MenuItemRow
            key={burger.id}
            burger={burger}
            layout="mobile"
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {firstItem}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {lastItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {totalCount}
          </span>{" "}
          items
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              onPageChange(page - 1)
            }
            className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {visiblePages.map(
            (visiblePage, index) => {
              const previous =
                visiblePages[index - 1];

              const showGap =
                previous !== undefined &&
                visiblePage - previous > 1;

              return (
                <div
                  key={visiblePage}
                  className="flex items-center gap-1"
                >
                  {showGap && (
                    <span className="px-1 text-zinc-400">
                      …
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      onPageChange(
                        visiblePage
                      )
                    }
                    className={
                      visiblePage === page
                        ? "inline-flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950"
                        : "inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }
                  >
                    {visiblePage}
                  </button>
                </div>
              );
            }
          )}

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() =>
              onPageChange(page + 1)
            }
            className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}