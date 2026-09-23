'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { KIIRO_MOTION } from '@/lib/motion/tokens'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageTransitionLayer() {
  const pathname = usePathname()
  const layerRef = useRef<HTMLDivElement | null>(null)
  const firstRun = useRef(true)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || prefersReducedMotion()) return

    if (firstRun.current) {
      firstRun.current = false
      gsap.set(layer, { scaleY: 0 })
      return
    }

    const timeline = gsap.timeline({
      defaults: { ease: KIIRO_MOTION.ease.page },
    })

    timeline
      .set(layer, { transformOrigin: 'bottom center', scaleY: 0, autoAlpha: 1 })
      .to(layer, { scaleY: 1, duration: 0.24 })
      .set(layer, { transformOrigin: 'top center' })
      .to(layer, { scaleY: 0, duration: KIIRO_MOTION.duration.page })

    return () => {
      timeline.kill()
    }
  }, [pathname])

  return (
    <div
      ref={layerRef}
      className="kiiro-page-transition fixed inset-0 z-[90] origin-bottom scale-y-0 bg-[#4F5B2A] pointer-events-none"
      aria-hidden="true"
    />
  )
}
