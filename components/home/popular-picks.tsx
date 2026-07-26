"use client";

import { useEffect, useRef, useState } from "react";
import { Allura, Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

/* ================================================= */
/* TEMPORARY DATA */
/* Later this will come from your database */
/* ================================================= */

const bestSellers = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    description:
      "Grilled beef patty with cheese, lettuce, tomato & special sauce.",
    price: 5.49,
    image: "/images/bestsellers/classic-burger.png",
  },
  {
    id: 2,
    name: "Veggie Supreme Pizza",
    description: "Loaded with fresh veggies, cheese & Italian herbs.",
    price: 8.99,
    image: "/images/bestsellers/veggie-pizza.png",
  },
  {
    id: 3,
    name: "Loaded Beef Burrito",
    description:
      "Tender beef, fresh veggies, cheese and our signature sauce.",
    price: 6.99,
    image: "/images/bestsellers/beef-burrito.png",
  },
  {
    id: 4,
    name: "Peri Peri Fries",
    description: "Crispy golden fries tossed in bold peri peri seasoning.",
    price: 2.99,
    image: "/images/bestsellers/peri-fries.png",
  },
];

/* ================================================= */
/* SKELETON CARD */
/* ================================================= */

function ProductSkeleton() {
  return (
    <div className="bestseller-skeleton">
      {/* IMAGE SKELETON */}

      <div className="skeleton-image">
        <div className="skeleton-shimmer" />

        <div className="skeleton-image-icon">
          <div className="h-9 w-9 rounded-full bg-white/5" />
        </div>
      </div>

      {/* CONTENT SKELETON */}

      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title-line" />

        <div className="mt-4 space-y-2.5">
          <div className="skeleton-line w-full" />
          <div className="skeleton-line w-[88%]" />
          <div className="skeleton-line w-[60%]" />
        </div>

        <div className="skeleton-price" />
      </div>

      {/* MOVING SHINE */}

      <div className="skeleton-card-sweep" />
    </div>
  );
}

/* ================================================= */
/* POPULAR PICKS */
/* ================================================= */

export default function PopularPicks() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  /* ================================================= */
  /* DETECT WHEN SECTION ENTERS VIEWPORT */
  /* ================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);

          // We only need to trigger this once.
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ================================================= */
  /* IMAGE FINISHED LOADING */
  /* ================================================= */

  const handleImageLoaded = (id: number) => {
    setLoadedImages((current) => ({
      ...current,
      [id]: true,
    }));
  };

  return (
    <section
      ref={sectionRef}
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
        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="mb-[clamp(30px,4vw,52px)] text-center">
          {/* POPULAR PICKS */}

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

          {/* OUR BESTSELLERS */}

          <h2
            className={`
              ${bebas.className}
              mt-[clamp(9px,1vw,16px)]
              flex
              items-center
              justify-center
              gap-[clamp(6px,0.9vw,14px)]
              whitespace-nowrap
              text-[clamp(2.15rem,5vw,5rem)]
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

        {/* ================================================= */}
        {/* PRODUCT GRID */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-[clamp(24px,2.3vw,32px)]

            md:grid-cols-2

            xl:grid-cols-4
          "
        >
          {bestSellers.map((product) => {
            const imageLoaded = loadedImages[product.id] === true;

            return (
              <div
                key={product.id}
                className="
                  relative
                  w-[84%]
                  max-w-[325px]
                  justify-self-center

                  sm:w-[80%]
                  sm:max-w-[350px]

                  md:w-full
                  md:max-w-none
                "
              >
                {/* ================================================= */}
                {/* REAL CARD */}
                {/* Only created once section enters viewport */}
                {/* ================================================= */}

                {shouldLoad && (
                  <article
                    className={`
                      bestseller-card
                      group
                      overflow-hidden
                      rounded-xl
                      bg-[#0d0d0d]

                      transition-all
                      duration-700
                      ease-out

                      ${
                        imageLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }
                    `}
                  >
                    {/* IMAGE */}

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
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="
                          (max-width: 640px) 325px,
                          (max-width: 1280px) 50vw,
                          25vw
                        "
                        onLoad={() => handleImageLoaded(product.id)}
                        onError={() => handleImageLoaded(product.id)}
                        className="
                          object-cover
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:scale-[1.04]
                        "
                      />

                      {/* IMAGE BOTTOM FADE */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-x-0
                          bottom-0
                          h-[22%]
                          bg-gradient-to-t
                          from-[#0d0d0d]
                          to-transparent
                        "
                      />
                    </div>

                    {/* ================================================= */}
                    {/* PRODUCT INFO */}
                    {/* ================================================= */}

                    <div
                      className="
                        flex
                        min-h-[160px]
                        flex-col
                        p-4

                        md:min-h-[190px]
                        md:p-[clamp(16px,1.5vw,22px)]
                      "
                    >
                      <h3
                        className={`
                          ${bebas.className}
                          text-[1.35rem]
                          leading-tight
                          tracking-wide
                          text-white

                          md:text-[clamp(1.4rem,1.8vw,2rem)]
                        `}
                      >
                        {product.name}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-[0.76rem]
                          leading-5
                          text-white/60

                          md:text-[clamp(0.78rem,0.9vw,0.95rem)]
                          md:leading-6
                        "
                      >
                        {product.description}
                      </p>

                      {/* PRICE */}

                      <p
                        className={`
                          ${bebas.className}
                          mt-auto
                          pt-4
                          text-[1.65rem]
                          leading-none
                          tracking-wide
                          text-yellow-400

                          md:pt-5
                          md:text-[clamp(1.5rem,2vw,2.1rem)]
                        `}
                      >
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </article>
                )}

                {/* ================================================= */}
                {/* REAL LOADING SKELETON */}
                {/* ================================================= */}

                {!imageLoaded && (
                  <div
                    className={`
                      transition-opacity
                      duration-500

                      ${
                        shouldLoad
                          ? "opacity-100"
                          : "opacity-100"
                      }
                    `}
                  >
                    <ProductSkeleton />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================================================= */}
        {/* VIEW FULL MENU */}
        {/* ================================================= */}

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
              hover:shadow-[0_10px_35px_rgba(250,204,21,0.2)]
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