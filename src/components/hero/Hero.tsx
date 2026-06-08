"use client";

import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { CornerWord } from "./CornerWord";
import { ParallaxLayer } from "./ParallaxLayer";
import { useHeroGsap } from "./useHeroGsap";
import { useHeroParallax } from "./useHeroParallax";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500"],
});

const CORNERS = [
  {
    key: "experience",
    className: "absolute top-[30%] left-[9%]",
    fx: -28,
    fy: -18,
    href: "/about",
    word: { pre: "e", letter: "X", post: "perience" } as const,
  },
  {
    key: "yourself",
    className: "absolute top-[30%] right-[9%] text-right",
    fx: 28,
    fy: -22,
    href: "/life",
    word: { letter: "Y", post: "ourself" } as const,
  },
  {
    key: "developer",
    className: "absolute bottom-[30%] left-[9%]",
    fx: -22,
    fy: 20,
    href: "/development-note",
    word: { letter: "D", post: "eveloper" } as const,
  },
  {
    key: "kinetics",
    className: "absolute bottom-[30%] right-[9%] text-right",
    fx: 24,
    fy: 18,
    href: "/ui-ux-thought",
    word: { letter: "K", post: "inetics" } as const,
  },
] as const;

export default function Hero() {
  const { heroRef, x, y, onMouseMove, onMouseLeave } = useHeroParallax();

  useHeroGsap(heroRef);

  return (
    <main
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {CORNERS.map((corner) => (
          <ParallaxLayer
            key={corner.key}
            fx={corner.fx}
            fy={corner.fy}
            mx={x}
            my={y}
            className={corner.className}
            marker="corner"
          >
            <Link
              href={corner.href}
              className="group inline-block cursor-pointer px-2 py-1 no-underline opacity-75 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-100 focus-visible:opacity-100"
            >
              <CornerWord
                {...corner.word}
                align={
                  corner.className.includes("text-right") ? "right" : "left"
                }
              />
            </Link>
          </ParallaxLayer>
        ))}

        <ParallaxLayer fx={6} fy={4} mx={x} my={y} marker="title">
          <h1
            className={`${bricolage.className} m-0 pointer-events-none text-center text-[clamp(48px,5.5vw,80px)] font-normal leading-none tracking-[0.01em] text-white/90`}
          >
            What is XYDK?
          </h1>
        </ParallaxLayer>
      </div>
    </main>
  );
}
