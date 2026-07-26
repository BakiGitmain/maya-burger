import { Allura, Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import { ArrowRight } from "lucide-react";

import {
  MdDeliveryDining,
  MdOutlineVerified,
  MdLocalDrink,
} from "react-icons/md";

import { RiCoupon3Line } from "react-icons/ri";

import {
  FaHamburger,
  FaPizzaSlice,
  FaHotdog,
} from "react-icons/fa";

import { GiFrenchFries } from "react-icons/gi";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

/* ================================================= */
/* CATEGORIES */
/* ================================================= */

const categories = [
  {
    name: "BURGERS",
    description: "Juicy & Cheesy",
    icon: FaHamburger,
  },
  {
    name: "FRIES",
    description: "Crispy & Golden",
    icon: GiFrenchFries,
  },
  {
    name: "PIZZA",
    description: "Hot & Delicious",
    icon: FaPizzaSlice,
  },
  {
    name: "DRINKS",
    description: "Chill & Refreshing",
    icon: MdLocalDrink,
  },
  {
    name: "BURRITO",
    description: "Loaded & Tasty",
    icon: FaHotdog,
  },
];

/* ================================================= */
/* TEMPORARY BESTSELLER DATA */
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

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden lg:h-[calc(100svh-80px)]">
        <div
          className="
            relative
            mx-auto
            flex
            w-full
            max-w-[1600px]
            items-start
            px-[clamp(12px,2vw,32px)]
            pb-[clamp(15px,3vw,30px)]
            lg:h-full
            lg:pb-0
          "
        >
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-20
              flex
              w-[54%]
              min-w-0
              flex-col
              pt-[clamp(8px,2vh,28px)]
              sm:w-[53%]
              lg:h-full
              xl:w-[52%]
            "
          >
            {/* TAGLINE */}

            <p
              className={`
                ${allura.className}
                whitespace-nowrap
                text-[clamp(0.9rem,2.2vw,2.4rem)]
                leading-none
                text-yellow-400
              `}
            >
              Cravings, Satisfied
            </p>

            {/* HEADING */}

            <h1
              className={`
                ${bebas.className}
                mt-[clamp(6px,1vw,16px)]
                leading-[0.86]
                tracking-wide
              `}
            >
              <span
                className="
                  distressed-text
                  block
                  whitespace-nowrap
                  text-[clamp(1.9rem,6.6vw,7.8rem)]
                  [--text-color:white]
                "
              >
                BEST FOOD
              </span>

              <span
                className="
                  distressed-text
                  block
                  whitespace-nowrap
                  text-[clamp(1.85rem,6.3vw,7.5rem)]
                  [--text-color:#facc15]
                "
              >
                FAST &amp; FRESH
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-[clamp(10px,1.8vw,28px)]
                max-w-[92%]
                text-[clamp(0.55rem,1.1vw,1.05rem)]
                font-medium
                leading-[1.65]
                text-white/75
              "
            >
              Freshly grilled burgers, crispy sides, and bold flavors made to
              satisfy every craving.
            </p>

            {/* BUTTON */}

            <Link
              href="/menu"
              className="
                group
                mt-[clamp(12px,1.8vw,28px)]
                inline-flex
                w-fit
                items-center
                gap-[clamp(7px,1vw,16px)]
                rounded-[clamp(4px,0.45vw,8px)]
                bg-yellow-400
                px-[clamp(11px,1.4vw,22px)]
                py-[clamp(7px,0.8vw,13px)]
                text-[clamp(0.5rem,0.8vw,0.875rem)]
                font-bold
                text-black
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-yellow-300
                hover:shadow-lg
              "
            >
              VIEW MENU

              <ArrowRight
                className="
                  h-[clamp(12px,1.3vw,20px)]
                  w-[clamp(12px,1.3vw,20px)]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1.5
                "
              />
            </Link>

            {/* ================================================= */}
            {/* FEATURES */}
            {/* ================================================= */}

            <div
              className="
                relative
                z-30
                mt-[clamp(18px,3vw,40px)]
                flex
                w-[180%]
                items-center
                justify-start
                gap-[clamp(8px,2.5vw,34px)]
                sm:w-[155%]
                md:w-[140%]
                lg:w-[125%]
                xl:absolute
                xl:bottom-6
                xl:left-0
                xl:mt-0
                xl:w-[105%]
                xl:gap-8
                2xl:bottom-8
                2xl:gap-10
              "
            >
              {/* FAST DELIVERY */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-[clamp(3px,0.7vw,11px)]
                "
              >
                <MdDeliveryDining
                  className="
                    shrink-0
                    text-[clamp(18px,2.5vw,42px)]
                    text-yellow-400
                  "
                />

                <div>
                  <h3
                    className="
                      whitespace-nowrap
                      text-[clamp(0.35rem,0.72vw,0.82rem)]
                      font-bold
                    "
                  >
                    FAST DELIVERY
                  </h3>

                  <p
                    className="
                      whitespace-nowrap
                      text-[clamp(0.29rem,0.57vw,0.7rem)]
                      text-white/60
                    "
                  >
                    At Your Doorstep
                  </p>
                </div>
              </div>

              {/* BEST QUALITY */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-[clamp(3px,0.7vw,11px)]
                "
              >
                <MdOutlineVerified
                  className="
                    shrink-0
                    text-[clamp(18px,2.4vw,40px)]
                    text-yellow-400
                  "
                />

                <div>
                  <h3
                    className="
                      whitespace-nowrap
                      text-[clamp(0.35rem,0.72vw,0.82rem)]
                      font-bold
                    "
                  >
                    BEST QUALITY
                  </h3>

                  <p
                    className="
                      whitespace-nowrap
                      text-[clamp(0.29rem,0.57vw,0.7rem)]
                      text-white/60
                    "
                  >
                    Fresh Ingredients
                  </p>
                </div>
              </div>

              {/* GREAT OFFERS */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-[clamp(3px,0.7vw,11px)]
                "
              >
                <RiCoupon3Line
                  className="
                    shrink-0
                    text-[clamp(18px,2.4vw,40px)]
                    text-yellow-400
                  "
                />

                <div>
                  <h3
                    className="
                      whitespace-nowrap
                      text-[clamp(0.35rem,0.72vw,0.82rem)]
                      font-bold
                    "
                  >
                    GREAT OFFERS
                  </h3>

                  <p
                    className="
                      whitespace-nowrap
                      text-[clamp(0.29rem,0.57vw,0.7rem)]
                      text-white/60
                    "
                  >
                    Worth Every Bite
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-10
              w-[46%]
              min-w-0
              sm:w-[47%]
              lg:h-full
              xl:w-[48%]
            "
          >
            <div
              className="
                absolute
                left-[-38%]
                top-0
                w-[155%]

                sm:left-[-31%]
                sm:w-[148%]

                md:left-[-25%]
                md:w-[140%]

                lg:left-[-21%]
                lg:w-[133%]

                xl:left-[-18%]
                xl:w-[126%]

                2xl:left-[-15%]
                2xl:w-[122%]
              "
            >
              <Image
                src="/images/hero-burger.png"
                alt="Maya Burger with fries and drink"
                width={1200}
                height={1200}
                priority
                sizes="
                  (max-width: 640px) 70vw,
                  (max-width: 1024px) 65vw,
                  60vw
                "
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOD CATEGORIES */}
      {/* ================================================= */}

      <section
        className="
          relative
          z-30
          w-full
          px-[clamp(8px,4vw,60px)]
          pb-[clamp(35px,6vw,90px)]
          pt-2
        "
      >
        <div
          className="
            category-container
            mx-auto
            flex
            w-full
            max-w-[1400px]
            items-stretch
            overflow-hidden
            rounded-[clamp(10px,1.5vw,22px)]
            bg-[#f7f7f7]
          "
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="
                  category-item
                  group
                  relative
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  text-center
                  transition-all
                  duration-300
                  hover:bg-white
                "
              >
                {/* ICON */}

                <div
                  className="
                    category-icon
                    flex
                    items-center
                    justify-center
                    text-black
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:scale-110
                    group-hover:text-yellow-400
                  "
                >
                  <Icon />
                </div>

                {/* TITLE */}

                <h3
                  className={`
                    ${bebas.className}
                    category-title
                    whitespace-nowrap
                    tracking-[0.04em]
                    text-black
                    transition-colors
                    duration-300
                  `}
                >
                  {category.name}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    category-description
                    whitespace-nowrap
                    text-neutral-600
                    transition-colors
                    duration-300
                    group-hover:text-neutral-800
                  "
                >
                  {category.description}
                </p>

                {/* SEPARATOR */}

                {index !== categories.length - 1 && (
                  <span
                    className="
                      absolute
                      right-0
                      top-1/2
                      h-[65%]
                      w-px
                      -translate-y-1/2
                      bg-yellow-400/40
                    "
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================= */}
      {/* BESTSELLERS */}
      {/* ================================================= */}

      <section
        className="
          relative
          w-full
          bg-black
          px-[clamp(14px,4vw,60px)]
          pb-[clamp(60px,8vw,120px)]
          pt-[clamp(35px,5vw,70px)]
        "
      >
        <div className="mx-auto w-full max-w-[1400px]">
          {/* ================================================= */}
          {/* SECTION HEADING */}
          {/* ================================================= */}

          <div className="mb-[clamp(24px,4vw,50px)] text-center">
            {/* POPULAR PICKS */}

            <div className="flex items-center justify-center gap-[clamp(10px,2vw,28px)]">
              <span className="popular-line popular-line-left">
                <span className="popular-point" />
              </span>

              <p
                className={`
                  ${allura.className}
                  whitespace-nowrap
                  text-[clamp(1.25rem,3vw,3rem)]
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
                mt-[clamp(7px,1vw,14px)]
                flex
                items-center
                justify-center
                gap-[clamp(6px,1vw,14px)]
                whitespace-nowrap
                text-[clamp(1.4rem,5vw,5rem)]
                leading-none
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
          {/* PRODUCTS */}
          {/* ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-[clamp(18px,2vw,28px)]
              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {bestSellers.map((product) => (
              <article
                key={product.id}
                className="
                  bestseller-card
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/20
                  bg-[#0d0d0d]
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-[4/3]
                    w-full
                    overflow-hidden
                    bg-[#111]
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1280px) 50vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      h-1/3
                      bg-gradient-to-t
                      from-[#0d0d0d]
                      to-transparent
                    "
                  />
                </div>

                {/* PRODUCT INFO */}

                <div
                  className="
                    flex
                    min-h-[190px]
                    flex-col
                    p-[clamp(16px,1.5vw,22px)]
                  "
                >
                  <h3
                    className={`
                      ${bebas.className}
                      text-[clamp(1.4rem,1.8vw,2rem)]
                      tracking-wide
                      text-white
                    `}
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[clamp(0.78rem,0.9vw,0.95rem)]
                      leading-6
                      text-white/60
                    "
                  >
                    {product.description}
                  </p>

                  {/* PRICE */}

                  <p
                    className={`
                      ${bebas.className}
                      mt-auto
                      pt-5
                      text-[clamp(1.5rem,2vw,2.1rem)]
                      tracking-wide
                      text-yellow-400
                    `}
                  >
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* ================================================= */}
          {/* VIEW FULL MENU */}
          {/* ================================================= */}

          <div className="mt-[clamp(28px,4vw,50px)] flex justify-center">
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
    </main>
  );
}