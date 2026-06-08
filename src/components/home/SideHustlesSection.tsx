"use client";

import Image from "next/image";
import { useRef } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ITEMS = [
  {
    key: "books",
    label: "책 읽기",
    image: "/1.png",
    href: null,
    headline: "BOOKS THAT SOMEHOW ALWAYS FIND ME AT THE RIGHT TIME",
    subtitle: "왠지 항상 딱 맞는 타이밍에 읽게 되는 책들",
  },
  {
    key: "photos",
    label: "사진 찍고 인스타 올리기",
    image: "/2.png",
    href: "https://www.instagram.com/xyoodakyung?igsh=YTJxeHJpNTd0bDBs&utm_source=qr",
    headline: "CHASING LIGHT AND MOMENTS WORTH KEEPING",
    subtitle: "간직할 만한 빛과 순간들을 쫓는 것",
  },
  {
    key: "reviews",
    label: "리뷰 인스타",
    image: "/3.png",
    href: "https://www.instagram.com/ttomatto.zip/",
    headline: "SAYING WHAT I THINK SO YOU DON'T HAVE TO GUESS",
    subtitle: "내가 솔직하게 말해줄 테니 당신은 고민 안 해도 됨",
  },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SideHustleImage({ item }: { item: (typeof ITEMS)[number] }) {
  const image = (
    <div
      className={`relative mx-auto h-[240px] w-full max-w-[280px] overflow-hidden lg:h-[200px] lg:w-[200px] ${item.href ? "group" : ""}`}
    >
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 1024px) 80vw, 200px"
        className={`object-cover ${item.href ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""}`}
      />
      {item.href && (
        <>
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <InstagramIcon className="h-14 w-14 text-white" />
          </div>
        </>
      )}
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block w-full max-w-[280px] lg:w-[200px]"
      >
        {image}
      </a>
    );
  }

  return image;
}

export default function SideHustlesSection() {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll("li");

      gsap.from(items, {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    { scope: listRef },
  );

  return (
    <div className="flex w-full max-w-[1200px] flex-col gap-16 md:gap-20">
      <header className="w-full">
        <h2
          className={`${bricolage.className} text-right text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white/90`}
        >
          the side hustles
        </h2>
      </header>

      <div className="flex w-full flex-col items-center gap-14 text-center">
        <ul
          ref={listRef}
          className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10"
        >
          {ITEMS.map((item) => (
            <li
              key={item.key}
              className="w-full max-w-[360px] lg:w-[34ch] lg:shrink-0"
            >
              <article className="flex flex-col items-center gap-5">
                <p className="text-sm text-white/40">{item.label}</p>
                <SideHustleImage item={item} />
                <p className="text-base leading-relaxed uppercase tracking-[0.06em] text-white/55 md:text-[15px]">
                  {item.headline}
                </p>
                <p className="text-sm leading-relaxed text-white/35">
                  {item.subtitle}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="max-w-[42ch] text-sm leading-relaxed uppercase tracking-[0.06em] text-white/35 md:text-base">
          technically not side hustles, but they do take up side-hustle amounts
          of brain space.
        </p>
      </div>
    </div>
  );
}
