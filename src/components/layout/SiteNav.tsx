"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";

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
        className="pointer-events-auto fixed top-10 right-0 left-0 z-[100] flex justify-center gap-12 px-12"
      >
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
