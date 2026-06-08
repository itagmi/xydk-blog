"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LifePhoto } from "@/config/life";

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-3.5, 2.2, -1.8, 3.1, -2.7, 1.4, -3.0, 2.8, -1.2, 3.4];

const ARROW_ANGLE = -22;
const ARROW_SVG = { width: 200, height: 56 };
const ARROW_HEAD = { x: 163, y: 28 };

function getQuoteMarginTop() {
  const centerX = ARROW_SVG.width / 2;
  const centerY = ARROW_SVG.height / 2;
  const dx = ARROW_HEAD.x - centerX;
  const dy = ARROW_HEAD.y - centerY;
  const rad = (ARROW_ANGLE * Math.PI) / 180;
  const headY = centerY + dx * Math.sin(rad) + dy * Math.cos(rad);
  return headY - 9;
}

function WavyArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width={ARROW_SVG.width}
      height={ARROW_SVG.height}
      viewBox={`0 0 ${ARROW_SVG.width} ${ARROW_SVG.height}`}
      fill="none"
      style={{
        transform: flip ? `scaleX(-1) rotate(${ARROW_ANGLE}deg)` : `rotate(${ARROW_ANGLE}deg)`,
        transformOrigin: "center",
        opacity: 0.45,
        flexShrink: 0,
      }}
    >
      <path
        d="M 6,34
           C 24,48 34,16 54,18
           C 74,20 86,46 104,44
           C 120,42 136,24 154,28"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 154,20 L 163,28 L 154,36"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function isVideo(src: string) {
  return /\.(mov|mp4|webm)$/i.test(src);
}

export default function PhotoWall({ photos }: { photos: LifePhoto[] }) {
  const wallRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wallRef.current) return;
      const cards = wallRef.current.querySelectorAll<HTMLElement>("[data-card]");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: wallRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.out",
        stagger: { amount: 0.6, from: "random" },
      });
    },
    { scope: wallRef }
  );

  if (photos.length === 0) {
    return (
      <p className="text-sm text-white/30">
        사진을 추가하려면 <code className="text-white/40">public/life/</code> 폴더에 이미지를 넣고{" "}
        <code className="text-white/40">src/config/life.ts</code>를 수정하세요.
      </p>
    );
  }

  return (
    <div ref={wallRef} className="flex flex-col gap-16">
      {photos.map((photo, i) => {
        const rotation = ROTATIONS[i % ROTATIONS.length];
        const isRight = i % 2 === 1;

        return (
          <div
            key={i}
            data-card
            className={`flex items-center gap-6 ${isRight ? "flex-row-reverse justify-start" : "flex-row justify-start"}`}
          >
            {/* 폴라로이드 카드 */}
            <div
              style={{ "--rotate": `${rotation}deg` } as React.CSSProperties}
              className="group w-[280px] shrink-0 bg-white p-3 pb-10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out [transform:rotate(var(--rotate))] hover:scale-[1.04] hover:[transform:rotate(0deg)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:w-[320px]"
            >
              <div className="overflow-hidden bg-[#1a1a1a]">
                {isVideo(photo.src) ? (
                  <video
                    src={photo.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-[220px] w-full object-cover sm:h-[260px]"
                  />
                ) : (
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={400}
                    height={400}
                    className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[260px]"
                  />
                )}
              </div>
              <div className="mt-3 px-1">
                <p className="text-[13px] leading-snug text-[#111]">{photo.caption}</p>
                {(photo.location || photo.date) && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#888]">
                    {[photo.location, photo.date].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </div>

            {/* 화살표 + 글귀 */}
            {photo.quote && (
              <div className={`hidden items-start gap-2 sm:flex ${isRight ? "flex-row-reverse" : "flex-row"}`}>
                <WavyArrow flip={isRight} />
                <p
                  className="whitespace-nowrap text-sm italic leading-none text-white/40"
                  style={{ marginTop: `${getQuoteMarginTop()}px` }}
                >
                  {photo.quote}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
