"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  review?: string | null;
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

function BookListIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
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

function BookModal({
  books,
  onClose,
}: {
  books: BookPreview[];
  onClose: () => void;
}) {
  const booksUrl = process.env.NEXT_PUBLIC_BOOKS_API_URL ?? "";
  const [selected, setSelected] = useState<BookPreview | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected) setSelected(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, selected]);

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 pt-20 md:pt-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          {selected ? (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              ← 목록으로
            </button>
          ) : (
            <h3 className="text-xs font-medium tracking-widest text-white/50 uppercase">
              {new Date().getFullYear()} Reading List
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          {selected ? (
            /* 독후감 뷰 */
            <div className="p-6">
              <div className="mb-5 flex items-start gap-4">
                <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                  {selected.cover_image ? (
                    <Image
                      src={selected.cover_image}
                      alt={selected.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/5 flex items-center justify-center">
                      <BookListIcon className="h-5 w-5 text-white/20" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-medium text-white/85 leading-snug">
                    {selected.title}
                  </p>
                  <p className="mt-0.5 text-sm text-white/40">
                    {selected.author}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded px-1.5 py-px text-[10px] ${STATUS_STYLES[selected.status] ?? "bg-white/10 text-white/40"}`}
                  >
                    {selected.status}
                  </span>
                </div>
              </div>
              {selected.review ? (
                <p className="text-sm leading-relaxed text-white/60 whitespace-pre-line">
                  {selected.review}
                </p>
              ) : (
                <p className="py-6 text-center text-sm text-white/25">
                  아직 독후감이 없어요
                </p>
              )}
            </div>
          ) : (
            /* 목록 뷰 */
            <ul className="divide-y divide-white/5">
              {books.length === 0 ? (
                <li className="py-12 text-center text-sm text-white/30">
                  등록된 책이 없어요
                </li>
              ) : (
                books.slice(0, 4).map((book, i) => {
                  const isFinished = book.status === "완독완료";
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        disabled={!isFinished}
                        onClick={() => isFinished && setSelected(book)}
                        className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors ${isFinished ? "hover:bg-white/5 cursor-pointer" : "cursor-default"}`}
                      >
                        <div className="relative h-16 w-11 flex-shrink-0 overflow-hidden rounded-lg">
                          {book.cover_image ? (
                            <Image
                              src={book.cover_image}
                              alt={book.title}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-white/5 flex items-center justify-center">
                              <BookListIcon className="h-4 w-4 text-white/20" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white/80">
                            {book.title}
                          </p>
                          <p className="truncate text-xs text-white/40 mt-0.5">
                            {book.author}
                          </p>
                          <span
                            className={`mt-1.5 inline-block rounded px-1.5 py-px text-[10px] ${STATUS_STYLES[book.status] ?? "bg-white/10 text-white/40"}`}
                          >
                            {book.status}
                          </span>
                        </div>
                        {isFinished && (
                          <span className="text-xs text-white/25 flex-shrink-0">
                            독후감 →
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>

        {/* 푸터 */}
        {!selected && booksUrl && (
          <div className="px-6 py-4 border-t border-white/8">
            <a
              href={booksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-white/10 py-2.5 text-center text-xs tracking-widest text-white/40 uppercase hover:border-white/20 hover:text-white/60 transition-colors"
            >
              GINKGO 바로가기 →
            </a>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function SideHustleImage({
  item,
  onBooksClick,
}: {
  item: (typeof ITEMS)[number];
  onBooksClick?: () => void;
}) {
  const inner = (
    <div className="relative mx-auto h-[240px] w-full max-w-[280px] overflow-hidden lg:h-[200px] lg:w-[200px]">
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 1024px) 80vw, 200px"
        data-side-hustle-image=""
        className="object-cover lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-105"
      />
      <div
        data-side-hustle-overlay
        className="absolute inset-0 bg-black/50 opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100"
      />
      <div
        data-side-hustle-icon
        className="absolute inset-0 flex items-center justify-center opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100"
      >
        {item.key === "books" ? (
          <BookListIcon className="h-14 w-14 text-white" />
        ) : (
          <InstagramIcon className="h-14 w-14 text-white" />
        )}
      </div>
    </div>
  );

  if (item.key === "books") {
    return (
      <button
        type="button"
        onClick={onBooksClick}
        data-side-hustle-link
        className="group mx-auto block w-full max-w-[280px] cursor-pointer lg:w-[200px]"
      >
        {inner}
      </button>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        data-side-hustle-link
        className="group mx-auto block w-full max-w-[280px] lg:w-[200px]"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

interface Props {
  books?: BookPreview[];
}

export default function SideHustlesSection({ books = [] }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
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
                  <SideHustleImage
                    item={item}
                    onBooksClick={() => setModalOpen(true)}
                  />
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
            technically not side hustles, but they do take up side-hustle
            amounts of brain space.
          </p>
        </div>
      </div>

      {modalOpen && (
        <BookModal books={books} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
