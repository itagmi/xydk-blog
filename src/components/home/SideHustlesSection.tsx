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

type BookPreview = {
  title: string;
  author: string;
  status: string;
  cover_image: string | null;
  category: string | null;
};

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

const STATUS_STYLES: Record<string, string> = {
  완독완료: "bg-emerald-500/20 text-emerald-300",
  책상위: "bg-amber-500/20 text-amber-300",
  가방안: "bg-violet-500/20 text-violet-300",
  책장속: "bg-white/10 text-white/50",
};

function BookGrid({ books }: { books: BookPreview[] }) {
  const booksUrl = process.env.NEXT_PUBLIC_BOOKS_API_URL ?? "";
  const display = books.slice(0, 4);

  return (
    <a
      href={booksUrl || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto grid w-full max-w-[280px] grid-cols-2 gap-2 lg:w-[200px]"
    >
      {display.map((book, i) => (
        <div
          key={i}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
            {book.cover_image ? (
              <Image
                src={book.cover_image}
                alt={book.title}
                fill
                sizes="70px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/20 text-xs">
                📖
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5 p-1.5">
            <p className="line-clamp-2 text-[10px] font-medium leading-tight text-white/80">
              {book.title}
            </p>
            <p className="truncate text-[9px] text-white/40">{book.author}</p>
            <span
              className={`mt-0.5 self-start rounded px-1 py-px text-[8px] leading-tight ${STATUS_STYLES[book.status] ?? "bg-white/10 text-white/40"}`}
            >
              {book.status}
            </span>
          </div>
        </div>
      ))}
    </a>
  );
}

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
    <div className="relative mx-auto h-[240px] w-full max-w-[280px] overflow-hidden lg:h-[200px] lg:w-[200px]">
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 1024px) 80vw, 200px"
        data-side-hustle-image={item.href ? "" : undefined}
        className={`object-cover ${item.href ? "lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-105" : ""}`}
      />
      {item.href && (
        <>
          <div
            data-side-hustle-overlay
            className="absolute inset-0 bg-black/50 opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100"
          />
          <div
            data-side-hustle-icon
            className="absolute inset-0 flex items-center justify-center opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100"
          >
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
        data-side-hustle-link
        className="group mx-auto block w-full max-w-[280px] lg:w-[200px]"
      >
        {image}
      </a>
    );
  }

  return image;
}

interface Props {
  books?: BookPreview[];
}

export default function SideHustlesSection({ books = [] }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll("li");

      ScrollTrigger.matchMedia({
        "(max-width: 1023px)": () => {
          items.forEach((item) => {
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 48,
              duration: 0.85,
              ease: "power3.out",
            });
          });

          const links = listRef.current!.querySelectorAll<HTMLElement>(
            "[data-side-hustle-link]",
          );

          links.forEach((link) => {
            const overlay = link.querySelector("[data-side-hustle-overlay]");
            const icon = link.querySelector("[data-side-hustle-icon]");
            const image = link.querySelector("[data-side-hustle-image]");
            const trigger = link.closest("li") ?? link;

            if (!overlay || !icon || !image) return;

            gsap.set([overlay, icon], { opacity: 0 });
            gsap.set(image, { scale: 1, transformOrigin: "center center" });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger,
                  start: "top 50%",
                  toggleActions: "play none none reverse",
                },
              })
              .to(image, { scale: 1.05, duration: 0.9, ease: "power2.out" }, 0)
              .to(
                [overlay, icon],
                { opacity: 1, duration: 0.7, ease: "power2.out" },
                0,
              );
          });
        },
        "(min-width: 1024px)": () => {
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
      });
    },
    { scope: listRef },
  );

  return (
    <div className="flex w-full max-w-[1200px] flex-col gap-20 lg:gap-16 xl:gap-20">
      <header className="w-full max-lg:pb-4">
        <h2
          className={`${bricolage.className} text-right text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white/90`}
        >
          the side hustles
        </h2>
      </header>

      <div className="flex w-full flex-col items-center gap-20 text-center lg:gap-14">
        <ul
          ref={listRef}
          className="flex w-full flex-col items-center gap-40 py-12 lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:py-0"
        >
          {ITEMS.map((item) => (
            <li
              key={item.key}
              className="w-full max-w-[360px] lg:w-[34ch] lg:shrink-0"
            >
              <article className="flex flex-col items-center gap-8 lg:gap-5">
                <p className="text-sm text-white/40">{item.label}</p>
                {item.key === "books" && books.length > 0 ? (
                  <BookGrid books={books} />
                ) : (
                  <SideHustleImage item={item} />
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
