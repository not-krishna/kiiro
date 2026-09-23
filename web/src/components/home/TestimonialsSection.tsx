'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { urlFor } from '@/sanity/lib/image'

export interface TestimonialItem {
  _id?: string
  quote: string
  personName?: string
  name?: string
  role?: string
  designation?: string
  organisation?: string
  company?: string
  portrait?: unknown
  profileImage?: unknown
  isVideo?: boolean
  videoUrl?: string
  videoThumbnail?: unknown
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
  title?: string
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    _id: '1',
    personName: 'Dr. Soumitra Das',
    role: 'Dean Student Welfare',
    organisation: 'NIT Goa',
    quote:
      'Kiiro brought incredible energy and tactile grounding to our first-year student inauguration. The combination of hands-on pottery and drum circle created an inclusive, memorable icebreaker that set a wonderful tone for the academic year.',
    portrait: '/images/testimonials/dr-soumitra-das.png',
  },
  {
    _id: '2',
    personName: 'Sharad',
    role: 'Wellness Lead',
    organisation: 'Capillary Technologies, Bangalore',
    quote:
      'The pottery workshop for employee wellness provided our team with much-needed screen-free grounding. Watching colleagues slow down, press raw clay, and bond outside work deadlines was truly restorative.',
    portrait: '/images/testimonials/sharad.png',
  },
  {
    _id: '3',
    personName: 'Yash',
    role: 'Community Manager',
    organisation: 'SoHo House, Mumbai',
    quote:
      'Hosting Kiiro’s pottery masterclass at SoHo House was a highlight for our members. The quality of facilitation and master artisan guidance elevated the entire evening into a quiet, sophisticated cultural experience.',
    portrait: '/images/testimonials/yash.jpg',
  },
  {
    _id: '4',
    personName: 'Shubham Chaurasia',
    role: 'Associate Director',
    organisation: 'Hello World',
    quote:
      'For our Women’s Day special, Kiiro curated an authentic block printing workshop. Our team created beautiful custom textiles while learning direct lineage techniques from master craftspeople.',
    portrait: '/images/testimonials/shubham.jpg',
  },
  {
    _id: '5',
    personName: 'Mayur Agarwal',
    role: 'ICAI Chairman',
    organisation: 'Kolkata Chapter',
    quote:
      'The pottery workshop organized for ICAI members in Kolkata was an exceptional blend of artistic expression and stress relief. A deeply enriching experience that left a lasting impression on everyone present.',
    portrait: '/images/testimonials/mayur.jpg',
  },
  {
    _id: '6',
    personName: 'Adelle Almeida',
    role: 'Faculty & CAS Coordinator',
    organisation: 'Don Bosco Matunga, Mumbai',
    quote:
      'Kolhapuri Chappal Making Workshop was one of a kind for me as well as my students. Experiencing the mindful stitching of soles with generational artisans from Kolhapur was exceptional. Look forward to collaborating again.',
    portrait: '/images/testimonials/adelle.jpg',
  },
  {
    _id: '7',
    personName: 'Prof. Kundu',
    role: 'Wellness Director',
    organisation: 'BITS Pilani Goa & Mpower',
    quote:
      'On behalf of Mpower and BITS Goa, I extend our heartfelt gratitude to facilitators Sulagna and Neha, and master artists Apoorva, Ramakant, and Jay. Your guidance, creativity, and patience brought this workshop to life!',
    portrait: '/images/testimonials/prof-suman-kundu.webp',
  },
  {
    _id: '8',
    personName: 'Divya Sudarshana',
    role: 'AVP Human Resources',
    organisation: 'Network 18',
    quote:
      'The hand building workshop with clay fostered connection and shared learning. Our employees appreciated the depth of the experience—a culturally rooted approach to corporate wellbeing programs.',
    portrait: '/images/testimonials/divya-sudarshana.png',
  },
  {
    _id: '9',
    personName: 'Marlies Bloemendaal',
    role: 'Founder & Creative Director',
    organisation: 'Ministry Of New',
    quote:
      'Kiiro’s workshop brought a hands-on creative experience with clay into our co-working ecosystem. It was grounding and engaging, improved focus, reduced stress, and created a stronger sense of belonging.',
    portrait: '/images/testimonials/marlies-bloemendaal.png',
  },
]

// Profile Avatar / Silhouette component
function ProfileAvatar({ src, name, sizeClasses = 'w-11 h-11' }: { src?: string | null; name: string; sizeClasses?: string }) {
  if (src && typeof src === 'string' && (src.startsWith('/') || src.startsWith('http'))) {
    return (
      <div className={`relative z-10 flex-shrink-0 overflow-hidden rounded-full border border-[#D8CEBE] bg-[#F3EFE6] ${sizeClasses}`}>
        <Image src={src} alt={name} fill className="object-cover" sizes="56px" />
      </div>
    )
  }

  return (
    <div
      className={`relative z-10 flex-shrink-0 overflow-hidden rounded-full border border-[#D8CEBE] bg-[#EAE3D5] flex items-center justify-center text-[#6E635B] ${sizeClasses}`}
      aria-label={`Silhouette avatar for ${name}`}
    >
      <svg className="w-3/5 h-3/5 fill-current opacity-70" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  )
}

export function TestimonialsSection({
  testimonials,
  title = 'Stories from the studio',
}: TestimonialsSectionProps) {
  const rawItems = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS
  const items = rawItems.filter((item) => item && (item.quote || item.personName || item.name))
  const realCount = items.length

  // Create 4x duplicated array for completely endless vertical circular scrolling
  const displayItems = [...items, ...items, ...items, ...items]

  // Start virtual index in the second set (realCount)
  const [virtualIndex, setVirtualIndex] = useState(realCount)
  const [isPaused, setIsPaused] = useState(false)
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // DOM Refs
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listWindowRef = useRef<HTMLDivElement | null>(null)
  const listStackRef = useRef<HTMLDivElement | null>(null)
  const mobilePillsRef = useRef<HTMLDivElement | null>(null)
  
  const quoteRef = useRef<HTMLQuoteElement | null>(null)
  const authorNameRef = useRef<HTMLHeadingElement | null>(null)
  const authorMetaRef = useRef<HTMLParagraphElement | null>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const activeRealIndex = (virtualIndex % realCount + realCount) % realCount
  const currentItem = items[activeRealIndex] || items[0]

  // Helpers to normalize field names
  const getName = (item?: TestimonialItem) => item?.personName || item?.name || 'Guest Participant'
  const getDesignation = (item?: TestimonialItem) => item?.role || item?.designation || ''
  const getCompany = (item?: TestimonialItem) => item?.organisation || item?.company || ''

  const getPortraitUrl = useCallback((item?: TestimonialItem) => {
    if (!item) return null
    const imgObj = item.portrait || item.profileImage
    if (typeof imgObj === 'string') return imgObj
    if (imgObj && typeof imgObj === 'object' && 'asset' in imgObj) {
      try {
        return urlFor(imgObj).url()
      } catch {
        return null
      }
    }
    return null
  }, [])

  // Position active item in vertical center of desktop list
  const centerActiveItemInList = useCallback(
    (vIdx: number, animate = true) => {
      if (!listWindowRef.current || !listStackRef.current) return
      const windowHeight = listWindowRef.current.clientHeight || 440
      const children = listStackRef.current.querySelectorAll('.testimonial-profile-item')
      if (!children[vIdx]) return

      const activeChild = children[vIdx] as HTMLElement
      const childOffsetTop = activeChild.offsetTop
      const childHeight = activeChild.offsetHeight

      // Compute target Y offset to center activeChild inside listWindow
      const targetY = windowHeight / 2 - (childOffsetTop + childHeight / 2)

      if (animate) {
        gsap.to(listStackRef.current, {
          y: targetY,
          duration: 0.5,
          ease: 'power2.out',
        })
      } else {
        gsap.set(listStackRef.current, { y: targetY })
      }
    },
    []
  )

  // Scroll active mobile pill into center view
  const centerActiveMobilePill = useCallback((realIdx: number) => {
    if (!mobilePillsRef.current) return
    const children = mobilePillsRef.current.children
    if (children[realIdx]) {
      (children[realIdx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [])

  // Switch to target virtual index with infinite circular continuity
  const goToVirtualIndex = useCallback(
    (targetVIndex: number) => {
      if (realCount <= 1 || isAnimating || targetVIndex === virtualIndex) return

      setIsAnimating(true)

      const prefersReduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // 1. Smoothly center active item in list
      centerActiveItemInList(targetVIndex, true)
      
      const newRealIdx = (targetVIndex % realCount + realCount) % realCount
      centerActiveMobilePill(newRealIdx)

      if (prefersReduced) {
        setVirtualIndex(targetVIndex)
        setIsAnimating(false)
        return
      }

      // 2. Animate quote text out
      const targets = [quoteRef.current, authorNameRef.current, authorMetaRef.current].filter(Boolean)

      gsap.to(targets, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: 'power2.in',
        stagger: 0.03,
        onComplete: () => {
          // 3. Update virtual index state
          setVirtualIndex(targetVIndex)

          // Seamless circular loop normalization:
          // When targetVIndex moves too far ahead (>= 2 * realCount), wrap around silently without jumping
          let normalizedVIndex = targetVIndex
          if (targetVIndex >= realCount * 2) {
            normalizedVIndex = targetVIndex - realCount
          } else if (targetVIndex < realCount) {
            normalizedVIndex = targetVIndex + realCount
          }

          if (normalizedVIndex !== targetVIndex) {
            requestAnimationFrame(() => {
              setVirtualIndex(normalizedVIndex)
              centerActiveItemInList(normalizedVIndex, false)
            })
          }

          // 4. Animate new quote text in
          requestAnimationFrame(() => {
            if (quoteRef.current) {
              gsap.fromTo(
                quoteRef.current,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
              )
            }

            if (authorNameRef.current) {
              gsap.fromTo(
                authorNameRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', delay: 0.08 }
              )
            }

            if (authorMetaRef.current) {
              gsap.fromTo(
                authorMetaRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', delay: 0.14, onComplete: () => setIsAnimating(false) }
              )
            } else {
              setIsAnimating(false)
            }
          })
        },
      })
    },
    [virtualIndex, realCount, isAnimating, centerActiveItemInList, centerActiveMobilePill]
  )

  const handleNext = useCallback(() => goToVirtualIndex(virtualIndex + 1), [virtualIndex, goToVirtualIndex])
  const handlePrev = useCallback(() => goToVirtualIndex(virtualIndex - 1), [virtualIndex, goToVirtualIndex])

  // Continuous circular auto-rotation every 2.5 seconds (2500ms)
  useEffect(() => {
    if (realCount <= 1 || isPaused) return

    autoPlayTimerRef.current = setTimeout(() => {
      goToVirtualIndex(virtualIndex + 1)
    }, 2500)

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    }
  }, [virtualIndex, realCount, isPaused, goToVirtualIndex])

  // Initial centering on mount
  useEffect(() => {
    centerActiveItemInList(virtualIndex, false)
  }, [centerActiveItemInList, virtualIndex])

  // Viewport ScrollTrigger entrance animation
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (realCount === 0) return null

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#FBF9F4] text-[#2B231F] border-t border-[#E8E1D5] py-16 md:py-24 px-6 md:px-12 overflow-hidden relative"
      aria-label="Testimonials and reviews"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#4F5B2A] font-medium">
              Voices & Experiences
            </span>
            <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-normal text-[#2B231F] leading-[1.08]">
              {title}
            </h2>
          </div>

          {/* Header Controls */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <span className="font-sans text-xs tracking-wider text-[#6E635B] mr-2 font-mono">
              {String(activeRealIndex + 1).padStart(2, '0')} / {String(realCount).padStart(2, '0')}
            </span>
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              aria-label="Previous testimonial"
              className="w-11 h-11 border border-[#D8CEBE] hover:border-[#2B231F] bg-[#F3EFE6] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5B2A] disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next testimonial"
              className="w-11 h-11 border border-[#D8CEBE] hover:border-[#2B231F] bg-[#F3EFE6] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5B2A] disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dynamic 2-Column Editorial Grid (Desktop) & Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Infinite Circular Centered Profile Switcher (Desktop) & Mobile Pills */}
          <div className="relative">
            {/* Desktop Vertical Circular Track */}
            <div
              ref={listWindowRef}
              className="hidden lg:block relative h-[440px] overflow-hidden pl-6 pr-2 border-l border-[#E8E1D5]/60"
            >
              {/* Dynamic Sliding Stack Container */}
              <div ref={listStackRef} className="space-y-3 py-2 relative">
                {displayItems.map((item, vIdx) => {
                  const isActive = vIdx === virtualIndex
                  const name = getName(item)
                  const desig = getDesignation(item)
                  const company = getCompany(item)
                  const avatarUrl = getPortraitUrl(item)

                  return (
                    <button
                      key={`${item._id || 'item'}-${vIdx}`}
                      onClick={() => goToVirtualIndex(vIdx)}
                      type="button"
                      aria-current={isActive ? 'true' : 'false'}
                      aria-label={`Select testimonial from ${name}, ${desig}`}
                      className={`testimonial-profile-item relative w-full flex items-center space-x-4 text-left p-3.5 rounded-sm transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5B2A] ${
                        isActive
                          ? 'bg-[#F3EFE6] border border-[#D8CEBE] shadow-md scale-[1.02] translate-x-2'
                          : 'hover:bg-[#F3EFE6]/50 opacity-50 hover:opacity-90 scale-[0.98]'
                      }`}
                    >
                      {/* Avatar / Silhouette */}
                      <ProfileAvatar
                        src={avatarUrl}
                        name={name}
                        sizeClasses={isActive ? 'w-14 h-14 ring-2 ring-[#4F5B2A]/25 border-[#4F5B2A]' : 'w-11 h-11 border-[#D8CEBE]'}
                      />

                      {/* Identity Info: Name & Designation */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-display font-normal transition-colors truncate ${
                            isActive ? 'text-base md:text-lg text-[#2B231F] font-semibold' : 'text-sm text-[#2B231F]/80'
                          }`}
                        >
                          {name}
                        </h3>
                        {(desig || company) && (
                          <p className="font-sans text-xs md:text-sm text-[#6E635B] font-light truncate mt-0.5">
                            {desig}
                            {company && <span className="text-[#3D4721]"> · {company}</span>}
                          </p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mobile / Tablet Horizontal Profile Selection Track */}
            <div
              ref={mobilePillsRef}
              className="lg:hidden flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none snap-x"
            >
              {items.map((item, idx) => {
                const isActive = idx === activeRealIndex
                const name = getName(item)
                const avatarUrl = getPortraitUrl(item)

                return (
                  <button
                    key={item._id || idx}
                    onClick={() => {
                      const targetVIndex = virtualIndex - activeRealIndex + idx
                      goToVirtualIndex(targetVIndex)
                    }}
                    type="button"
                    aria-current={isActive ? 'true' : 'false'}
                    aria-label={`Select testimonial ${idx + 1}: ${name}`}
                    className={`flex items-center space-x-2.5 px-3.5 py-2 border transition-all rounded-full flex-shrink-0 snap-start focus:outline-none ${
                      isActive
                        ? 'bg-[#2B231F] text-[#FBF9F4] border-[#2B231F]'
                        : 'bg-[#F3EFE6] text-[#2B231F] border-[#D8CEBE] hover:border-[#2B231F]'
                    }`}
                  >
                    <ProfileAvatar src={avatarUrl} name={name} sizeClasses="w-7 h-7" />
                    <span className="font-sans text-xs font-medium truncate max-w-[130px]">{name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Editorial Quote Display with Staggered GSAP Animation */}
          <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-8 md:p-12 min-h-[320px] md:min-h-[360px] flex flex-col justify-between relative shadow-sm">
            {/* Opening Serif Quotation Mark Accent */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 font-serif text-5xl md:text-6xl text-[#4F5B2A]/25 leading-none select-none pointer-events-none">
              “
            </div>

            {/* Quote Content Area */}
            <div className="relative z-10 pt-4 md:pt-6 space-y-6">
              {/* Active Testimonial Quote */}
              <blockquote
                ref={quoteRef}
                className="font-display text-fluid-xl md:text-fluid-2xl font-normal text-[#2B231F] leading-[1.38] tracking-tight italic"
                aria-live="polite"
              >
                “{currentItem.quote}”
              </blockquote>

              {/* Video Testimonial Trigger if present */}
              {currentItem.isVideo && currentItem.videoUrl && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        url: currentItem.videoUrl!,
                        title: getName(currentItem),
                      })
                    }
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-[#2B231F] text-[#FBF9F4] hover:bg-[#4F5B2A] transition-colors font-sans text-xs tracking-wider uppercase font-medium"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                    <span>Watch Video Testimonial</span>
                  </button>
                </div>
              )}
            </div>

            {/* Author Identity Block (No Stars) */}
            <div className="relative z-10 pt-8 mt-6 border-t border-[#E8E1D5] flex items-center justify-between">
              <div>
                {/* Name */}
                <h3
                  ref={authorNameRef}
                  className="font-display text-lg md:text-xl font-normal text-[#2B231F]"
                >
                  {getName(currentItem)}
                </h3>

                {/* Designation & Optional Company directly underneath */}
                <p ref={authorMetaRef} className="font-sans text-sm text-[#6E635B] font-light mt-0.5">
                  {getDesignation(currentItem)}
                  {getCompany(currentItem) && (
                    <span className="text-[#3D4721] font-medium"> · {getCompany(currentItem)}</span>
                  )}
                </p>
              </div>

              {/* Avatar / Silhouette Indicator on Mobile */}
              <div className="lg:hidden">
                <ProfileAvatar src={getPortraitUrl(currentItem)} name={getName(currentItem)} sizeClasses="w-12 h-12" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#1F1916]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#2B231F] border border-[#3D332E] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#3D332E] text-[#FBF9F4]">
              <span className="font-sans text-sm font-medium">{activeVideo.title}</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 border border-[#3D332E] hover:border-white hover:bg-white hover:text-[#2B231F] text-white transition-all flex items-center justify-center text-sm font-semibold"
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video src={activeVideo.url} controls autoPlay className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
