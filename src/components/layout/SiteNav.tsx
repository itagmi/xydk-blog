"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";
import { createClient } from "@/lib/supabase/client";
import { isAdminUser } from "@/lib/auth/admin";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const onAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    const supabase = createClient();

    const syncAdminLink = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setShowAdminLink(isAdminUser(user?.email));
    };

    void syncAdminLink();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowAdminLink(isAdminUser(session?.user?.email));
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 메뉴 열릴 때 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* blur 배경 */}
      <div aria-hidden className={`pointer-events-none fixed top-0 right-0 left-0 z-[99] h-28 bg-gradient-to-b from-[#0c0c0c] to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      <div aria-hidden className={`pointer-events-none fixed top-0 right-0 left-0 z-[98] h-20 backdrop-blur-md bg-[#0c0c0c]/60 transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <nav aria-label="Main" className="pointer-events-auto fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-6 py-6 md:justify-center md:gap-12 md:px-12 md:py-10">
        {/* 홈 아이콘 */}
        <Link href="/" prefetch={false} aria-label="Home" className={`transition-colors duration-[250ms] md:absolute md:left-12 ${pathname === "/" ? "text-white/85" : "text-white/40 hover:text-white/85"}`}>
          <HomeIcon className="h-[18px] w-[18px]" />
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex md:items-center md:gap-12">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link key={href} href={href} prefetch={false}
              className={`text-[11px] font-normal uppercase tracking-[0.12em] no-underline transition-colors duration-[250ms] ${pathname === href ? "text-white/85" : "text-white/40 hover:text-white/85"}`}>
              {label}
            </Link>
          ))}
        </div>

        {showAdminLink && !onAdminPage && (
          <Link
            href="/admin"
            prefetch={false}
            className="hidden text-[11px] font-normal uppercase tracking-[0.12em] text-white/40 no-underline transition-colors duration-[250ms] hover:text-white/85 md:absolute md:right-12 md:block"
          >
            Admin
          </Link>
        )}

        {/* 햄버거 버튼 (모바일) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span className={`block h-[1.5px] w-5 bg-white/60 transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-white/60 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-white/60 transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* 모바일 풀스크린 메뉴 */}
      <div className={`fixed inset-0 z-[90] flex flex-col justify-center bg-[#0c0c0c] px-10 transition-all duration-400 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <ul className="flex flex-col gap-8">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} prefetch={false}
                className={`text-3xl font-normal uppercase tracking-[0.1em] no-underline transition-colors ${pathname === href ? "text-white/90" : "text-white/30 hover:text-white/70"}`}>
                {label}
              </Link>
            </li>
          ))}
          {showAdminLink && !onAdminPage && (
            <li>
              <Link
                href="/admin"
                prefetch={false}
                className="text-3xl font-normal uppercase tracking-[0.1em] text-white/30 no-underline transition-colors hover:text-white/70"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
