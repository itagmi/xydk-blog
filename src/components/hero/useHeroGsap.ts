'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/** Hero GSAP: 마운트 인트로 + 스크롤 fade/blur */
export function useHeroGsap(heroRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!heroRef.current) return

      const hero = heroRef.current

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-corner]', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
      })

      tl.from(
        '[data-hero-title]',
        {
          opacity: 0,
          y: 16,
          duration: 0.7,
        },
        '-=0.35',
      )

      gsap.to(hero, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        opacity: 0.15,
        filter: 'blur(10px)',
        y: -80,
        ease: 'none',
      })

      ScrollTrigger.refresh()
    },
    { scope: heroRef },
  )
}
