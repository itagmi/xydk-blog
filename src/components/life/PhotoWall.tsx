"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LifePhoto } from "@/config/life";

gsap.registerPlugin(ScrollTrigger);

// 카드마다 고정된 기울기 패턴 (랜덤처럼 보이게)
const ROTATIONS = [-3.5, 2.2, -1.8, 3.1, -2.7, 1.4, -3.0, 2.8, -1.2, 3.4];

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
        stagger: {
          amount: 0.6,
          from: "random",
        },
      });
    },
    { scope: wallRef }
  );

  if (photos.length === 0) {
    return (
      <p className="text-sm text-white/30">
        사진을 추가하려면{" "}
        <code className="text-white/40">public/life/</code> 폴더에 이미지를 넣고{" "}
        <code className="text-white/40">src/config/life.ts</code>를 수정하세요.
      </p>
    );
  }

  return (
    <div
      ref={wallRef}
      className="columns-1 gap-6 sm:columns-2 lg:columns-3"
    >
      {photos.map((photo, i) => {
        const rotation = ROTATIONS[i % ROTATIONS.length];
        return (
          <div
            key={i}
            data-card
            style={{ "--rotate": `${rotation}deg` } as React.CSSProperties}
            className="polaroid-card mb-6 inline-block w-full"
          >
            <div className="group relative bg-white p-3 pb-10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out [transform:rotate(var(--rotate))] hover:scale-[1.04] hover:[transform:rotate(0deg)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  width={400}
                  height={400}
                  className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[260px]"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="text-[13px] text-[#111] leading-snug">{photo.caption}</p>
                {(photo.location || photo.date) && (
                  <p className="mt-1 text-[11px] text-[#888] uppercase tracking-[0.08em]">
                    {[photo.location, photo.date].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
