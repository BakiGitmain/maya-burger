"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

export type StatusFilter =
  | "all"
  | "available"
  | "unavailable"
  | "featured";

export type SortOption =
  | "newest"
  | "oldest"
  | "name"
  | "price-low"
  | "price-high";

type MenuToolbarProps = {
  search: string;
  category: string;
  status: StatusFilter;
  sort: SortOption;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (
    value: string
  ) => void;
  onStatusChange: (
    value: StatusFilter
  ) => void;
  onSortChange: (
    value: SortOption
  ) => void;
};

const inputClass =
  "h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100";

export default function MenuToolbar({
  search,
  category,
  status,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
}: MenuToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 lg:flex-row lg:items-center lg:justify-between dark:border-zinc-800">
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:flex lg:max-w-3xl">
        <label className="relative sm:col-span-2 lg:flex-1">
          <span className="sr-only">
            Search menu items
          </span>

          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Search menu items..."
            className={`${inputClass} w-full pl-10`}
          />
        </label>

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
          className={`${inputClass} lg:w-44`}
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target
                .value as StatusFilter
            )
          }
          className={`${inputClass} lg:w-40`}
        >
          <option value="all">
            All Status
          </option>
          <option value="available">
            Available
          </option>
          <option value="unavailable">
            Unavailable
          </option>
          <option value="featured">
            Featured
          </option>
        </select>
      </div>

      <div className="relative">
        <SlidersHorizontal
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <select
          value={sort}
          onChange={(event) =>
            onSortChange(
              event.target.value as SortOption
            )
          }
          className={`${inputClass} w-full pl-10 lg:w-44`}
        >
          <option value="newest">
            Sort: Newest
          </option>
          <option value="oldest">
            Sort: Oldest
          </option>
          <option value="name">
            Sort: Name
          </option>
          <option value="price-low">
            Price: Low to High
          </option>
          <option value="price-high">
            Price: High to Low
          </option>
        </select>
      </div>
    </div>
  );
}