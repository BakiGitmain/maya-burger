"use client";

import Link from "next/link";
import {
  AlertCircle,
  ChevronLeft,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import ImageUpload from "./image-upload";

import {
  createBurger,
  updateBurger,
} from "@/lib/api/burgers";

import type {
  Burger,
  BurgerFormMode,
} from "@/lib/types/burger";

type BurgerFormProps = {
  mode: BurgerFormMode;
  burgerId?: number;
  initialData?: Burger;
};

const categories = [
  "Burgers",
  "Chicken",
  "Sides",
  "Drinks",
  "Desserts",
  "Combos",
];

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

const cardClass =
  "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900";

export default function BurgerForm({
  mode,
  burgerId,
  initialData,
}: BurgerFormProps) {
  const router = useRouter();

  const [name, setName] = useState(
    initialData?.name ?? ""
  );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [price, setPrice] = useState(
    initialData?.price ?? ""
  );

  const [category, setCategory] =
    useState(
      initialData?.category ?? "Burgers"
    );

  const [
    isAvailable,
    setIsAvailable,
  ] = useState(
    initialData?.isAvailable ?? true
  );

  const [
    isFeatured,
    setIsFeatured,
  ] = useState(
    initialData?.isFeatured ?? false
  );

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [
    removeCurrentImage,
    setRemoveCurrentImage,
  ] = useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const isEditing = mode === "edit";

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanDescription =
      description.trim();
    const numericPrice = Number(price);

    if (
      cleanName.length < 2 ||
      cleanName.length > 120
    ) {
      setError(
        "Burger name must be between 2 and 120 characters."
      );
      return;
    }

    if (
      cleanDescription.length > 500
    ) {
      setError(
        "Description cannot exceed 500 characters."
      );
      return;
    }

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      setError(
        "Enter a valid price greater than zero."
      );
      return;
    }

    if (
      isEditing &&
      (!burgerId ||
        !Number.isInteger(burgerId))
    ) {
      setError(
        "The burger ID is invalid."
      );
      return;
    }

    const formData = new FormData();

    formData.append("name", cleanName);
    formData.append(
      "description",
      cleanDescription
    );
    formData.append(
      "price",
      numericPrice.toFixed(2)
    );
    formData.append(
      "category",
      category
    );
    formData.append(
      "isAvailable",
      String(isAvailable)
    );
    formData.append(
      "isFeatured",
      String(isFeatured)
    );
    formData.append(
      "removeImage",
      String(removeCurrentImage)
    );

    if (imageFile) {
      formData.append(
        "image",
        imageFile
      );
    }

    setIsSubmitting(true);

    try {
      if (isEditing && burgerId) {
        await updateBurger(
          burgerId,
          formData
        );
      } else {
        await createBurger(formData);
      }

      router.push("/admin/menu");
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save the burger."
      );

      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/menu"
            className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Back to menu"
          >
            <ChevronLeft size={18} />
          </Link>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              Menu Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              {isEditing
                ? "Edit Menu Item"
                : "Add New Menu Item"}
            </h1>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {isEditing
                ? "Update the burger information and image."
                : "Create a new item for your restaurant menu."}
            </p>
          </div>
        </div>

        <div className="hidden gap-3 sm:flex">
          <Link
            href="/admin/menu"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Save size={17} />
            )}

            {isSubmitting
              ? "Saving..."
              : "Save Item"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>{error}</p>
        </div>
      )}

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <div className="space-y-5">
          <section className={cardClass}>
            <div className="mb-5">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                The main information shown to
                visitors.
              </p>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Item Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </span>

                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  maxLength={120}
                  placeholder="e.g. Maya Classic Burger"
                  className={inputClass}
                />

                <span className="mt-1.5 block text-right text-[11px] text-zinc-400">
                  {name.length}/120
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Description
                </span>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  maxLength={500}
                  rows={6}
                  placeholder="Describe the ingredients, taste and other important details..."
                  className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />

                <span className="mt-1.5 block text-right text-[11px] text-zinc-400">
                  {description.length}/500
                </span>
              </label>
            </div>
          </section>

          <section className={cardClass}>
            <div className="mb-5">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Pricing and Category
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Set the selling price and menu
                category.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Price
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </span>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 mt-1 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    ETB
                  </span>

                  <input
                    type="number"
                    value={price}
                    onChange={(event) =>
                      setPrice(
                        event.target.value
                      )
                    }
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Category
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className={inputClass}
                >
                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className={cardClass}>
            <div className="mb-5">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Item Image
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Upload a clear photo with a
                simple background.
              </p>
            </div>

            <ImageUpload
              file={imageFile}
              currentImageUrl={
                initialData?.imageUrl
              }
              removeCurrent={
                removeCurrentImage
              }
              onFileChange={setImageFile}
              onRemoveCurrentChange={
                setRemoveCurrentImage
              }
            />
          </section>

          <section className={cardClass}>
            <div className="mb-5">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Item Status
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Control where this item appears.
              </p>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Availability
                </span>

                <select
                  value={String(
                    isAvailable
                  )}
                  onChange={(event) =>
                    setIsAvailable(
                      event.target.value ===
                        "true"
                    )
                  }
                  className={inputClass}
                >
                  <option value="true">
                    Available
                  </option>

                  <option value="false">
                    Unavailable
                  </option>
                </select>

                <span className="mt-2 block text-xs text-zinc-500 dark:text-zinc-400">
                  Unavailable items can remain
                  saved without appearing as
                  available.
                </span>
              </label>

              <div className="flex items-center justify-between gap-5 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={16}
                      className="text-amber-500"
                    />

                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Featured Item
                    </p>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    Highlight this burger in
                    featured sections.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isFeatured}
                  onClick={() =>
                    setIsFeatured(
                      (current) => !current
                    )
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    isFeatured
                      ? "bg-amber-400"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition ${
                      isFeatured
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="sticky bottom-3 z-20 flex gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:hidden dark:border-zinc-800 dark:bg-zinc-900/95">
        <Link
          href="/admin/menu"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-bold text-zinc-950 disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Save size={17} />
          )}

          {isSubmitting
            ? "Saving..."
            : "Save Item"}
        </button>
      </div>
    </form>
  );
}