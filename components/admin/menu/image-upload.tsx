"use client";

import {
  ImageIcon,
  UploadCloud,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ImageUploadProps = {
  file: File | null;
  currentImageUrl?: string | null;
  removeCurrent: boolean;
  onFileChange: (
    file: File | null
  ) => void;
  onRemoveCurrentChange: (
    value: boolean
  ) => void;
};

const acceptedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const maximumSize =
  5 * 1024 * 1024;

export default function ImageUpload({
  file,
  currentImageUrl,
  removeCurrent,
  onFileChange,
  onRemoveCurrentChange,
}: ImageUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const localPreviewUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(
          localPreviewUrl
        );
      }
    };
  }, [localPreviewUrl]);

  const displayedImage =
    localPreviewUrl ??
    (!removeCurrent
      ? currentImageUrl
      : null);

  function selectFile(
    selectedFile?: File
  ) {
    setError(null);

    if (!selectedFile) {
      return;
    }

    if (
      !acceptedTypes.has(
        selectedFile.type
      )
    ) {
      setError(
        "Use a PNG, JPG or WEBP image."
      );
      return;
    }

    if (
      selectedFile.size > maximumSize
    ) {
      setError(
        "The image must be smaller than 5MB."
      );
      return;
    }

    onRemoveCurrentChange(false);
    onFileChange(selectedFile);
  }

  function handleRemove() {
    setError(null);

    if (file) {
      onFileChange(null);
      return;
    }

    if (currentImageUrl) {
      onRemoveCurrentChange(true);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          selectFile(
            event.target.files?.[0]
          );

          event.target.value = "";
        }}
      />

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);

          selectFile(
            event.dataTransfer.files?.[0]
          );
        }}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition ${
          isDragging
            ? "border-amber-400 bg-amber-50 dark:bg-amber-400/5"
            : "border-zinc-200 bg-zinc-50/60 dark:border-zinc-700 dark:bg-zinc-950/40"
        }`}
      >
        {displayedImage ? (
          <div className="relative aspect-[4/3] w-full">
            <img
              src={displayedImage}
              alt="Burger preview"
              className="size-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
              <button
                type="button"
                onClick={() =>
                  inputRef.current?.click()
                }
                className="rounded-xl bg-white/95 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-white"
              >
                Replace Image
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex size-9 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur transition hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            className="flex min-h-64 w-full flex-col items-center justify-center px-6 py-10 text-center"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-200">
              {removeCurrent ? (
                <ImageIcon size={23} />
              ) : (
                <UploadCloud size={23} />
              )}
            </div>

            <p className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Upload burger image
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              Drag and drop or click to browse
            </p>

            <p className="mt-3 rounded-full bg-white px-3 py-1 text-[11px] text-zinc-500 shadow-sm dark:bg-zinc-800 dark:text-zinc-400">
              PNG, JPG or WEBP · Max 5MB
            </p>
          </button>
        )}
      </div>

      {file && (
        <p className="mt-2 truncate text-xs text-zinc-500 dark:text-zinc-400">
          Selected:{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-200">
            {file.name}
          </span>
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}