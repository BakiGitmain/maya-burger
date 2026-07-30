"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Allura,
  Bebas_Neue,
} from "next/font/google";
import {
  ChevronDown,
  RefreshCw,
} from "lucide-react";

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

type LoadingStatus =
  | "loading"
  | "ready"
  | "error";

type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "name";

type CategoryOption = {
  key: string;
  label: string;
};

const priceFormatter =
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

function getPriceValue(price: string) {
  const value = Number(price);

  return Number.isFinite(value)
    ? value
    : 0;
}

function formatPrice(price: string) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return `${price} Birr`;
  }

  return `${priceFormatter.format(value)} Birr`;
}

function getCategoryKey(category: string) {
  return category
    .trim()
    .toLocaleLowerCase();
}

function sortBurgers(
  burgers: Burger[],
  sortOption: SortOption,
) {
  const sorted = [...burgers];

  sorted.sort((first, second) => {
    if (sortOption === "price-low") {
      return (
        getPriceValue(first.price) -
        getPriceValue(second.price)
      );
    }

    if (sortOption === "price-high") {
      return (
        getPriceValue(second.price) -
        getPriceValue(first.price)
      );
    }

    if (sortOption === "name") {
      return first.name.localeCompare(
        second.name,
      );
    }

    if (sortOption === "newest") {
      return second.id - first.id;
    }

    if (
      first.isFeatured !==
      second.isFeatured
    ) {
      return Number(second.isFeatured) -
        Number(first.isFeatured);
    }

    if (
      first.isAvailable !==
      second.isAvailable
    ) {
      return Number(second.isAvailable) -
        Number(first.isAvailable);
    }

    return second.id - first.id;
  });

  return sorted;
}

function MenuCardSkeleton() {
  return (
    <div className="h-full min-h-[370px] md:min-h-[420px]">
      <div className="bestseller-skeleton">
        <div className="bestseller-skeleton-image">
          <div className="skeleton-image-glow" />
        </div>

        <div className="bestseller-skeleton-content">
          <div className="skeleton-block skeleton-name" />

          <div className="skeleton-description">
            <div className="skeleton-block w-full" />

            <div className="skeleton-block w-[92%]" />

            <div className="skeleton-block w-[64%]" />
          </div>

          <div className="skeleton-block skeleton-price" />
        </div>

        <div className="skeleton-shine" />
      </div>
    </div>
  );
}

function MenuCardPlaceholder() {
  return (
    <div
      className="
        h-full
        min-h-[370px]
        overflow-hidden
        rounded-[18px]
        border
        border-white/[0.05]
        bg-[#0d0d0d]

        md:min-h-[420px]
      "
    >
      <div
        className="
          aspect-[16/11]
          w-full
          bg-[#101010]

          md:aspect-[4/3]
        "
      />

      <div
        className="
          min-h-[170px]
          bg-[#0d0d0d]

          md:min-h-[185px]
        "
      />
    </div>
  );
}

function MenuCard({
  burger,
}: {
  burger: Burger;
}) {
  const cardRef =
    useRef<HTMLDivElement | null>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [imageLoaded, setImageLoaded] =
    useState(() => !burger.imageUrl);

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

const imageSrc = burger.imageUrl ?? "";

const showImage =
  imageSrc.length > 0 && !imageFailed;

  return (
    <div
      ref={cardRef}
      className="
        relative
        h-full
        w-full
        max-w-[430px]
        justify-self-center

        md:max-w-none
      "
    >
      {!shouldLoad && (
        <MenuCardPlaceholder />
      )}

      {shouldLoad && (
        <div className="relative h-full">
          <article
            className={`
              relative
              flex
              h-full
              flex-col
              overflow-hidden

              rounded-[18px]
              border
              border-white/[0.075]

              bg-[#0d0d0d]

              shadow-[0_18px_45px_rgba(0,0,0,0.2)]

              transition-[opacity,transform,border-color,background-color]
              duration-700
              ease-out

              hover:border-white/[0.14]
              hover:bg-[#101010]

              ${
                showCard
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }
            `}
          >
            <div
              className="
                relative
                aspect-[16/11]
                w-full
                overflow-hidden
                bg-[#121212]

                md:aspect-[4/3]
              "
            >
              {showImage ? (
                <Image
                  src={burger.imageUrl!}
                  alt={burger.name}
                  fill
                  sizes="
                    (max-width: 767px) 100vw,
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

                    transition-[filter,opacity]
                    duration-500
                    ease-out

                    ${
                      burger.isAvailable
                        ? "opacity-100"
                        : "opacity-65 grayscale-[40%]"
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

                    bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.09),transparent_55%)]
                  "
                >
                  <span
                    className={`
                      ${bebas.className}

                      text-[1.65rem]
                      tracking-[0.15em]
                      text-white/15
                    `}
                  >
                    MAYA BURGER
                  </span>
                </div>
              )}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-[#0d0d0d]
                  via-transparent
                  to-black/5
                "
              />

              <div
                className="
                  absolute
                  left-3
                  top-3
                  z-10

                  max-w-[55%]
                  truncate

                  rounded-full
                  border
                  border-white/10
                  bg-black/60

                  px-2.5
                  py-1.5

                  text-[0.62rem]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-white/75

                  backdrop-blur-md

                  sm:left-4
                  sm:top-4
                  sm:px-3
                  sm:text-[0.66rem]
                "
              >
                {burger.category}
              </div>

              <div
                className={`
                  absolute
                  right-3
                  top-3
                  z-10

                  inline-flex
                  items-center
                  gap-1.5

                  rounded-full
                  border

                  px-2.5
                  py-1.5

                  text-[0.59rem]
                  font-semibold
                  uppercase
                  tracking-[0.1em]

                  backdrop-blur-md

                  sm:right-4
                  sm:top-4
                  sm:px-3
                  sm:text-[0.63rem]

                  ${
                    burger.isAvailable
                      ? `
                        border-emerald-400/20
                        bg-[#07140d]/80
                        text-emerald-200
                      `
                      : `
                        border-white/10
                        bg-black/70
                        text-white/50
                      `
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full

                    ${
                      burger.isAvailable
                        ? `
                          bg-emerald-400
                          shadow-[0_0_7px_rgba(52,211,153,0.75)]
                        `
                        : "bg-white/30"
                    }
                  `}
                />

                {burger.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </div>
            </div>

            <div
              className="
                flex
                min-h-[170px]
                flex-1
                flex-col

                p-[clamp(16px,1.5vw,21px)]

                md:min-h-[185px]
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >
                <h2
                  className={`
                    ${bebas.className}

                    line-clamp-2

                    text-[1.4rem]
                    leading-[1.02]
                    tracking-[0.035em]
                    text-white

                    sm:text-[1.55rem]
                    xl:text-[clamp(1.3rem,1.55vw,1.75rem)]
                  `}
                >
                  {burger.name}
                </h2>

                {burger.isFeatured && (
                  <span
                    className="
                      shrink-0

                      border-b
                      border-yellow-400/70

                      pb-1

                      text-[0.55rem]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-yellow-400/90
                    "
                  >
                    Popular
                  </span>
                )}
              </div>

              <p
                className="
                  mt-2.5
                  line-clamp-3

                  text-[0.76rem]
                  leading-[1.65]
                  text-white/52

                  sm:text-[0.8rem]
                "
              >
                {burger.description ||
                  "Freshly prepared with quality ingredients and Maya Burger flavor."}
              </p>

              <div
                className="
                  mt-auto
                  flex
                  items-end
                  justify-between
                  gap-4
                  pt-5
                "
              >
                <p
                  className={`
                    ${bebas.className}

                    text-[1.55rem]
                    leading-none
                    tracking-[0.04em]
                    text-yellow-400

                    sm:text-[1.7rem]
                  `}
                >
                  {formatPrice(burger.price)}
                </p>

                {!burger.isAvailable && (
                  <span
                    className="
                      text-[0.63rem]
                      font-medium
                      uppercase
                      tracking-[0.11em]
                      text-white/28
                    "
                  >
                    Not serving
                  </span>
                )}
              </div>
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
              <MenuCardSkeleton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuHero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden

        border-y
        border-white/[0.055]

        bg-black
      "
    >


      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1500px]
          items-center

          px-[clamp(18px,5vw,78px)]
          pb-0
          pt-[clamp(44px,7vw,92px)]

          lg:min-h-[530px]
          lg:grid-cols-[0.88fr_1.12fr]
          lg:py-[clamp(55px,6vw,90px)]
        "
      >
        <div
          className="
            relative
            z-10
            max-w-[620px]

            pb-3
            text-center

            lg:pb-0
            lg:text-left
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-3

              lg:justify-start
            "
          >
            <span
              className="
                h-px
                w-7

                bg-gradient-to-r
                from-transparent
                to-yellow-400
              "
            />

            <p
              className={`
                ${allura.className}

                text-[clamp(1.2rem,2.2vw,2.15rem)]
                leading-none
                text-yellow-400
              `}
            >
              Always Made Fresh
            </p>

            <span
              className="
                h-px
                w-7

                bg-gradient-to-l
                from-transparent
                to-yellow-400
              "
            />
          </div>

          <h1
            className={`
              ${bebas.className}

              mt-4

              text-[clamp(3.4rem,9vw,7.4rem)]
              leading-[0.82]
              tracking-[0.035em]
              text-white
            `}
          >
            OUR MENU
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-[510px]

              text-[clamp(0.83rem,1.15vw,1rem)]
              leading-[1.75]
              text-white/55

              lg:mx-0
            "
          >
            Fresh burgers, crispy sides and
            bold flavors prepared with quality
            ingredients.
          </p>

          <div
            className="
              mx-auto
              mt-7
              h-px
              w-[100px]

              bg-gradient-to-r
              from-transparent
              via-yellow-400
              to-transparent

              lg:mx-0
              lg:bg-gradient-to-r
              lg:from-yellow-400
              lg:via-yellow-400/40
              lg:to-transparent
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            mt-1
            h-[280px]
            w-full
            max-w-[620px]

            sm:h-[370px]

            lg:mt-0
            lg:h-[460px]
            lg:max-w-none
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2

              h-[70%]
              w-[70%]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-yellow-400/[0.06]

              blur-[75px]
            "
          />

          <Image
            data-critical
            src="/images/hero-burger.png"
            alt="Maya Burger menu"
            fill
            priority
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1023px) 80vw,
              55vw
            "
            className="
              object-contain
              object-center

              lg:object-right
            "
          />
        </div>
      </div>
    </section>
  );
}

export default function MenuPage() {
  const [burgers, setBurgers] =
    useState<Burger[]>([]);

  const [status, setStatus] =
    useState<LoadingStatus>("loading");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const [requestVersion, setRequestVersion] =
    useState(0);

  useEffect(() => {
    let active = true;

    const loadMenu = async () => {
      try {
        const menuItems =
          await getBurgers();

        if (!active) {
          return;
        }

        setBurgers(menuItems);
        setStatus("ready");
      } catch (error) {
        console.error(
          "Unable to load menu:",
          error,
        );

        if (active) {
          setStatus("error");
        }
      }
    };

    void loadMenu();

    return () => {
      active = false;
    };
  }, [requestVersion]);

  const categories =
    useMemo<CategoryOption[]>(() => {
      const categoryMap =
        new Map<string, string>();

      burgers.forEach((burger) => {
        const cleanCategory =
          burger.category.trim();

        if (!cleanCategory) {
          return;
        }

        const key =
          getCategoryKey(cleanCategory);

        if (!categoryMap.has(key)) {
          categoryMap.set(
            key,
            cleanCategory,
          );
        }
      });

      return Array.from(
        categoryMap.entries(),
      )
        .map(([key, label]) => ({
          key,
          label,
        }))
        .sort((first, second) =>
          first.label.localeCompare(
            second.label,
          ),
        );
    }, [burgers]);

  const validSelectedCategory =
    selectedCategory === "all" ||
    categories.some(
      (category) =>
        category.key ===
        selectedCategory,
    )
      ? selectedCategory
      : "all";

  const visibleBurgers = useMemo(() => {
    const filtered =
      validSelectedCategory === "all"
        ? burgers
        : burgers.filter(
            (burger) =>
              getCategoryKey(
                burger.category,
              ) ===
              validSelectedCategory,
          );

    return sortBurgers(
      filtered,
      sortOption,
    );
  }, [
    burgers,
    sortOption,
    validSelectedCategory,
  ]);

  const retryLoading = () => {
    setStatus("loading");

    setRequestVersion(
      (currentVersion) =>
        currentVersion + 1,
    );
  };

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      <MenuHero />

      <section
        className="
          relative

          px-[clamp(14px,4vw,58px)]
          pb-[clamp(75px,8vw,130px)]
          pt-[clamp(32px,5vw,70px)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1450px]
          "
        >
          <div
            className="
              relative
              z-20

              rounded-[20px]
              border
              border-white/[0.07]

              bg-[#0d0d0d]/95

              p-2.5

              shadow-[0_20px_55px_rgba(0,0,0,0.32)]
              backdrop-blur-xl

              sm:p-3
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3

                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2

                  overflow-x-auto
                  pb-1

                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden

                  lg:pb-0
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(
                      "all",
                    );
                  }}
                  className={`
                    shrink-0
                    rounded-[11px]

                    px-4
                    py-2.5

                    text-[0.73rem]
                    font-semibold
                    tracking-[0.01em]

                    transition-[background-color,color,border-color]
                    duration-300

                    ${
                      validSelectedCategory ===
                      "all"
                        ? `
                          border
                          border-yellow-300/60
                          bg-yellow-400
                          text-black
                        `
                        : `
                          border
                          border-transparent
                          bg-white/[0.035]
                          text-white/65

                          hover:border-white/10
                          hover:bg-white/[0.065]
                          hover:text-white
                        `
                    }
                  `}
                >
                  All Items
                </button>

                {categories.map(
                  (category) => {
                    const active =
                      validSelectedCategory ===
                      category.key;

                    return (
                      <button
                        key={category.key}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(
                            category.key,
                          );
                        }}
                        className={`
                          shrink-0
                          rounded-[11px]

                          px-4
                          py-2.5

                          text-[0.73rem]
                          font-semibold

                          transition-[background-color,color,border-color]
                          duration-300

                          ${
                            active
                              ? `
                                border
                                border-yellow-300/60
                                bg-yellow-400
                                text-black
                              `
                              : `
                                border
                                border-transparent
                                bg-white/[0.035]
                                text-white/65

                                hover:border-white/10
                                hover:bg-white/[0.065]
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {category.label}
                      </button>
                    );
                  },
                )}
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3

                  border-t
                  border-white/[0.06]
                  pt-2.5

                  lg:border-0
                  lg:pt-0
                "
              >
                <span
                  className="
                    shrink-0

                    text-[0.68rem]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-white/30
                  "
                >
                  {visibleBurgers.length}{" "}
                  {visibleBurgers.length === 1
                    ? "item"
                    : "items"}
                </span>

                <label
                  className="
                    relative
                    min-w-[155px]
                  "
                >
                  <span className="sr-only">
                    Sort menu
                  </span>

                  <select
                    value={sortOption}
                    onChange={(event) => {
                      setSortOption(
                        event.target
                          .value as SortOption,
                      );
                    }}
                    className="
                      w-full
                      appearance-none

                      rounded-[11px]
                      border
                      border-white/[0.07]

                      bg-[#111]

                      py-2.5
                      pl-3.5
                      pr-9

                      text-[0.72rem]
                      font-medium
                      text-white/65

                      outline-none

                      transition-colors
                      duration-300

                      hover:border-white/15
                      focus:border-yellow-400/50
                    "
                  >
                    <option value="featured">
                      Featured first
                    </option>

                    <option value="newest">
                      Newest first
                    </option>

                    <option value="price-low">
                      Price: low to high
                    </option>

                    <option value="price-high">
                      Price: high to low
                    </option>

                    <option value="name">
                      Name: A to Z
                    </option>
                  </select>

                  <ChevronDown
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2

                      h-4
                      w-4

                      -translate-y-1/2

                      text-yellow-400/70
                    "
                  />
                </label>
              </div>
            </div>
          </div>

          <div
            className="
              mt-[clamp(24px,3vw,38px)]

              grid
              grid-cols-1

              items-stretch

              gap-[clamp(18px,2vw,28px)]

              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {status === "loading" &&
              Array.from({
                length: 8,
              }).map((_, index) => (
                <MenuCardSkeleton
                  key={index}
                />
              ))}

            {status === "ready" &&
              visibleBurgers.map(
                (burger) => (
                  <MenuCard
                    key={burger.id}
                    burger={burger}
                  />
                ),
              )}
          </div>

          {status === "ready" &&
            visibleBurgers.length === 0 && (
              <div
                className="
                  mx-auto
                  mt-14
                  max-w-[460px]

                  rounded-[18px]
                  border
                  border-white/[0.07]

                  bg-[#0d0d0d]

                  px-6
                  py-12

                  text-center
                "
              >
                <h2
                  className={`
                    ${bebas.className}

                    text-2xl
                    tracking-wide
                    text-white
                  `}
                >
                  No items here yet
                </h2>

                <p
                  className="
                    mt-2

                    text-sm
                    leading-6
                    text-white/40
                  "
                >
                  This category does not have
                  any menu items right now.
                </p>

                {validSelectedCategory !==
                  "all" && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(
                        "all",
                      );
                    }}
                    className="
                      mt-6

                      rounded-full
                      bg-yellow-400

                      px-5
                      py-2.5

                      text-xs
                      font-bold
                      text-black

                      transition-colors
                      duration-300

                      hover:bg-yellow-300
                    "
                  >
                    VIEW ALL ITEMS
                  </button>
                )}
              </div>
            )}

          {status === "error" && (
            <div
              className="
                mx-auto
                mt-14
                max-w-[480px]

                rounded-[18px]
                border
                border-white/[0.07]

                bg-[#0d0d0d]

                px-6
                py-12

                text-center
              "
            >
              <h2
                className={`
                  ${bebas.className}

                  text-2xl
                  tracking-wide
                  text-white
                `}
              >
                Menu could not load
              </h2>

              <p
                className="
                  mt-2

                  text-sm
                  leading-6
                  text-white/40
                "
              >
                There was a problem loading
                the menu. Please try again.
              </p>

              <button
                type="button"
                onClick={retryLoading}
                className="
                  mx-auto
                  mt-6

                  inline-flex
                  items-center
                  gap-2

                  rounded-full
                  bg-yellow-400

                  px-5
                  py-2.5

                  text-xs
                  font-bold
                  text-black

                  transition-colors
                  duration-300

                  hover:bg-yellow-300
                "
              >
                <RefreshCw className="h-4 w-4" />

                TRY AGAIN
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}