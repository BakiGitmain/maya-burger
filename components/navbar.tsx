"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { House, Utensils, User, Phone } from "lucide-react";

import styles from "./navbar.module.css";



const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full">
      <div className="relative flex items-center w-full px-6">
        {/* DESKTOP LOGO */}
        <Link href="/" className="hidden md:block">
          <Image
            data-critical
            src="/images/maya_logo.png"
            alt="Maya Burger logo"
            width={80}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* MOBILE BURGER BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`fixed top-4 right-4 z-50 flex md:hidden ${
            styles.burgerButton
          } ${isOpen ? styles.open : ""}`}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.burgerIcon}>
            <span className={styles.topBun} />
            <span className={styles.lettuce} />
            <span className={styles.tomato} />
            <span className={styles.cheese} />
            <span className={styles.patty} />
            <span className={styles.bottomBun} />
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div
          className={`
            
            hidden md:flex
            items-center
            gap-12
            absolute
            left-1/2
            -translate-x-1/2
            text-white
            text-lg
          `}
        >
          <Link
            href="/"
            className={`
              relative pb-2
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.75
              after:bg-yellow-400
              after:transition-all
              after:duration-300
              hover:after:w-full
              ${pathname === "/" ? "after:w-full" : "after:w-0"}
            `}
          >
            Home
          </Link>

          <Link
            href="/menu"
            className={`
              relative pb-2
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.75
              after:bg-yellow-400
              after:transition-all
              after:duration-300
              hover:after:w-full
              ${pathname === "/menu" ? "after:w-full" : "after:w-0"}
            `}
          >
            Menu
          </Link>

          <Link
            href="/about"
            className={`
              relative pb-2
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.75
              after:bg-yellow-400
              after:transition-all
              after:duration-300
              hover:after:w-full
              ${pathname === "/about" ? "after:w-full" : "after:w-0"}
            `}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`
              relative pb-2
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.75
              after:bg-yellow-400
              after:transition-all
              after:duration-300
              hover:after:w-full
              ${pathname === "/contact" ? "after:w-full" : "after:w-0"}
            `}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* CLICK OUTSIDE / EMPTY SPACE */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        className={`
          md:hidden
         
          ${styles.mobileMenu}
          ${isOpen ? styles.menuOpen : ""}
        `}
      >
        {/* MOBILE LOGO */}
        <div className={styles.mobileLogo}>
          <Image
            data-critical
            src="/images/maya_logo.png"
            alt="Maya Burger"
            width={50}
            height={0}
            className="h-20 w-auto"
          />
        </div>

        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={`${styles.mobileLink} ${
            pathname === "/" ? styles.activeMobileLink : ""
          }`}
        >
          <House size={20} />
          <span>Home</span>
        </Link>

        <Link
          href="/menu"
          onClick={() => setIsOpen(false)}
          className={`${styles.mobileLink} ${
            pathname === "/menu" ? styles.activeMobileLink : ""
          }`}
        >
          <Utensils size={20} />
          <span>Menu</span>
        </Link>

        <Link
          href="/about"
          onClick={() => setIsOpen(false)}
          className={`${styles.mobileLink} ${
            pathname === "/about" ? styles.activeMobileLink : ""
          }`}
        >
          <User size={20} />
          <span>About</span>
        </Link>

        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          className={`${styles.mobileLink} ${
            pathname === "/contact" ? styles.activeMobileLink : ""
          }`}
        >
          <Phone size={20} />
          <span>Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;