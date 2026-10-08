'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: string
  className?: string
  duration?: number
}

interface ParsedStat {
  isNumeric: boolean
  prefix: string
  targetValue: number
  suffix: string
  hasCommas: boolean
  decimals: number
  original: string
}

function parseStat(raw: string): ParsedStat {
  if (!raw) {
    return {
      isNumeric: false,
      prefix: '',
      targetValue: 0,
      suffix: '',
      hasCommas: false,
      decimals: 0,
      original: raw || '',
    }
  }

  // Regex to isolate prefix, raw number (with optional commas/decimals), and suffix
  const match = raw.match(/^([^0-9.]*)([0-9,.]+)(.*)$/)
  if (!match) {
    return {
      isNumeric: false,
      prefix: '',
      targetValue: 0,
      suffix: raw,
      hasCommas: false,
      decimals: 0,
      original: raw,
    }
  }

  const prefix = match[1] || ''
  const numStr = match[2] || '0'
  const suffix = match[3] || ''

  const hasCommas = numStr.includes(',')
  const decimalMatch = numStr.split('.')
  const decimals = decimalMatch.length > 1 ? decimalMatch[1].length : 0

  const targetValue = parseFloat(numStr.replace(/,/g, ''))

  return {
    isNumeric: !isNaN(targetValue),
    prefix,
    targetValue,
    suffix,
    hasCommas,
    decimals,
    original: raw,
  }
}

function formatValue(current: number, config: ParsedStat): string {
  if (!config.isNumeric) return config.original

  let valStr = current.toFixed(config.decimals)
  if (config.hasCommas) {
    const parts = valStr.split('.')
    parts[0] = parseInt(parts[0], 10).toLocaleString('en-US')
    valStr = parts.join('.')
  }
  return `${config.prefix}${valStr}${config.suffix}`
}

export function AnimatedNumber({ value, className, duration = 1500 }: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement | null>(null)
  const parsed = useMemo(() => parseStat(value), [value])
  const [displayValue, setDisplayValue] = useState<string>(() =>
    parsed.isNumeric ? formatValue(0, parsed) : parsed.original
  )
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!parsed.isNumeric) {
      setDisplayValue(parsed.original)
      return
    }

    if (hasAnimatedRef.current) {
      setDisplayValue(parsed.original)
      return
    }

    const node = elementRef.current
    if (!node) return

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasAnimatedRef.current = true
      setDisplayValue(parsed.original)
      return
    }

    const runAnimation = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      let startTime: number | null = null
      const startVal = 0
      const endVal = parsed.targetValue

      const step = (now: number) => {
        if (!startTime) startTime = now
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease-out cubic animation curve
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const current = startVal + (endVal - startVal) * easedProgress

        setDisplayValue(formatValue(current, parsed))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplayValue(parsed.original)
        }
      }

      requestAnimationFrame(step)
    }

    // Check if element is already in viewport
    const rect = node.getBoundingClientRect()
    if (rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0) {
      runAnimation()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          observer.disconnect()
          runAnimation()
        }
      },
      { threshold: 0.05, rootMargin: '50px' }
    )

    observer.observe(node)

    // Fallback timer: ensure the real numbers appear even if observer misses
    const safetyTimer = setTimeout(() => {
      if (!hasAnimatedRef.current) {
        runAnimation()
      }
    }, 800)

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [value, duration, parsed])

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  )
}
