import {
  Boxes,
  PackageCheck,
  PackageX,
  Star,
  Tags,
} from "lucide-react";

import type { Burger } from "@/lib/types/burger";

type MenuStatsProps = {
  burgers: Burger[];
};

export default function MenuStats({
  burgers,
}: MenuStatsProps) {
  const featuredItems = burgers.filter(
    (burger) => burger.isFeatured
  ).length;

  const availableItems = burgers.filter(
    (burger) => burger.isAvailable
  ).length;

  const unavailableItems =
    burgers.length - availableItems;

  const categoryCount = new Set(
    burgers.map((burger) => burger.category)
  ).size;

  const cards = [
    {
      label: "Total Items",
      value: burgers.length,
      helper: "Across your menu",
      icon: Boxes,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
    },
    {
      label: "Featured",
      value: featuredItems,
      helper: "Shown as featured",
      icon: Star,
      iconClass:
        "bg-orange-100 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300",
    },
    {
      label: "Categories",
      value: categoryCount,
      helper: "Menu categories",
      icon: Tags,
      iconClass:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    },
    {
      label: "Available",
      value: availableItems,
      helper: "Ready to display",
      icon: PackageCheck,
      iconClass:
        "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
    },
    {
      label: "Unavailable",
      value: unavailableItems,
      helper: "Currently hidden",
      icon: PackageX,
      iconClass:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${card.iconClass}`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {card.label}
                </p>

                <p className="mt-0.5 text-xl font-bold text-zinc-950 dark:text-white">
                  {card.value}
                </p>

                <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
                  {card.helper}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}