import Link from "next/link";
import type { ElementType } from "react";

import {
  ArrowRight,
  Clock3,
  LayoutDashboard,
  Menu,
  Settings,
} from "lucide-react";

type UnderConstructionPageProps = {
  icon: ElementType;
  eyebrow: string;
  title: string;
  highlightedWord?: string;
  description: string;
};

const CONSTRUCTION_IMAGE =
  "https://freesvg.org/img/site-under-construction.png";

export default function UnderConstructionPage({
  icon: Icon,
  eyebrow,
  title,
  highlightedWord = "CONSTRUCTION.",
  description,
}: UnderConstructionPageProps) {
  return (
    <section className="flex min-h-[calc(100dvh-120px)] items-center">
      <div
        className="
          relative
          w-full
          overflow-hidden
          border
          border-[var(--admin-border)]
          bg-[var(--admin-panel)]
        "
        style={{
          borderRadius: "calc(var(--admin-radius) + 8px)",
        }}
      >
        <div
          className="absolute left-0 top-0 h-[3px] w-full"
          style={{
            backgroundColor: "var(--admin-accent)",
          }}
        />

        <div
          className="
            grid
            min-h-[650px]
            grid-cols-1
            items-center
            gap-6
            px-5
            py-8
            sm:px-8
            sm:py-10
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.85fr)]
            lg:gap-10
            lg:px-12
            lg:py-14
            xl:px-16
          "
        >
          <div
            className="
              order-2
              mx-auto
              flex
              w-full
              max-w-[680px]
              flex-col
              items-center
              text-center
              lg:order-1
              lg:mx-0
              lg:items-start
              lg:text-left
            "
          >
            <div className="mb-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  border
                  border-[var(--admin-border)]
                  bg-[var(--admin-elevated)]
                  px-3.5
                  py-2.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-zinc-400
                  sm:text-[11px]
                "
                style={{
                  borderRadius: "var(--admin-radius)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: "var(--admin-accent)",
                  }}
                />

                Work in progress
              </div>

              <div className="inline-flex items-center gap-2 px-2 py-2 text-xs text-zinc-500">
                <Clock3 size={15} strokeWidth={1.8} />
                Coming soon
              </div>
            </div>

            <div
              className="
                mb-6
                flex
                h-14
                w-14
                items-center
                justify-center
                border
              "
              style={{
                borderRadius: "var(--admin-radius)",
                borderColor:
                  "color-mix(in srgb, var(--admin-accent) 35%, transparent)",
                backgroundColor: "var(--admin-accent-soft)",
                color: "var(--admin-accent)",
              }}
            >
              <Icon size={27} strokeWidth={1.8} />
            </div>

            <p
              className="
                mb-4
                text-[11px]
                font-bold
                uppercase
                tracking-[0.23em]
                sm:text-xs
              "
              style={{
                color: "var(--admin-accent)",
              }}
            >
              {eyebrow}
            </p>

            <h1
              className="
                w-full
                max-w-[680px]
                text-[clamp(2.5rem,11vw,4.6rem)]
                font-black
                leading-[0.89]
                tracking-[-0.055em]
                text-white
                sm:text-[clamp(3.2rem,8vw,5.3rem)]
                lg:text-[clamp(4rem,5.2vw,6.2rem)]
              "
            >
              {title}

              <span
                className="mt-2 block"
                style={{
                  color: "var(--admin-accent)",
                }}
              >
                UNDER
              </span>

              <span className="mt-2 block">
                {highlightedWord}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-500 sm:text-[15px] sm:leading-8">
              {description}
            </p>

            <div
              className="
                mt-8
                flex
                w-full
                flex-col
                gap-3
                sm:w-auto
                sm:flex-row
              "
            >
            <Link
            href="/admin/menu"
            className="
                group
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2.5
                px-6
                text-sm
                font-semibold
                text-black
                transition-transform
                duration-200
                active:scale-[0.98]
                sm:w-auto
            "
            style={{
                borderRadius: "var(--admin-radius)",
                backgroundColor: "var(--admin-accent)",
            }}
            >
            <Menu size={18} />

            Manage menu

            <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
            />
            </Link>

            <Link
            href="/admin/settings"
            className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2.5
                border
                border-[var(--admin-border)]
                bg-[var(--admin-elevated)]
                px-6
                text-sm
                font-medium
                text-zinc-300
                transition-colors
                duration-200
                hover:bg-[var(--admin-hover)]
                hover:text-white
                sm:w-auto
            "
            style={{
                borderRadius: "var(--admin-radius)",
            }}
            >
            <Settings size={18} />
            Open settings
            </Link>
            </div>

            <div
              className="
                mt-9
                flex
                w-full
                max-w-xl
                items-start
                gap-3
                border-t
                border-[var(--admin-border)]
                pt-5
                text-left
              "
            >
              <Settings
                size={17}
                className="mt-0.5 shrink-0 text-zinc-600"
              />

              <p className="text-xs leading-6 text-zinc-600 sm:text-sm">
                This section is planned for a future update. Menu
                management and appearance settings are already
                available.
              </p>
            </div>
          </div>

          <div
            className="
              order-1
              flex
              w-full
              items-center
              justify-center
              px-2
              pt-2
              sm:px-6
              lg:order-2
              lg:px-0
              lg:pt-0
            "
          >
            <div className="relative flex w-full max-w-[560px] items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CONSTRUCTION_IMAGE}
                alt={`${eyebrow} under construction`}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="
                  h-auto
                  w-full
                  max-w-[270px]
                  object-contain
                  sm:max-w-[370px]
                  lg:max-w-[520px]
                "
                style={{
                  filter:
                    "grayscale(0.55) saturate(0.75) contrast(1.08)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}