'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

/** Hero 아래 섹션 — 스크롤 진입 시 fade up (page.tsx에서 사용) */
export default function ScrollSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-6"
    >
      {children}
    </section>
  )
}
