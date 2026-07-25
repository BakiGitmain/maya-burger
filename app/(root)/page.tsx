import { Allura, Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { MdDeliveryDining, MdOutlineVerified } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* ================= HERO ================= */}
      <section className="relative h-[calc(100svh-80px)] overflow-hidden">
        <div
          className="
            relative
            mx-auto
            flex
            h-full
            w-full
            max-w-[1600px]
            items-start
            px-[clamp(12px,2vw,32px)]
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
              h-full
              w-[54%]
              min-w-0
              flex-col
              pt-[clamp(8px,2vh,28px)]
              sm:w-[53%]
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
              h-full
              w-[46%]
              min-w-0
              sm:w-[47%]
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
                sizes="(max-width: 640px) 70vw,
                       (max-width: 1024px) 65vw,
                       60vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}