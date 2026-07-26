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

    /* ================================================= */
    /* SETTINGS */
    /* ================================================= */

    const minimumLoaderTime = 700;

    // Never trap someone on the loader forever.
    const maximumLoaderTime = 3500;

    /* ================================================= */
    /* PAGE IS NOT READY YET */
    /* ================================================= */

    document.documentElement.dataset.appReady = "false";

    /* ================================================= */
    /* SMALL DELAY HELPER */
    /* ================================================= */

    const delay = (ms: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    /* ================================================= */
    /* WAIT FOR REACT / NEXT TO PAINT THE PAGE */
    /* ================================================= */

    const waitForInitialPaint = () => {
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });
    };

    /* ================================================= */
    /* WAIT ONLY FOR CRITICAL IMAGES */
    /* ================================================= */

    const waitForCriticalImages = async () => {
      /*
        IMPORTANT:

        We ONLY search for images with:

        data-critical

        Popular Picks images must NOT have data-critical.
      */

      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>("img[data-critical]"),
      );

      if (images.length === 0) {
        return;
      }

      await Promise.all(
        images.map((image) => {
          /*
            Browser already finished the image.
          */

          if (image.complete) {
            return Promise.resolve();
          }

          /*
            Otherwise wait for real load/error.
          */

          return new Promise<void>((resolve) => {
            const finish = () => {
              resolve();
            };

            image.addEventListener("load", finish, {
              once: true,
            });

            image.addEventListener("error", finish, {
              once: true,
            });
          });
        }),
      );
    };

    /* ================================================= */
    /* WAIT FOR FONTS */
    /* ================================================= */

    const waitForFonts = async () => {
      if (!document.fonts?.ready) {
        return;
      }

      try {
        await document.fonts.ready;
      } catch {
        /*
          Font failure should never trap the website
          behind the loader.
        */
      }
    };

    /* ================================================= */
    /* WAIT FOR IMPORTANT HOMEPAGE ASSETS */
    /* ================================================= */

    const waitForCriticalAssets = async () => {
      /*
        Give the DOM a chance to render first so things
        such as the hero <Image> exist before we query them.
      */

      await waitForInitialPaint();

      await Promise.all([
        waitForFonts(),
        waitForCriticalImages(),
      ]);
    };

    /* ================================================= */
    /* FINISH LOADING */
    /* ================================================= */

    const finishLoading = () => {
      if (cancelled) return;

      /*
        Start fading the black loader.
      */

      setFadeOut(true);

      /*
        Wait for the 500ms fade animation.
      */

      fadeTimer = setTimeout(() => {
        if (cancelled) return;

        /*
          Reveal the actual site.
        */

        setLoaded(true);

        /*
          Tell lazy sections that the main loader
          has completely finished.
        */

        document.documentElement.dataset.appReady = "true";

        /*
          PopularPicks listens for this event.
        */

        window.dispatchEvent(new Event("app-ready"));
      }, 500);
    };

    /* ================================================= */
    /* RUN PRELOADER */
    /* ================================================= */

    const runPreloader = async () => {
      const startTime = Date.now();

      /*
        Whichever happens first:

        1. Critical assets finish loading
        2. 3.5 seconds passes

        This protects slow-internet users.
      */

      await Promise.race([
        waitForCriticalAssets(),
        delay(maximumLoaderTime),
      ]);

      if (cancelled) return;

      /*
        Prevent loader from flashing for 50ms
        on very fast connections.
      */

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < minimumLoaderTime) {
        await delay(minimumLoaderTime - elapsedTime);
      }

      if (cancelled) return;

      finishLoading();
    };

    runPreloader();

    /* ================================================= */
    /* CLEANUP */
    /* ================================================= */

    return () => {
      cancelled = true;

      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
    };
  }, []);

  return (
    <>
      {/* ================================================= */}
      {/* ACTUAL WEBSITE */}
      {/* ================================================= */}

      <div
        aria-busy={!loaded}
        className={`
          transition-opacity
          duration-500

          ${
            loaded
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        {children}
      </div>

      {/* ================================================= */}
      {/* FULL SCREEN PRELOADER */}
      {/* ================================================= */}

      {!loaded && (
        <div
          className={`
            fixed
            inset-0
            z-[9999999]

            flex
            items-center
            justify-center

            bg-black

            transition-opacity
            duration-500

            ${
              fadeOut
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }
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
            className="
              h-auto
              w-30
              sm:w-37.5
            "
          />
        </div>
      )}
    </>
  );
}