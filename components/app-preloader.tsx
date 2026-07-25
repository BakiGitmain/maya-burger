"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

type AppPreloaderProps = {
  children: ReactNode;
};

export default function AppPreloader({ children }: AppPreloaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    const waitForImages = async () => {
      const images = Array.from(document.images).filter(
        (image) => !image.hasAttribute("data-preloader"),
      );

      await Promise.all(
        images.map((image) => {
          // Image already finished loading
          if (image.complete) {
            return Promise.resolve();
          }

          // Wait until image loads or fails
          return new Promise<void>((resolve) => {
            const finish = () => resolve();

            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
          });
        }),
      );
    };

    const waitForPageLoad = async () => {
      if (document.readyState === "complete") {
        return;
      }

      await new Promise<void>((resolve) => {
        window.addEventListener("load", () => resolve(), {
          once: true,
        });
      });
    };

    const waitForEverything = async () => {
      const startTime = Date.now();

      // Wait for the browser page load
      await waitForPageLoad();

      // Wait for fonts
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      // Wait for page images
      await waitForImages();

      // Prevent loader from flashing too quickly
      const minimumLoaderTime = 700;
      const elapsed = Date.now() - startTime;

      if (elapsed < minimumLoaderTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoaderTime - elapsed),
        );
      }

      if (cancelled) return;

      // Fade loader away
      setFadeOut(true);

      fadeTimer = setTimeout(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      }, 500);
    };

    waitForEverything();

    return () => {
      cancelled = true;

      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
    };
  }, []);

  return (
    <>
      {/* ================= ACTUAL WEBSITE ================= */}
      <div
        className={`
          transition-opacity duration-500
          ${
            loaded
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        {children}
      </div>

      {/* ================= FULL SCREEN LOADER ================= */}
      {!loaded && (
        <div
          className={`
            fixed inset-0 z-9999999
            flex items-center justify-center
            bg-black
            transition-opacity duration-500
            ${fadeOut ? "opacity-0" : "opacity-100"}
          `}
        >
          <Image
            data-preloader
            src="/images/loader.gif"
            alt="Loading Maya Burger"
            width={150}
            height={150}
            unoptimized
            priority
            className="h-auto w-30 sm:w-37.5"
          />
        </div>
      )}
    </>
  );
}