'use client'

import { CornerWord } from './CornerWord'
import { ParallaxLayer } from './ParallaxLayer'
import { useHeroGsap } from './useHeroGsap'
import { useHeroParallax } from './useHeroParallax'

const CORNERS = [
  {
    key: 'experience',
    className: 'absolute top-[30%] left-[9%]',
    fx: -28,
    fy: -18,
    word: { pre: 'e', letter: 'X', post: 'perience' } as const,
  },
  {
    key: 'yourself',
    className: 'absolute top-[30%] right-[9%] text-right',
    fx: 28,
    fy: -22,
    word: { letter: 'Y', post: 'ourself' } as const,
  },
  {
    key: 'developer',
    className: 'absolute bottom-[30%] left-[9%]',
    fx: -22,
    fy: 20,
    word: { letter: 'D', post: 'eveloper' } as const,
  },
  {
    key: 'kinetics',
    className: 'absolute bottom-[30%] right-[9%] text-right',
    fx: 24,
    fy: 18,
    word: { letter: 'K', post: 'inetics' } as const,
  },
] as const

export default function Hero() {
  const { heroRef, x, y, onMouseMove, onMouseLeave } = useHeroParallax()

  useHeroGsap(heroRef)

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
            <CornerWord {...corner.word} />
          </ParallaxLayer>
        ))}

        <ParallaxLayer fx={6} fy={4} mx={x} my={y} marker="title">
          <h1 className="m-0 pointer-events-none text-center font-serif text-[clamp(48px,5.5vw,80px)] font-normal leading-none tracking-[-0.01em] text-white/[0.93]">
            What is XYDK?
          </h1>
        </ParallaxLayer>
      </div>
    </main>
  )
}
