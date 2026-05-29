'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

type ParallaxLayerProps = {
  fx: number
  fy: number
  mx: MotionValue<number>
  my: MotionValue<number>
  className?: string
  children: React.ReactNode
  marker?: 'corner' | 'title'
}

export function ParallaxLayer({
  fx,
  fy,
  mx,
  my,
  className,
  children,
  marker,
}: ParallaxLayerProps) {
  const x = useTransform(mx, (v) => v * fx)
  const y = useTransform(my, (v) => v * fy)

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      {...(marker === 'corner' ? { 'data-hero-corner': true } : {})}
      {...(marker === 'title' ? { 'data-hero-title': true } : {})}
    >
      {children}
    </motion.div>
  )
}
