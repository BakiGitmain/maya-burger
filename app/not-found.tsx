"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Home } from "lucide-react";

const REDIRECT_SECONDS = 5;

export default function NotFoundPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    router.prefetch("/");

    const countdownTimer = window.setInterval(() => {
      setSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(countdownTimer);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      router.replace("/");
    }, REDIRECT_SECONDS * 1000 + 500);

    return () => {
      window.clearInterval(countdownTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  const goHome = () => {
    router.replace("/");
  };

  const progress =
    ((REDIRECT_SECONDS - seconds) / REDIRECT_SECONDS) * 100;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-black">
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex min-h-[42dvh] items-center justify-center overflow-hidden bg-[#f7f7f3] px-6 py-10 sm:min-h-[48dvh] sm:px-10 lg:min-h-dvh lg:px-16">
          <div className="pointer-events-none absolute left-4 top-3 select-none text-[100px] font-black leading-none tracking-[-0.08em] text-black/[0.035] sm:left-10 sm:top-5 sm:text-[170px] lg:text-[220px]">
            404
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-yellow-400 lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-1.5" />

          <div className="relative flex w-full max-w-[620px] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://illustrations.popsy.co/amber/crashed-error.svg"
              alt="Page not found illustration"
              loading="eager"
              decoding="async"
              className="h-auto w-full max-w-[310px] object-contain sm:max-w-[390px] lg:max-w-[520px]"
            />
          </div>
        </section>

        <section className="relative flex min-h-[58dvh] items-center bg-black px-6 py-12 text-white sm:min-h-[52dvh] sm:px-12 sm:py-16 lg:min-h-dvh lg:px-16 xl:px-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-[130px]" />

          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0">
            <div className="mb-7 inline-flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

              <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
                Error 404
              </span>
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-yellow-400 sm:text-sm">
              Looks like this page is missing
            </p>

            <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black leading-[0.82] tracking-[-0.07em]">
              PAGE NOT
              <span className="mt-3 block text-yellow-400">
                FOUND.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              The page you are trying to open does not exist, may have
              been removed, or the address may be incorrect.
            </p>

            <button
              type="button"
              onClick={goHome}
              className="group mt-9 inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full border-0 bg-yellow-400 px-7 text-sm font-black text-black transition-[transform,background-color] duration-300 hover:scale-[1.025] hover:bg-yellow-300 active:scale-[0.98]"
            >
              <Home size={18} strokeWidth={2.4} />

              Go back home

              <ArrowRight
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <div className="mt-12 max-w-md">
              <div className="mb-4 flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
                    Returning home
                  </p>

                  <p className="mt-2 text-xs text-white/35">
                    Automatic redirect
                  </p>
                </div>

                <div
                  aria-live="polite"
                  className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-3 text-xl font-black text-yellow-400"
                >
                  {seconds}
                </div>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-[width] duration-1000 ease-linear"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-xs text-white/30">
                {seconds === 0
                  ? "Taking you back home..."
                  : `Redirecting in ${seconds} ${
                      seconds === 1 ? "second" : "seconds"
                    }`}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 right-7 hidden text-right lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/15">
              Maya Burger
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}