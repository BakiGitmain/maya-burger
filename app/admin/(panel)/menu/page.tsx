"use client";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import DeleteItemDialog from "@/components/admin/menu/delete-item-dialog";
import MenuHeader from "@/components/admin/menu/menu-header";
import MenuStats from "@/components/admin/menu/menu-stats";
import MenuTable from "@/components/admin/menu/menu-table";
import MenuToolbar, {
  type SortOption,
  type StatusFilter,
} from "@/components/admin/menu/menu-toolbar";

import {
  deleteBurger,
  getBurgers,
} from "@/lib/api/burgers";

import type { Burger } from "@/lib/types/burger";

const pageSize = 8;

export default function MenuManagementPage() {
  const [burgers, setBurgers] = useState<
    Burger[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [status, setStatus] =
    useState<StatusFilter>("all");

  const [sort, setSort] =
    useState<SortOption>("newest");

  const [page, setPage] = useState(1);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState<Burger | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    getBurgers()
      .then((items) => {
        if (!cancelled) {
          setBurgers(items);
          setError(null);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load the menu."
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
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        burgers
          .map(
            (burger) => burger.category
          )
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [burgers]);

  const filteredBurgers = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    const filtered = burgers.filter(
      (burger) => {
        const matchesSearch =
          !searchValue ||
          burger.name
            .toLowerCase()
            .includes(searchValue) ||
          burger.description
            ?.toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          category === "all" ||
          burger.category === category;

        const matchesStatus =
          status === "all" ||
          (status === "available" &&
            burger.isAvailable) ||
          (status === "unavailable" &&
            !burger.isAvailable) ||
          (status === "featured" &&
            burger.isFeatured);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      }
    );

    return [...filtered].sort(
      (first, second) => {
        if (sort === "oldest") {
          return first.id - second.id;
        }

        if (sort === "name") {
          return first.name.localeCompare(
            second.name
          );
        }

        if (sort === "price-low") {
          return (
            Number(first.price) -
            Number(second.price)
          );
        }

        if (sort === "price-high") {
          return (
            Number(second.price) -
            Number(first.price)
          );
        }

        return second.id - first.id;
      }
    );
  }, [
    burgers,
    search,
    category,
    status,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBurgers.length / pageSize
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedBurgers =
    filteredBurgers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  function resetToFirstPage() {
    setPage(1);
  }

  async function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteBurger(deleteTarget.id);

      setBurgers((current) =>
        current.filter(
          (burger) =>
            burger.id !== deleteTarget.id
        )
      );

      setDeleteTarget(null);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to delete the item."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-full bg-zinc-50 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <MenuHeader />

        <MenuStats burgers={burgers} />

        {error && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-red-900 dark:bg-red-950/40">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
              />

              <p className="text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="inline-flex items-center gap-2 self-start rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 sm:self-auto dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <MenuToolbar
            search={search}
            category={category}
            status={status}
            sort={sort}
            categories={categories}
            onSearchChange={(value) => {
              setSearch(value);
              resetToFirstPage();
            }}
            onCategoryChange={(value) => {
              setCategory(value);
              resetToFirstPage();
            }}
            onStatusChange={(value) => {
              setStatus(value);
              resetToFirstPage();
            }}
            onSortChange={(value) => {
              setSort(value);
              resetToFirstPage();
            }}
          />

          <MenuTable
            items={paginatedBurgers}
            loading={loading}
            page={currentPage}
            pageSize={pageSize}
            totalCount={
              filteredBurgers.length
            }
            totalPages={totalPages}
            onPageChange={setPage}
            onDelete={setDeleteTarget}
          />
        </section>
      </div>

      <DeleteItemDialog
        item={deleteTarget}
        isDeleting={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}