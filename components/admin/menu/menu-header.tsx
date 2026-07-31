import Link from "next/link";
import {
  ExternalLink,
  Plus,
} from "lucide-react";

type MenuHeaderProps = {
  activeView: "items" | "digital";
};

export default function MenuHeader({
  activeView,
}: MenuHeaderProps) {
  const digitalView =
    activeView === "digital";

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
          {digitalView
            ? "Digital Menu"
            : "Restaurant Content"}
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
          {digitalView
            ? "QR Menu Management"
            : "Menu Management"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {digitalView
            ? "Create, preview, download and print the QR code customers use to open your public menu."
            : "Manage burger details, prices, availability, images and featured items."}
        </p>
      </div>

      <div className="flex w-full gap-3 sm:w-auto">
        <Link
          href="/menu"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 sm:flex-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Preview Menu
          <ExternalLink size={16} />
        </Link>

        {!digitalView && (
          <Link
            href="/admin/menu/new"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-bold text-zinc-950 shadow-sm transition hover:bg-amber-300 sm:flex-none"
          >
            <Plus size={17} />
            Add New Item
          </Link>
        )}
      </div>
    </div>
  );
}