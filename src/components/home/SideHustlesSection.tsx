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
          className="flex w-full flex-col items-center gap-14 md:flex-row md:items-start md:justify-center md:gap-10 lg:gap-12"
        >
          {ITEMS.map((item) => (
            <li
              key={item.key}
              className="w-full max-w-[34ch] md:w-[34ch] md:shrink-0"
            >
              <article className="flex flex-col items-center gap-5">
                <p className="text-sm text-white/40">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={280}
                      height={280}
                      className="h-[200px] w-[200px] object-cover transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </a>
                ) : (
                  <div className="overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={280}
                      height={280}
                      className="h-[200px] w-[200px] object-cover"
                    />
                  </div>
                )}
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
