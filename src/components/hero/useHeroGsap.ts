'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

function resetHeroStyles(hero: HTMLElement) {
  const corners = hero.querySelectorAll('[data-hero-corner] [data-hero-intro]')
  const title = hero.querySelector('[data-hero-title] [data-hero-intro]')

  gsap.set(hero, { clearProps: 'opacity,transform,filter' })
  gsap.set([...corners, title], { clearProps: 'opacity,transform' })
}

/** Hero GSAP: 마운트 인트로 + 스크롤 fade/blur */
export function useHeroGsap(heroRef: React.RefObject<HTMLElement | null>) {
  const [runId, setRunId] = useState(0)

  // 브라우저 뒤로가기(bfcache) 복원 시 인트로 재생
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRunId((id) => id + 1)
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  useGSAP(
    () => {
      if (!heroRef.current) return

      const hero = heroRef.current
      const corners = hero.querySelectorAll('[data-hero-corner] [data-hero-intro]')
      const title = hero.querySelector('[data-hero-title] [data-hero-intro]')

      resetHeroStyles(hero)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        corners,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
      )

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.35',
        )
      }

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

      return () => {
        resetHeroStyles(hero)
      }
    },
    { scope: heroRef, dependencies: [runId] },
  )
}
