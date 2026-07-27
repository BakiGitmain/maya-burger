import { Allura, Bebas_Neue } from "next/font/google";
import Image from "next/image";

import {
  Flame,
  Heart,
  Leaf,
  Users,
} from "lucide-react";

/* ================================================= */
/* FONTS */
/* ================================================= */

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

/* ================================================= */
/* OUR STORY DATA */
/* ================================================= */

const storyItems = [
  {
    title: "STARTED WITH A DREAM",
    description: "A small grill, a big dream, and a love for real food.",
    icon: "/images/about-us/dream-icon.png",
  },
  {
    title: "BUILT ON QUALITY",
    description:
      "We use fresh ingredients and grill everything to perfection.",
    icon: "/images/about-us/quality-icon.png",
  },
  {
    title: "MADE FOR PEOPLE",
    description:
      "Good food brings people together. That’s why we do what we do.",
    icon: "/images/about-us/people-icon.png",
  },
];

/* ================================================= */
/* VALUES DATA */
/* ================================================= */

const values = [
  {
    title: "FRESH INGREDIENTS",
    description: "Handpicked daily.",
    icon: Leaf,
  },
  {
    title: "GRILLED TO PERFECTION",
    description: "Hot, juicy & smoky.",
    icon: Flame,
  },
  {
    title: "MADE WITH CARE",
    description: "We don’t rush greatness.",
    icon: Heart,
  },
  {
    title: "FOR EVERYONE",
    description: "Everyone’s welcome here.",
    icon: Users,
  },
];

/* ================================================= */
/* ABOUT US */
/* ================================================= */

const AboutUs = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        px-[14px]
        pb-[45px]
        pt-[20px]
        text-white

        lg:px-[clamp(14px,4vw,60px)]
        lg:pb-[clamp(60px,8vw,120px)]
        lg:pt-[clamp(35px,5vw,75px)]
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <div
          className="
            relative
            min-h-[300px]
            w-full

            lg:grid
            lg:min-h-0
            lg:grid-cols-[45%_55%]
            lg:items-center
          "
        >
          {/* ================================================= */}
          {/* HERO TEXT */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-20
              w-[66%]
              pt-[2px]

              lg:w-auto
              lg:pt-0
            "
          >
            {/* ABOUT US */}

            <p
              className={`
                ${allura.className}

                text-[2rem]
                leading-none
                text-yellow-400

                sm:text-[2.25rem]

                lg:text-[clamp(2rem,4vw,3.5rem)]
              `}
            >
              About Us
            </p>

            {/* ================================================= */}
            {/* MOBILE HEADING */}
            {/* ================================================= */}

            <h2
              className={`
                ${bebas.className}

                mt-[10px]
                block

                leading-[0.86]
                tracking-wide

                lg:hidden
              `}
            >
              <span
                className="
                  distressed-text
                  block

                  text-[clamp(2.2rem,9.2vw,2.8rem)]

                  [--text-color:white]
                "
              >
                MADE WITH
              </span>

              <span
                className="
                  distressed-text
                  block

                  text-[clamp(2.2rem,9.2vw,2.8rem)]

                  [--text-color:#facc15]
                "
              >
                PASSION.
              </span>

              <span
                className="
                  mt-[3px]
                  block
                  whitespace-nowrap

                  text-[clamp(1.85rem,7.4vw,2.3rem)]
                "
              >
                <span
                  className="
                    distressed-text
                    [--text-color:white]
                  "
                >
                  SERVED WITH
                </span>{" "}

                <span
                  className="
                    distressed-text
                    [--text-color:#facc15]
                  "
                >
                  PRIDE.
                </span>
              </span>
            </h2>

            {/* ================================================= */}
            {/* DESKTOP HEADING */}
            {/* ================================================= */}

            <h2
              className={`
                ${bebas.className}

                mt-[12px]
                hidden

                leading-[0.9]
                tracking-wide

                lg:block
              `}
            >
              <span
                className="
                  distressed-text
                  block
                  text-[clamp(3rem,6vw,6rem)]
                  [--text-color:white]
                "
              >
                MADE WITH{" "}
                <span className="[--text-color:#facc15]">
                  PASSION.
                </span>
              </span>

              <span
                className="
                  distressed-text
                  mt-[5px]
                  block
                  text-[clamp(3rem,6vw,6rem)]
                  [--text-color:white]
                "
              >
                SERVED WITH{" "}
                <span className="[--text-color:#facc15]">
                  PRIDE.
                </span>
              </span>
            </h2>

            {/* LINE */}

            <div
              className="
                mt-[13px]
                h-[3px]
                w-[86px]
                bg-yellow-400

                lg:mt-[20px]
                lg:h-[4px]
                lg:w-[clamp(120px,15vw,220px)]
              "
            />

            {/* DESCRIPTION */}

            <p
              className="
                mt-[14px]
                max-w-[205px]

                text-[0.69rem]
                font-medium
                leading-[1.6]

                text-white/80

                sm:max-w-[225px]
                sm:text-[0.75rem]

                lg:mt-[20px]
                lg:max-w-[430px]
                lg:text-[clamp(0.9rem,1.2vw,1.15rem)]
                lg:leading-[1.7]
              "
            >
              We’re more than just burgers.
              <br />
              We’re flavor creators, grill masters,
              <br />
              and memory makers.
            </p>
          </div>

          {/* ================================================= */}
          {/* HERO IMAGE */}
          {/* ================================================= */}

          <div
            className="
              absolute
              right-[-5%]
              top-[14px]
              z-10

              h-[280px]
              w-[64%]

              sm:right-[-2%]
              sm:h-[295px]
              sm:w-[61%]

              lg:relative
              lg:right-auto
              lg:top-auto

              lg:h-auto
              lg:min-h-[520px]
              lg:w-full
            "
          >
            <Image
              data-critical
              src="/images/about-us/about-hero.png"
              alt="Maya Burger with drink"
              fill
              sizes="
                (max-width:640px) 64vw,
                (max-width:1024px) 61vw,
                55vw
              "
              className="
                object-contain
                object-right
                lg:object-center
              "
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <div
          className="
            mt-[10px]
            grid
            w-full
            grid-cols-1
            gap-[14px]

            lg:mt-[clamp(25px,3vw,45px)]
            lg:grid-cols-[40%_1fr_23%]
          "
        >

          {/* ================================================= */}
          {/* OUR STORY */}
          {/* ================================================= */}

          <div
            className="
              relative
              min-h-[330px]
              overflow-hidden

              rounded-[16px]
              border
              border-yellow-400/30

              bg-[#070707]

              p-[14px]

              lg:min-h-0
              lg:rounded-[18px]
              lg:p-[clamp(18px,2vw,28px)]
            "
          >
            {/* TITLE */}

            <p
              className={`
                ${allura.className}

                text-[2rem]
                leading-none
                text-yellow-400

                lg:text-[clamp(2rem,3vw,3rem)]
              `}
            >
              Our Story
            </p>

            {/* ================================================= */}
            {/* STORY CONTENT */}
            {/* ================================================= */}

            <div
              className="
                mt-[16px]

                grid
                grid-cols-[48%_52%]
                gap-[3px]

                lg:mt-[28px]
                lg:grid-cols-[51%_49%]
                lg:gap-[25px]
              "
            >

              {/* ================================================= */}
              {/* TIMELINE */}
              {/* ================================================= */}

              <div className="relative">

                {storyItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="
                      relative

                      flex
                      items-start

                      gap-[7px]
                      pb-[15px]

                      lg:gap-[18px]
                      lg:pb-[38px]

                      last:pb-0
                    "
                  >
                    {/* ICON */}

                    <div
                      className="
                        relative
                        z-10

                        h-[46px]
                        w-[46px]

                        shrink-0

                        sm:h-[50px]
                        sm:w-[50px]

                        lg:h-[86px]
                        lg:w-[86px]
                      "
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="
                          (max-width:639px) 46px,
                          (max-width:1023px) 50px,
                          86px
                        "
                        className="object-contain"
                      />
                    </div>

                    {/* LINE */}

                    {index !== storyItems.length - 1 && (
                      <span
                        className="
                          absolute

                          left-[22px]
                          top-[45px]

                          h-[calc(100%-34px)]

                          border-l
                          border-dashed
                          border-white/35

                          sm:left-[24px]
                          sm:top-[49px]

                          lg:left-[42px]
                          lg:top-[85px]
                          lg:h-[calc(100%-62px)]
                          lg:border-white/45
                        "
                      />
                    )}

                    {/* TEXT */}

                    <div
                      className="
                        min-w-0
                        pt-[3px]

                        lg:pt-[9px]
                      "
                    >
                      <h3
                        className={`
                          ${bebas.className}

                          whitespace-nowrap

                          text-[0.92rem]
                          leading-none
                          tracking-[0.02em]

                          text-white

                          sm:text-[1rem]

                          lg:text-[1.4rem]
                        `}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-[6px]

                          max-w-[125px]

                          text-[0.59rem]
                          leading-[1.48]

                          text-white/70

                          sm:max-w-[140px]
                          sm:text-[0.64rem]

                          lg:mt-[10px]
                          lg:max-w-[230px]
                          lg:text-[0.84rem]
                          lg:leading-[1.65]
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* ================================================= */}
              {/* COLLAGE */}
              {/* ================================================= */}

              <div className="story-collage">

                <div className="story-photo story-photo-1">

                  <div className="story-photo-media">
                    <Image
                      data-critical
                      src="/images/about-us/story-image-1.jpg"
                      alt="Maya Burger grill story"
                      fill
                      sizes="
                        (max-width:640px) 36vw,
                        (max-width:1024px) 34vw,
                        20vw
                      "
                      className="story-photo-image"
                    />

                    <div className="story-photo-overlay" />
                  </div>

                </div>

                <div className="story-photo story-photo-2">

                  <div className="story-photo-media">
                    <Image
                      data-critical
                      src="/images/about-us/story-image-2.jpg"
                      alt="Maya Burger quality food"
                      fill
                      sizes="
                        (max-width:640px) 36vw,
                        (max-width:1024px) 34vw,
                        20vw
                      "
                      className="story-photo-image"
                    />

                    <div className="story-photo-overlay" />
                  </div>

                </div>

                <div className="story-photo story-photo-3">

                  <div className="story-photo-media">
                    <Image
                      data-critical
                      src="/images/about-us/story-image-3.jpg"
                      alt="Friends enjoying Maya Burger"
                      fill
                      sizes="
                        (max-width:640px) 36vw,
                        (max-width:1024px) 34vw,
                        20vw
                      "
                      className="story-photo-image"
                    />

                    <div className="story-photo-overlay" />
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* VALUES */}
          {/* ================================================= */}

          <div
            className="
              relative

              overflow-hidden

              bg-black

              px-0
              pb-[8px]
              pt-[4px]

              lg:rounded-[18px]
              lg:border
              lg:border-yellow-400/25
              lg:bg-[#070707]

              lg:px-[clamp(12px,1.6vw,22px)]
              lg:pb-[clamp(20px,2vw,28px)]
              lg:pt-[clamp(14px,1.6vw,22px)]
            "
          >

            {/* PAINT */}

            <div className="values-title-texture">

              <p
                className={`
                  ${allura.className}
                  values-title-text

                  text-[1.15rem]

                  sm:text-[1.28rem]

                  lg:text-[clamp(1.7rem,2.2vw,2.4rem)]
                `}
              >
                <span>Real Ingredients.</span>
                <span>Real Satisfaction.</span>
              </p>

            </div>

            {/* ================================================= */}
            {/* ALL 4 VALUES IN ONE ROW ON MOBILE */}
            {/* ================================================= */}

            <div
              className="
                relative

                mt-[8px]

                grid
                grid-cols-4

                lg:mt-[70px]
                lg:grid-cols-4
              "
            >

              {values.map((value, index) => {

                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="
                      relative

                      flex
                      min-h-[118px]
                      min-w-0

                      flex-col
                      items-center
                      justify-start

                      px-[3px]
                      pt-[8px]

                      text-center

                      lg:min-h-[180px]
                      lg:justify-center
                      lg:px-[10px]
                      lg:pt-0
                    "
                  >
                    {/* DIVIDER */}

                    {index !== 0 && (
                      <span
                        className="
                          absolute

                          left-0
                          top-[8%]

                          h-[78%]
                          w-px

                          bg-white/25

                          lg:top-[13%]
                          lg:h-[74%]
                        "
                      />
                    )}

                    {/* ICON */}

                    <Icon
                      className="
                        h-[32px]
                        w-[32px]

                        shrink-0

                        text-yellow-400

                        sm:h-[35px]
                        sm:w-[35px]

                        lg:h-[48px]
                        lg:w-[48px]
                      "
                      strokeWidth={1.7}
                    />

                    {/* TITLE */}

                    <h3
                      className={`
                        ${bebas.className}

                        mt-[9px]

                        text-[0.68rem]
                        leading-[1.05]

                        text-white

                        sm:text-[0.75rem]

                        lg:mt-[16px]
                        lg:text-[1.25rem]
                        lg:leading-[1]
                        lg:tracking-wide
                      `}
                    >
                      {value.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-[6px]

                        max-w-[80px]

                        text-[0.49rem]
                        leading-[1.35]

                        text-white/65

                        sm:max-w-[90px]
                        sm:text-[0.54rem]

                        lg:mt-[10px]
                        lg:max-w-none
                        lg:text-[0.75rem]
                        lg:leading-[1.45]
                      "
                    >
                      {value.description}
                    </p>

                  </div>
                );
              })}

            </div>
          </div>

          {/* ================================================= */}
          {/* FAMILY CARD */}
          {/* ================================================= */}

          <div
            className="
              relative

              rounded-[14px]
              border
              border-yellow-400/25

              bg-[#070707]

              px-[12px]
              py-[12px]

              lg:flex
              lg:h-full
              lg:min-h-[420px]
              lg:flex-col

              lg:rounded-[18px]

              lg:px-[clamp(18px,1.8vw,28px)]
              lg:py-[clamp(24px,2vw,32px)]
            "
          >

            {/* ================================================= */}
            {/* TOP */}
            {/* ================================================= */}

            <div
              className="
                grid

                grid-cols-[64px_1px_minmax(0,1fr)]

                items-center
                gap-[10px]

                lg:grid-cols-[clamp(96px,7vw,112px)_1px_minmax(0,1fr)]
                lg:gap-[clamp(12px,1.1vw,18px)]
              "
            >

              {/* BADGE */}

              <div
                className="
                  relative

                  h-[64px]
                  w-[64px]

                  lg:h-[clamp(96px,7vw,112px)]
                  lg:w-[clamp(96px,7vw,112px)]
                "
              >
                <Image
                  data-critical
                  src="/images/about-us/cravings-badge.png"
                  alt="Cravings satisfied"
                  fill
                  sizes="
                    (max-width:1023px) 64px,
                    112px
                  "
                  className="object-contain"
                />
              </div>

              {/* DIVIDER */}

              <span
                className="
                  h-[65px]
                  w-px

                  bg-white/45

                  lg:h-[clamp(105px,8vw,125px)]
                "
              />

              {/* PROMISE */}

              <p
                className="
                  min-w-0

                  text-[0.59rem]
                  font-medium
                  leading-[1.48]

                  text-white/85

                  sm:text-[0.64rem]

                  lg:text-[clamp(0.78rem,0.82vw,0.94rem)]
                  lg:leading-[1.6]
                "
              >
                From our grill
                <br />
                to your hands,
                <br />
                we promise great food,
                <br />
                every time.
              </p>

            </div>

            {/* ================================================= */}
            {/* MOBILE MESSAGE + HEART */}
            {/* ================================================= */}

            <div
              className="
                mt-[9px]

                flex
                items-end
                justify-between

                gap-[10px]

                lg:mt-[clamp(38px,3.2vw,58px)]
                lg:flex-1
                lg:flex-col
                lg:items-start
              "
            >

              {/* MESSAGE */}

              <p
                className={`
                  ${allura.className}

                  text-[1.08rem]
                  leading-[1.02]

                  text-yellow-400

                  sm:text-[1.2rem]

                  lg:text-[clamp(1.8rem,2vw,2.35rem)]
                  lg:leading-[1.18]
                `}
              >
                <span className="lg:hidden">
                  Thank you for being part of the Maya Burger family.
                </span>

                <span className="hidden lg:block">
                  Thank you for being
                  <br />
                  part of the
                  <br />
                  Maya Burger family.
                </span>
              </p>

              {/* HEART */}

              <Heart
                className="
                  h-[25px]
                  w-[25px]

                  shrink-0

                  text-yellow-400

                  lg:mt-auto
                  lg:h-[48px]
                  lg:w-[48px]
                  lg:self-center
                "
                strokeWidth={1.65}
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;