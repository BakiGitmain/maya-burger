import { Allura, Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  Sandwich,
  Smile,
} from "lucide-react";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

/* ================================================= */
/* WHY CHOOSE US FEATURES */
/* ================================================= */

const features = [
  {
    title: "GRILLED TO PERFECTION",
    description: "Flame-grilled for that smoky, juicy, irresistible taste.",
    icon: "/images/why-choose-us/grilled-icon.png",
  },
  {
    title: "FRESH INGREDIENTS",
    description:
      "We handpick the best ingredients daily for maximum freshness.",
    icon: "/images/why-choose-us/fresh-icon.png",
  },
  {
    title: "BOLD & UNIQUE FLAVORS",
    description:
      "Our recipes are crafted to bring you flavors you'll crave again.",
    icon: "/images/why-choose-us/flavor-icon.png",
  },
  {
    title: "FAST & HOT DELIVERY",
    description:
      "Your favorite meals, delivered fast and fresh to your door.",
    icon: "/images/why-choose-us/delivery-icon.png",
  },
];

/* ================================================= */
/* STATS */
/* ================================================= */

const stats = [
  {
    value: "500+",
    label: "Burgers Served",
    icon: Sandwich,
  },
  {
    value: "250+",
    label: "Happy Customers",
    icon: Smile,
  },
  {
    value: "100%",
    label: "Quality Ingredients",
    icon: BadgeCheck,
  },
  {
    value: "1+",
    label: "Locations",
    icon: MapPin,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="
        relative
        w-full
        bg-black
        px-[clamp(10px,4vw,60px)]
        pb-[clamp(60px,8vw,120px)]
        pt-[clamp(28px,4vw,65px)]
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}

        <div className="mb-[clamp(24px,4vw,52px)] text-center">
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
              Why Choose Us
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
              gap-[clamp(6px,0.9vw,14px)]
              whitespace-nowrap
              text-[clamp(2.15rem,5vw,5rem)]
              leading-[0.9]
              tracking-wide
            `}
          >
            <span className="distressed-text [--text-color:white]">
              MADE TO
            </span>

            <span className="distressed-text [--text-color:#facc15]">
              SATISFY
            </span>
          </h2>
        </div>

        {/* ================================================= */}
        {/* MAIN FEATURE AREA */}
        {/* ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-[10px]

            lg:min-h-[410px]
            lg:flex-row
            lg:gap-[clamp(10px,1vw,18px)]
            lg:overflow-hidden
            lg:rounded-[clamp(14px,1.4vw,20px)]
            lg:border
            lg:border-white/25
          "
        >
          {/* ================================================= */}
          {/* LEFT FEATURE */}
          {/* ================================================= */}

          <div
            className="
              relative
              min-h-[270px]
              w-full
              overflow-hidden
              rounded-[16px]
              border
              border-white/25
              bg-black

              sm:min-h-[310px]

              lg:min-h-0
              lg:w-[57%]
              lg:shrink-0
              lg:rounded-none
              lg:border-0
            "
          >
            {/* BURGER IMAGE */}

            <div
              className="
                pointer-events-none
                absolute
                right-[-5%]
                top-[4%]
                z-10
                h-[76%]
                w-[66%]

                sm:right-[-2%]
                sm:top-[2%]
                sm:h-[80%]
                sm:w-[64%]

                md:right-[1%]
                md:w-[61%]

                lg:inset-y-0
                lg:right-[-1%]
                lg:top-auto
                lg:h-full
                lg:w-[65%]

                xl:right-0
                xl:w-[64%]
              "
            >
              <div className="relative h-full w-full">
                <Image
                  data-critical
                  src="/images/why-choose-us-burgerv2.png"
                  alt="Maya Burger"
                  fill
                  sizes="
                    (max-width: 640px) 65vw,
                    (max-width: 1024px) 60vw,
                    40vw
                  "
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* LEFT TEXT */}

            <div
              className="
                relative
                z-20
                flex
                min-h-[270px]
                w-[53%]
                flex-col
                px-[clamp(18px,5vw,30px)]
                py-[clamp(22px,5vw,32px)]

                sm:min-h-[310px]
                sm:w-[49%]

                md:w-[46%]

                lg:h-full
                lg:min-h-0
                lg:w-[42%]
                lg:justify-center
                lg:px-0
                lg:py-[clamp(20px,2vw,34px)]
                lg:pl-[clamp(24px,2.6vw,38px)]
                lg:pr-[6px]
              "
            >
              <h3
                className={`
                  ${bebas.className}
                  whitespace-nowrap
                  text-[clamp(1.8rem,7.4vw,2.65rem)]
                  leading-[0.91]
                  tracking-wide

                  lg:text-[clamp(2.1rem,2.8vw,3.35rem)]
                `}
              >
                <span className="distressed-text block [--text-color:white]">
                  FLAVOR IN
                </span>

                <span
                  className="
                    distressed-text
                    mt-[4px]
                    block
                    [--text-color:#facc15]
                  "
                >
                  EVERY BITE
                </span>
              </h3>

              <div
                className="
                  why-bite-line
                  mt-[clamp(10px,3vw,16px)]
                  h-[3px]
                  w-[clamp(55px,15vw,85px)]

                  lg:mt-[clamp(10px,1.2vw,18px)]
                  lg:w-[clamp(55px,5vw,82px)]
                "
              />

              <p
                className="
                  mt-[clamp(12px,3.5vw,20px)]
                  max-w-[230px]
                  text-[clamp(0.68rem,2.6vw,0.84rem)]
                  font-medium
                  leading-[1.55]
                  text-white/80

                  sm:max-w-[250px]

                  lg:mt-[clamp(12px,1.5vw,22px)]
                  lg:max-w-[250px]
                  lg:text-[clamp(0.68rem,0.85vw,0.92rem)]
                  lg:leading-[1.7]
                "
              >
                We use the freshest ingredients, expertly prepared to deliver
                bold flavors in every bite.
              </p>

              <Link
                href="/menu"
                className="
                  menu-texture-button
                  group
                  relative
                  mt-auto
                  -ml-[8px]
                  flex
                  h-[46px]
                  w-[170px]
                  shrink-0
                  items-center
                  justify-center

                  sm:h-[50px]
                  sm:w-[190px]

                  lg:mt-[clamp(18px,2.2vw,34px)]
                  lg:-ml-[clamp(5px,1vw,15px)]
                  lg:h-[clamp(42px,4vw,60px)]
                  lg:w-[clamp(155px,15vw,220px)]
                "
              >
                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    gap-[7px]
                    whitespace-nowrap
                    text-[0.68rem]
                    font-bold
                    text-black

                    sm:text-[0.74rem]

                    lg:gap-[clamp(6px,0.8vw,12px)]
                    lg:text-[clamp(0.62rem,0.85vw,0.92rem)]
                  "
                >
                  EXPLORE MENU

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:translate-x-1.5
                    "
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT FEATURES */}
          {/* ================================================= */}

          <div
            className="
              relative
              grid
              w-full
              min-w-0
              grid-cols-1
              grid-rows-4
              gap-[6px]

              lg:w-[43%]
              lg:grid-cols-2
              lg:grid-rows-2
              lg:gap-0
              lg:py-[clamp(8px,1vw,14px)]
              lg:pr-[clamp(8px,1vw,14px)]
            "
          >
            <span
              className="
                feature-cross-vertical
                pointer-events-none
                absolute
                left-1/2
                top-[4%]
                hidden
                h-[92%]
                w-[2px]
                -translate-x-1/2
                lg:block
              "
            />

            <span
              className="
                feature-cross-horizontal
                pointer-events-none
                absolute
                left-[2%]
                top-1/2
                hidden
                h-[2px]
                w-[96%]
                -translate-y-1/2
                lg:block
              "
            />

            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  z-10
                  flex
                  min-h-[82px]
                  w-full
                  items-center
                  rounded-[12px]
                  border
                  border-white/20
                  bg-[#050505]
                  px-[12px]
                  py-[9px]
                  transition-colors
                  duration-300

                  hover:bg-white/[0.025]

                  sm:min-h-[90px]
                  sm:px-[16px]

                  lg:min-h-0
                  lg:flex-col
                  lg:justify-center
                  lg:rounded-none
                  lg:border-0
                  lg:bg-transparent
                  lg:px-[clamp(10px,1.1vw,18px)]
                  lg:py-[clamp(12px,1vw,18px)]
                "
              >
                <div
                  className="
                    relative
                    h-[58px]
                    w-[58px]
                    shrink-0

                    sm:h-[64px]
                    sm:w-[64px]

                    lg:h-[clamp(62px,4.8vw,82px)]
                    lg:w-[clamp(62px,4.8vw,82px)]
                  "
                >
                  <Image
                    data-critical
                    src={feature.icon}
                    alt=""
                    fill
                    sizes="(max-width:1023px) 64px, 82px"
                    className="
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-[1.05]
                    "
                  />
                </div>

                <div
                  className="
                    ml-[12px]
                    min-w-0
                    flex-1

                    lg:ml-0
                    lg:mt-[clamp(5px,0.7vw,10px)]
                    lg:flex-none
                    lg:text-center
                  "
                >
                  <h3
                    className={`
                      ${bebas.className}
                      whitespace-nowrap
                      text-[1.08rem]
                      leading-none
                      tracking-[0.025em]
                      text-white

                      sm:text-[1.2rem]

                      lg:text-[clamp(1.05rem,1.35vw,1.5rem)]
                    `}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-[4px]
                      max-w-[330px]
                      text-[0.68rem]
                      leading-[1.35]
                      text-white/70

                      sm:text-[0.76rem]
                      sm:leading-[1.4]

                      lg:mx-auto
                      lg:mt-[clamp(4px,0.4vw,7px)]
                      lg:max-w-[200px]
                      lg:text-[clamp(0.6rem,0.72vw,0.8rem)]
                      lg:leading-[1.5]
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================= */}
        {/* COMBO BANNER */}
        {/* ================================================= */}

        <div
          className="
            relative
            mt-[clamp(12px,1.5vw,20px)]
            w-full
            overflow-hidden
            rounded-[clamp(12px,1.2vw,18px)]
            border
            border-white/25
            bg-black

            min-h-[330px]

            sm:min-h-[360px]

            lg:min-h-0
            lg:h-[clamp(190px,14vw,225px)]
          "
        >
          {/* LEFT TEXTURE */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-2%]
              left-[-2%]
              z-0
              h-[38%]
              w-[34%]

              sm:h-[42%]
              sm:w-[28%]

              lg:bottom-0
              lg:left-0
              lg:h-full
              lg:w-[18%]
            "
          >
            <Image
              data-critical
              src="/images/why-choose-us/combo-left-texture.png"
              alt=""
              fill
              sizes="
                (max-width:640px) 34vw,
                (max-width:1024px) 28vw,
                18vw
              "
              className="object-contain object-left-bottom"
            />
          </div>

          {/* RIGHT TEXTURE */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-2%]
              top-[-2%]
              z-0
              h-[42%]
              w-[38%]

              sm:h-[46%]
              sm:w-[30%]

              lg:right-0
              lg:top-0
              lg:h-full
              lg:w-[19%]
            "
          >
            <Image
              data-critical
              src="/images/why-choose-us/combo-right-texture.png"
              alt=""
              fill
              sizes="
                (max-width:640px) 38vw,
                (max-width:1024px) 30vw,
                19vw
              "
              className="object-contain object-right-top"
            />
          </div>

          {/* COMBO CONTENT */}

          <div
            className="
              relative
              z-10
              grid
              h-full
              w-full
              grid-cols-12
              grid-rows-[165px_auto]
              px-[10px]
              pb-[16px]
              pt-[10px]

              sm:grid-rows-[185px_auto]
              sm:px-[18px]
              sm:pb-[18px]

              lg:grid-cols-[24%_1fr_27%]
              lg:grid-rows-1
              lg:items-center
              lg:px-[clamp(14px,1.4vw,22px)]
              lg:py-0
            "
          >
            {/* SPECIAL COMBO */}

            <div
              className="
                relative
                z-20
                col-span-5
                row-start-1
                flex
                h-full
                items-center
                justify-center

                lg:col-auto
                lg:row-auto
              "
            >
              <div
                className="
                  relative
                  h-[clamp(125px,34vw,165px)]
                  w-[clamp(125px,34vw,165px)]

                  sm:h-[175px]
                  sm:w-[175px]

                  lg:h-[clamp(175px,13.5vw,220px)]
                  lg:w-[clamp(175px,13.5vw,220px)]

                  xl:h-[220px]
                  xl:w-[220px]
                "
              >
                <Image
                  data-critical
                  src="/images/why-choose-us/special-combo.png"
                  alt="Special Combo Deal"
                  fill
                  sizes="
                    (max-width:640px) 165px,
                    (max-width:1024px) 175px,
                    220px
                  "
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* COMBO FOOD */}

            <div
              className="
                relative
                col-span-7
                row-start-1
                -ml-[12%]
                h-full
                min-w-0

                sm:-ml-[8%]

                lg:col-auto
                lg:row-auto
                lg:-ml-[5%]
                lg:h-[112%]

                xl:-ml-[3%]
                xl:h-[118%]
              "
            >
              <Image
                data-critical
                src="/images/why-choose-us/combo-food.png"
                alt="Maya Burger combo with burger, fries and drink"
                fill
                sizes="
                  (max-width:640px) 65vw,
                  (max-width:1024px) 60vw,
                  48vw
                "
                className="
                  object-contain
                  object-center

                  lg:scale-[1.12]
                  xl:scale-[1.16]
                "
              />
            </div>

            {/* PRICE + CTA */}

            <div
              className="
                relative
                z-20
                col-span-12
                row-start-2
                flex
                flex-col
                items-center
                justify-center
                -mt-[4px]

                lg:col-auto
                lg:row-auto
                lg:mt-0
                lg:h-full
              "
            >
              <p
                className={`
                  ${allura.className}
                  whitespace-nowrap
                  text-center
                  text-[clamp(1.5rem,6vw,2rem)]
                  leading-none
                  text-yellow-400

                  sm:text-[2.15rem]

                  lg:text-[clamp(1.45rem,2vw,2.15rem)]
                `}
              >
                Burger + Fries + Drink
              </p>

              <div
                className={`
                  ${bebas.className}
                  mt-[5px]
                  flex
                  items-end
                  justify-center
                  whitespace-nowrap
                  leading-none
                `}
              >
                <span
                  className="
                    mr-[7px]
                    text-[clamp(1.35rem,5vw,1.8rem)]
                    text-white

                    sm:text-[2rem]

                    lg:text-[clamp(1.45rem,1.8vw,1.95rem)]
                  "
                >
                  ONLY
                </span>

                <span
                  className="
                    text-[clamp(2.9rem,11vw,4rem)]
                    text-yellow-400

                    sm:text-[4.5rem]

                    lg:text-[clamp(3rem,4vw,4.4rem)]
                  "
                >
                  340
                </span>

                <span
                  className="
                    mb-[5px]
                    ml-[5px]
                    text-[clamp(0.78rem,3vw,1rem)]
                    tracking-wide
                    text-yellow-400

                    sm:mb-[7px]
                    sm:text-[1.15rem]

                    lg:text-[clamp(0.8rem,1vw,1.05rem)]
                  "
                >
                  BIRR
                </span>
              </div>

              <Link
                href="/contact"
                className="
                  menu-texture-button
                  group
                  relative
                  mt-[7px]
                  flex
                  h-[46px]
                  w-[185px]
                  items-center
                  justify-center

                  sm:h-[50px]
                  sm:w-[215px]

                  lg:mt-[clamp(6px,0.7vw,10px)]
                  lg:h-[clamp(40px,3.3vw,50px)]
                  lg:w-[clamp(170px,15vw,220px)]
                "
              >
                <span
                  className={`
                    ${bebas.className}
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    whitespace-nowrap
                    text-[0.95rem]
                    tracking-wide
                    text-black

                    sm:text-[1.05rem]

                    lg:text-[clamp(0.85rem,1vw,1.05rem)]
                  `}
                >
                  CONTACT NOW

                  <ArrowRight
                    className="
                      h-[16px]
                      w-[16px]
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:translate-x-1.5

                      sm:h-[18px]
                      sm:w-[18px]
                    "
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div
          className="
            relative
            mt-[clamp(14px,2vw,26px)]
            w-full
            overflow-hidden

            rounded-[16px]
            border
            border-white/25
            bg-black

            lg:rounded-none
            lg:border-0
          "
        >
          {/* ================================================= */}
          {/* MOBILE CROSS */}
          {/* ================================================= */}

          <span
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[5%]
              z-20
              h-[90%]
              w-px
              -translate-x-1/2
              bg-white/25

              lg:hidden
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              left-[2%]
              top-1/2
              z-20
              h-px
              w-[96%]
              -translate-y-1/2
              bg-white/25

              lg:hidden
            "
          />

          {/* ================================================= */}
          {/* DESKTOP DIVIDERS */}
          {/* ================================================= */}

          <span
            className="
              pointer-events-none
              absolute
              left-1/4
              top-[18%]
              z-20
              hidden
              h-[64%]
              w-px
              bg-white/25

              lg:block
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[18%]
              z-20
              hidden
              h-[64%]
              w-px
              -translate-x-1/2
              bg-white/25

              lg:block
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              left-3/4
              top-[18%]
              z-20
              hidden
              h-[64%]
              w-px
              bg-white/25

              lg:block
            "
          />

          {/* ================================================= */}
          {/* STATS GRID */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-10

              grid
              grid-cols-2

              lg:grid-cols-4
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="
                    flex
                    min-h-[112px]
                    min-w-0
                    items-center

                    gap-[clamp(10px,3vw,18px)]

                    px-[clamp(14px,4vw,26px)]
                    py-[18px]

                    sm:min-h-[125px]

                    lg:min-h-[105px]
                    lg:justify-center
                    lg:gap-[clamp(10px,1vw,16px)]
                    lg:px-[clamp(14px,2vw,26px)]
                    lg:py-[15px]
                  "
                >
                  {/* ICON */}

                  <Icon
                    strokeWidth={2.2}
                    className="
                      h-[clamp(44px,12vw,58px)]
                      w-[clamp(44px,12vw,58px)]

                      shrink-0

                      text-yellow-400

                      lg:h-[clamp(42px,3.4vw,54px)]
                      lg:w-[clamp(42px,3.4vw,54px)]
                    "
                  />

                  {/* TEXT */}

                  <div className="min-w-0">
                    <p
                      className="
                        whitespace-nowrap

                        text-[clamp(1.45rem,6vw,2rem)]
                        font-extrabold
                        leading-none

                        text-white

                        lg:text-[clamp(1.5rem,2.1vw,2rem)]
                      "
                    >
                      {stat.value}
                    </p>

                    <p
                      className="
                        mt-[6px]

                        whitespace-nowrap

                        text-[clamp(0.62rem,2.5vw,0.82rem)]
                        font-medium
                        leading-none

                        text-white/70

                        lg:text-[clamp(0.65rem,0.8vw,0.8rem)]
                      "
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;