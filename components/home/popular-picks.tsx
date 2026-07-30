"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Allura,
  Bebas_Neue,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBurgers } from "@/lib/api/burgers";
import type { Burger } from "@/lib/types/burger";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const priceFormatter = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 2,
  },
);

function formatPrice(price: string) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return `${price} BIRR`;
  }

  return `${priceFormatter.format(value)} BIRR`;
}

function ProductSkeleton() {
  return (
    <div className="bestseller-skeleton">
      <div className="bestseller-skeleton-image">
        <div className="skeleton-image-glow" />
      </div>

      <div className="bestseller-skeleton-content">
        <div className="skeleton-block skeleton-name" />

        <div className="skeleton-description">
          <div className="skeleton-block w-full" />
          <div className="skeleton-block w-[92%]" />
          <div className="skeleton-block w-[65%]" />
        </div>

        <div className="skeleton-block skeleton-price" />
      </div>

      <div className="skeleton-shine" />
    </div>
  );
}

function CardContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        relative
        w-[86%]
        max-w-[340px]
        justify-self-center

        sm:w-[82%]
        sm:max-w-[360px]

        md:w-full
        md:max-w-none
      "
    >
      {children}
    </div>
  );
}

function BestSellerCard({
  product,
}: {
  product: Burger;
}) {
  const cardRef =
    useRef<HTMLDivElement | null>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [imageLoaded, setImageLoaded] =
    useState(() => !product.imageUrl);

  const [imageFailed, setImageFailed] =
    useState(false);

  const [
    minimumLoadingDone,
    setMinimumLoadingDone,
  ] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    let observer:
      | IntersectionObserver
      | null = null;

    let skeletonTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    let started = false;

    const startWatchingCard = () => {
      if (observer || started) {
        return;
      }

      observer =
        new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) {
              return;
            }

            started = true;

            setShouldLoad(true);

            skeletonTimer = setTimeout(
              () => {
                setMinimumLoadingDone(
                  true,
                );
              },
              1000,
            );

            observer?.disconnect();
            observer = null;
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.15,
          },
        );

      observer.observe(card);
    };

    if (
      document.documentElement.dataset
        .appReady === "true"
    ) {
      startWatchingCard();
    }

    window.addEventListener(
      "app-ready",
      startWatchingCard,
    );

    return () => {
      window.removeEventListener(
        "app-ready",
        startWatchingCard,
      );

      observer?.disconnect();

      if (skeletonTimer) {
        clearTimeout(skeletonTimer);
      }
    };
  }, []);

  const showCard =
    imageLoaded && minimumLoadingDone;

  const imageSrc =
    product.imageUrl ?? "";

  const imageIsVisible =
    imageSrc.length > 0 &&
    !imageFailed;

  return (
    <div
      ref={cardRef}
      className="
        relative
        w-[86%]
        max-w-[340px]
        justify-self-center

        sm:w-[82%]
        sm:max-w-[360px]

        md:w-full
        md:max-w-none
      "
    >
      {!shouldLoad && (
        <div className="bestseller-card-placeholder" />
      )}

      {shouldLoad && (
        <div className="relative">
          <article
            className={`
              bestseller-card
              group
              overflow-hidden
              rounded-xl
              border
              border-white/[0.055]
              bg-[#0d0d0d]

              transition-all
              duration-700
              ease-out

              ${
                showCard
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0"
              }
            `}
          >
            <div
              className="
                relative
                aspect-[16/11]
                w-full
                overflow-hidden
                bg-[#111]

                md:aspect-[4/3]
              "
            >
              {imageIsVisible ? (
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  sizes="
                    (max-width: 640px) 340px,
                    (max-width: 1279px) 50vw,
                    25vw
                  "
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  onError={() => {
                    setImageFailed(true);
                    setImageLoaded(true);
                  }}
                  className={`
                    object-cover

                    transition-transform
                    duration-500
                    ease-out

                    motion-safe:group-hover:scale-[1.035]

                    ${
                      product.isAvailable
                        ? ""
                        : "grayscale-[45%] brightness-[0.72]"
                    }
                  `}
                />
              ) : (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-[#151515]
                  "
                >
                  <span
                    className={`
                      ${bebas.className}

                      text-2xl
                      tracking-[0.14em]
                      text-white/20
                    `}
                  >
                    MAYA BURGER
                  </span>
                </div>
              )}

              <div
                className={`
                  absolute
                  left-3
                  top-3
                  z-10

                  inline-flex
                  items-center
                  gap-1.5

                  rounded-full
                  border

                  px-2.5
                  py-1.5

                  text-[0.61rem]
                  font-semibold
                  tracking-[0.12em]

                  shadow-lg
                  backdrop-blur-md

                  md:left-4
                  md:top-4
                  md:px-3
                  md:text-[0.65rem]

                  ${
                    product.isAvailable
                      ? `
                        border-emerald-300/20
                        bg-[#07120d]/80
                        text-emerald-100
                      `
                      : `
                        border-white/15
                        bg-black/75
                        text-white/65
                      `
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full

                    ${
                      product.isAvailable
                        ? `
                          bg-emerald-400
                          shadow-[0_0_8px_rgba(52,211,153,0.75)]
                        `
                        : "bg-white/35"
                    }
                  `}
                />

                {product.isAvailable
                  ? "AVAILABLE"
                  : "SOLD OUT"}
              </div>

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-[24%]

                  bg-gradient-to-t
                  from-[#0d0d0d]
                  to-transparent
                "
              />
            </div>

            <div
              className="
                flex
                min-h-[164px]
                flex-col
                p-4

                md:min-h-[190px]
                md:p-[clamp(16px,1.5vw,22px)]
              "
            >
              <h3
                className={`
                  ${bebas.className}

                  line-clamp-2

                  text-[1.35rem]
                  leading-tight
                  tracking-wide
                  text-white

                  md:text-[clamp(1.4rem,1.8vw,2rem)]
                `}
              >
                {product.name}
              </h3>

              {product.description && (
                <p
                  className="
                    mt-2
                    line-clamp-3

                    text-[0.76rem]
                    leading-5
                    text-white/60

                    md:text-[clamp(0.78rem,0.9vw,0.95rem)]
                    md:leading-6
                  "
                >
                  {product.description}
                </p>
              )}

              <p
                className={`
                  ${bebas.className}

                  mt-auto
                  pt-4

                  text-[1.55rem]
                  leading-none
                  tracking-wide
                  text-yellow-400

                  md:pt-5
                  md:text-[clamp(1.5rem,2vw,2.05rem)]
                `}
              >
                {formatPrice(product.price)}
              </p>
            </div>
          </article>

          {!showCard && (
            <div
              className="
                absolute
                inset-0
                z-20
              "
            >
              <ProductSkeleton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PopularPicks() {
  const [
    featuredBurgers,
    setFeaturedBurgers,
  ] = useState<Burger[]>([]);

  const [status, setStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    let active = true;

    const loadFeaturedBurgers =
      async () => {
        try {
          const burgers =
            await getBurgers();

          if (!active) {
            return;
          }

          const featuredItems =
            burgers.filter(
              (burger) =>
                burger.isFeatured,
            );

          setFeaturedBurgers(
            featuredItems,
          );

          setStatus("ready");
        } catch (error) {
          console.error(
            "Unable to load popular picks:",
            error,
          );

          if (active) {
            setStatus("error");
          }
        }
      };

    void loadFeaturedBurgers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      className="
        relative
        w-full
        bg-black

        px-[clamp(14px,4vw,60px)]
        pb-[clamp(60px,8vw,120px)]
        pt-[clamp(28px,4vw,65px)]
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-[clamp(30px,4vw,52px)] text-center">
          <div
            className="
              flex
              w-full
              items-center
              justify-center
              gap-[clamp(8px,1.5vw,24px)]
            "
          >
            <span className="popular-line popular-line-left">
              <span className="popular-point" />
            </span>

            <p
              className={`
                ${allura.className}

                whitespace-nowrap
                text-[clamp(1.7rem,3.2vw,3.2rem)]
                leading-none
                text-yellow-400
              `}
            >
              Popular Picks
            </p>

            <span className="popular-line popular-line-right">
              <span className="popular-point" />
            </span>
          </div>

          <h2
            className={`
              ${bebas.className}

              mt-[clamp(9px,1vw,16px)]

              flex
              items-center
              justify-center

              gap-[clamp(5px,0.9vw,14px)]

              whitespace-nowrap

              text-[clamp(1.9rem,6vw,5rem)]
              leading-[0.9]
              tracking-wide
            `}
          >
            <span
              className="
                distressed-text
                inline-block
                [--text-color:white]
              "
            >
              OUR
            </span>

            <span
              className="
                distressed-text
                inline-block
                [--text-color:#facc15]
              "
            >
              BESTSELLERS
            </span>
          </h2>
        </div>

        <div
          className="
            grid
            grid-cols-1

            gap-[clamp(24px,2.3vw,32px)]

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {status === "loading" &&
            Array.from({
              length: 4,
            }).map((_, index) => (
              <CardContainer key={index}>
                <ProductSkeleton />
              </CardContainer>
            ))}

          {status === "ready" &&
            featuredBurgers.map(
              (product) => (
                <BestSellerCard
                  key={product.id}
                  product={product}
                />
              ),
            )}

          {status === "ready" &&
            featuredBurgers.length ===
              0 && (
              <div
                className="
                  col-span-full
                  py-10
                  text-center
                  text-sm
                  text-white/40
                "
              >
                Fresh picks are coming
                soon.
              </div>
            )}

          {status === "error" && (
            <div
              className="
                col-span-full
                py-10
                text-center
                text-sm
                text-white/40
              "
            >
              Popular picks are
              unavailable right now.
            </div>
          )}
        </div>

        <div className="mt-[clamp(32px,4vw,50px)] flex justify-center">
          <Link
            href="/menu"
            className="
              group

              inline-flex
              items-center
              justify-center
              gap-5

              rounded-full
              bg-yellow-400

              px-[clamp(28px,4vw,60px)]
              py-[clamp(11px,1vw,15px)]

              text-[clamp(0.75rem,1vw,0.95rem)]
              font-bold
              text-black

              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-yellow-300
            "
          >
            VIEW FULL MENU

            <ArrowRight
              className="
                h-5
                w-5

                transition-transform
                duration-300

                group-hover:translate-x-2
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}