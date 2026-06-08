"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed top-0 right-0 left-0 z-[99] h-28 bg-gradient-to-b from-[#0c0c0c] to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed top-0 right-0 left-0 z-[98] h-20 backdrop-blur-md bg-[#0c0c0c]/60 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        aria-label="Main"
        className="pointer-events-auto fixed top-10 right-0 left-0 z-[100] flex items-center justify-center gap-12 px-12"
      >
        <Link
          href="/"
          aria-label="Home"
          className={`absolute left-12 transition-colors duration-[250ms] ${
            pathname === "/"
              ? "text-white/85"
              : "text-white/40 hover:text-white/85"
          }`}
        >
          <HomeIcon className="h-[18px] w-[18px]" />
        </Link>
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`text-[11px] font-normal uppercase tracking-[0.12em] no-underline transition-colors duration-[250ms] ${
              isActive ? "text-white/85" : "text-white/40 hover:text-white/85"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
    </>
  );
}
