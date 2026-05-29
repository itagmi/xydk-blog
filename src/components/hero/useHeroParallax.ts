'use client'

import { useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useRef } from 'react'

/** 마우스 위치를 MotionValue로만 갱신 (리렌더 없이 패럴랙스) */
export function useHeroParallax() {
  const heroRef = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!heroRef.current) return
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()
      rawX.set((e.clientX - left) / width - 0.5)
      rawY.set((e.clientY - top) / height - 0.5)
    },
    [rawX, rawY],
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { heroRef, x, y, onMouseMove, onMouseLeave }
}
