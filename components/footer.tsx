import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";

import {
  ChevronRight,
  Clock3,
  Heart,
  House,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sandwich,
  UserRound,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

/* ================================================= */
/* FONT */
/* ================================================= */

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

/* ================================================= */
/* MAP */
/* ================================================= */

const MAYA_BURGER_MAP =
  "https://www.google.com/maps?q=8.5621621,39.2710098&z=16&output=embed";

const MAYA_BURGER_MAP_LINK =
  "https://maps.app.goo.gl/rFpgWWbNP7C6dpcp9?g_st=ic";

/* ================================================= */
/* DATA */
/* ================================================= */

const openingHours = [
  { day: "Monday", time: "11:00 AM – 10:00 PM" },
  { day: "Tuesday", time: "11:00 AM – 10:00 PM" },
  { day: "Wednesday", time: "11:00 AM – 10:00 PM" },
  { day: "Thursday", time: "11:00 AM – 11:00 PM" },
  { day: "Friday", time: "11:00 AM – 11:00 PM" },
  { day: "Saturday", time: "11:00 AM – 11:00 PM" },
  { day: "Sunday", time: "11:00 AM – 10:00 PM" },
];

const quickLinks = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: Menu,
  },
  {
    name: "About Us",
    href: "/#about",
    icon: UserRound,
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: Phone,
  },
];

/* ================================================= */
/* FOOTER */
/* ================================================= */

const Footer = () => {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        px-[12px]
        pb-[18px]
        pt-[30px]
        text-white

        sm:px-[20px]

        lg:px-[clamp(20px,2vw,34px)]
        lg:pb-[28px]
        lg:pt-[55px]
      "
    >
      {/* ================================================= */}
      {/* MAIN FOOTER SHELL */}
      {/* ================================================= */}

      <div
        className="
          maya-footer-shell
          relative
          mx-auto
          w-full
          max-w-[1600px]
          overflow-hidden
          rounded-[22px]
          border
          border-yellow-500/35
          bg-[#050505]
        "
      >
        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            gap-[38px]
            px-[20px]
            py-[34px]

            sm:grid-cols-2
            sm:px-[28px]

            lg:grid-cols-3
            lg:gap-[34px]
            lg:px-[44px]
            lg:py-[58px]

            xl:grid-cols-[0.95fr_1fr_1.55fr_1.05fr_0.95fr]
            xl:gap-[42px]

            2xl:px-[70px]
          "
        >
          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="relative">
            <Sandwich
              strokeWidth={1.8}
              className="
                mb-[12px]
                h-[62px]
                w-[62px]
                text-yellow-400

                lg:h-[78px]
                lg:w-[78px]
              "
            />

            <div className={bebas.className}>
              <h2
                className="
                  distressed-text
                  text-[3.6rem]
                  leading-[0.8]
                  [--text-color:white]

                  lg:text-[4.5rem]
                "
              >
                MAYA
              </h2>

              <h2
                className="
                  distressed-text
                  text-[3.6rem]
                  leading-[0.88]
                  [--text-color:#facc15]

                  lg:text-[4.5rem]
                "
              >
                BURGER
              </h2>
            </div>

            <div className="footer-brand-brush" />

            <p
              className="
                mt-[24px]
                max-w-[220px]
                text-[0.9rem]
                leading-[1.7]
                text-white/75
              "
            >
              Fresh. Juicy. Satisfying.
              <br />
              Burgers made the right way.
            </p>

            <Sandwich
              strokeWidth={1}
              className="
                mt-[35px]
                hidden
                h-[130px]
                w-[170px]
                text-white/[0.035]

                xl:block
              "
            />
          </div>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <div>
            <FooterTitle title="Contact Us" />

            <div className="mt-[26px] space-y-[20px]">
              {/* PHONE */}

              <div className="flex items-center gap-[13px]">
                <div className="footer-icon-box">
                  <Phone className="h-[24px] w-[24px]" />
                </div>

                <div>
                  <p className="text-[0.9rem] font-medium text-white">
                    +251 9XX XXX XXX
                  </p>

                  <p className="mt-[3px] text-[0.75rem] text-white/50">
                    Call us anytime
                  </p>
                </div>
              </div>

              {/* EMAIL */}

              <div className="flex items-center gap-[13px]">
                <div className="footer-icon-box">
                  <Mail className="h-[23px] w-[23px]" />
                </div>

                <div>
                  <p className="text-[0.9rem] font-medium text-white">
                    hello@mayaburger.com
                  </p>

                  <p className="mt-[3px] text-[0.75rem] text-white/50">
                    We reply fast!
                  </p>
                </div>
              </div>
            </div>

            <div className="my-[26px] h-px w-full bg-white/15" />

            {/* SOCIALS */}

            <FooterTitle title="Follow Us" />

            <div className="mt-[18px] flex gap-[10px]">
              <SocialButton label="Instagram">
                <FaInstagram />
              </SocialButton>

              <SocialButton label="Facebook">
                <FaFacebookF />
              </SocialButton>

              <SocialButton label="X">
                <FaXTwitter />
              </SocialButton>

              <SocialButton label="TikTok">
                <FaTiktok />
              </SocialButton>
            </div>
          </div>

          {/* ================================================= */}
          {/* LOCATION */}
          {/* ================================================= */}

          <div>
            <FooterTitle title="Location" />

            <div
              className="
                mt-[26px]
                flex
                items-start
                gap-[14px]
              "
            >
              <div className="footer-icon-box shrink-0">
                <MapPin className="h-[25px] w-[25px]" />
              </div>

              <div>
                <p
                  className="
                    text-[0.92rem]
                    leading-[1.65]
                    text-white/85
                  "
                >
                  Maya Burger
                  <br />
                  Ethiopia
                </p>

                <a
                  href={MAYA_BURGER_MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-[6px]
                    inline-block
                    text-[0.75rem]
                    font-medium
                    text-yellow-400
                    transition-opacity
                    hover:opacity-75
                  "
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* ================================================= */}
            {/* REAL GOOGLE MAP - NO API KEY */}
            {/* ================================================= */}

            <div className="maya-footer-map mt-[24px]">
              <iframe
                title="Maya Burger location"
                src={MAYA_BURGER_MAP}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
              />

              {/* ================================================= */}
              {/* MAP LABEL */}
              {/* ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[18px]
                  right-[14px]
                  z-10
                  hidden
                  max-w-[180px]
                  rounded-[12px]
                  border
                  border-white/15
                  bg-black/85
                  px-[15px]
                  py-[12px]
                  backdrop-blur-md

                  sm:block
                "
              >
                <p
                  className={`
                    ${bebas.className}
                    text-[1.25rem]
                    tracking-wide
                    text-yellow-400
                  `}
                >
                  Maya Burger
                </p>

                <p
                  className="
                    mt-[3px]
                    text-[0.68rem]
                    leading-[1.45]
                    text-white/70
                  "
                >
                  Find us here
                  <br />
                  Ethiopia
                </p>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* OPENING HOURS */}
          {/* ================================================= */}

          <div>
            <FooterTitle title="Opening Hours" />

            <div className="mt-[25px]">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-[12px]
                    border-b
                    border-white/10
                    py-[9px]
                    text-[0.75rem]

                    last:border-none
                  "
                >
                  <span className="font-medium text-white/85">
                    {item.day}
                  </span>

                  <span className="whitespace-nowrap text-white/65">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* HUNGER BOX */}

            <div
              className="
                mt-[30px]
                flex
                items-center
                gap-[13px]
                rounded-[14px]
                border
                border-yellow-500/25
                bg-yellow-400/[0.045]
                px-[16px]
                py-[14px]
              "
            >
              <Clock3
                className="
                  h-[35px]
                  w-[35px]
                  shrink-0
                  text-yellow-400
                "
              />

              <p
                className={`
                  ${bebas.className}
                  text-[1rem]
                  leading-[1.05]
                  tracking-wide
                  text-yellow-400
                `}
              >
                We Never Close
                <br />
                On Hunger!
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* QUICK LINKS */}
          {/* ================================================= */}

          <div>
            <FooterTitle title="Quick Links" />

            <div className="mt-[22px]">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="
                      group
                      flex
                      items-center
                      border-b
                      border-white/10
                      py-[13px]
                      transition-colors

                      last:border-none
                      hover:text-yellow-400
                    "
                  >
                    <Icon
                      className="
                        mr-[14px]
                        h-[23px]
                        w-[23px]
                        text-white/55
                        transition-colors

                        group-hover:text-yellow-400
                      "
                    />

                    <span className="text-[0.9rem]">
                      {link.name}
                    </span>

                    <ChevronRight
                      className="
                        ml-auto
                        h-[18px]
                        w-[18px]
                        text-yellow-400
                        transition-transform

                        group-hover:translate-x-[3px]
                      "
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA */}

            <div
              className="
                mt-[28px]
                rounded-[16px]
                border
                border-yellow-500/25
                bg-yellow-400/[0.04]
                px-[16px]
                py-[20px]
                text-center
              "
            >
              <Sandwich
                className="
                  mx-auto
                  h-[35px]
                  w-[35px]
                  text-yellow-400
                "
              />

              <p
                className={`
                  ${bebas.className}
                  mt-[12px]
                  text-[1rem]
                  tracking-wide
                  text-white
                `}
              >
                Craving Something
              </p>

              <p
                className={`
                  ${bebas.className}
                  mt-[1px]
                  text-[2rem]
                  leading-none
                  text-yellow-400
                `}
              >
                Amazing?
              </p>

              <Link
                href="/menu"
                className="
                  footer-order-button
                  mt-[18px]
                  inline-flex
                  min-h-[45px]
                  w-full
                  items-center
                  justify-center
                  px-[22px]
                  text-center
                  text-[0.9rem]
                  font-black
                  uppercase
                  text-black
                "
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM BAR */}
        {/* ================================================= */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-[24px]
            border-t
            border-yellow-500/35
            px-[20px]
            py-[20px]

            sm:px-[28px]

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-[44px]

            2xl:px-[70px]
          "
        >
          {/* LEFT */}

          <div className="flex items-center gap-[14px]">
            <div className="relative h-[55px] w-[55px] shrink-0">
              <Image
                data-critical
                src="/images/maya_logo.png"
                alt="Maya Burger"
                fill
                sizes="55px"
                className="object-contain"
              />
            </div>

            <div
              className="
                text-[0.7rem]
                leading-[1.7]
                text-white/55
              "
            >
              <p>
                © {new Date().getFullYear()} Maya Burger. All rights reserved.
              </p>

              <p className="flex items-center gap-[5px]">
                Made with
                <Heart
                  className="
                    h-[13px]
                    w-[13px]
                    fill-yellow-400
                    text-yellow-400
                  "
                />
                for burger lovers.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-[18px]
              gap-y-[8px]
              text-[0.7rem]
              text-white/55

              lg:justify-end
            "
          >
            <Link href="#" className="footer-bottom-link">
              Privacy Policy
            </Link>

            <span className="hidden h-[18px] w-px bg-white/20 sm:block" />

            <Link href="#" className="footer-bottom-link">
              Terms & Conditions
            </Link>

            <span className="hidden h-[18px] w-px bg-white/20 sm:block" />

            <Link href="#" className="footer-bottom-link">
              Refund Policy
            </Link>

            <span className="hidden h-[18px] w-px bg-white/20 sm:block" />

            <Link href="#" className="footer-bottom-link">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================================================= */
/* TITLE */
/* ================================================= */

const FooterTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h3
        className={`
          ${bebas.className}
          text-[1.45rem]
          tracking-wide
          text-yellow-400
        `}
      >
        {title}
      </h3>

      <span
        className="
          mt-[8px]
          block
          h-[2px]
          w-[32px]
          bg-yellow-400
        "
      />
    </div>
  );
};

/* ================================================= */
/* SOCIAL BUTTON */
/* ================================================= */

const SocialButton = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <Link
      href="#"
      aria-label={label}
      className="
        flex
        h-[40px]
        w-[40px]
        items-center
        justify-center
        rounded-full
        border
        border-white/35
        text-yellow-400
        transition-all
        duration-300

        hover:-translate-y-[3px]
        hover:border-yellow-400
        hover:bg-yellow-400
        hover:text-black
      "
    >
      <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">
        {children}
      </span>
    </Link>
  );
};

export default Footer;