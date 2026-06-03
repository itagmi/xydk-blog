'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type ScrollSectionProps = {
  children: React.ReactNode
  className?: string
  /** flex + 세로·가로 중앙 정렬 (기본 true) */
  flex?: boolean
}

/** Hero 아래 섹션 — 스크롤 진입 시 fade up (page.tsx에서 사용) */
export default function ScrollSection({
  children,
  className = '',
  flex = true,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
      })

      const aboutImage = sectionRef.current.querySelector('[data-about-image]')

      if (aboutImage) {
        gsap.fromTo(
          aboutImage,
          {
            opacity: 0,
            filter: 'blur(14px)',
            scale: 1.06,
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            },
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.1,
            ease: 'power2.out',
          },
        )
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className={`min-h-screen bg-[#0c0c0c] px-6 md:px-10 lg:px-12 ${
        flex ? 'flex flex-col items-center justify-center' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}
