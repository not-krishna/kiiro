'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface StudioMoment {
  id: string
  url: string
  type: 'post' | 'reel'
  typeLabel: string
  handle: string
  authorName: string
  initials?: string
  badgeBg?: string
  imageSrc: string
  imageAlt: string
  quote: string
  caption: string
  overlayTag: string
  contextLine: string
  videoUrl?: string
}

function getInstagramEmbedUrl(url?: string): string | null {
  if (!url) return null
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/i)
  if (reelMatch && reelMatch[1]) {
    return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`
  }
  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/i)
  if (postMatch && postMatch[1]) {
    return `https://www.instagram.com/p/${postMatch[1]}/embed/`
  }
  return null
}

const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/your_workshops/?hl=en'

const STUDIO_MOMENTS: StudioMoment[] = [
  {
    id: 'post-1',
    url: 'https://www.instagram.com/p/DUiWSHsESoe/?xtok=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    type: 'post',
    typeLabel: 'Post',
    handle: '@your_workshops',
    authorName: 'The Mitti Company',
    initials: 'MC',
    badgeBg: 'bg-[#C17F59]',
    imageSrc: '/images/studio-moments/moment-1.jpg',
    imageAlt: 'Happy customer holding handcrafted clay pottery during studio workshop',
    quote: 'Happy customer make us happy:)',
    caption: '“Happy customer make us happy:)”',
    overlayTag: 'Handcrafted Clay Diya',
    contextLine: 'Pottery Studio · Living Craft',
  },
  {
    id: 'reel-2',
    url: 'https://www.instagram.com/reel/DTsCHt2DH-a/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    type: 'reel',
    typeLabel: 'Reel',
    handle: '@your_workshops',
    authorName: 'Ruchika',
    initials: 'RC',
    badgeBg: 'bg-[#4F5B2A]',
    imageSrc: '/images/studio-moments/moment-2.jpg',
    imageAlt: 'Hands shaping terracotta clay on the pottery wheel during creative wellness session',
    quote: 'Pottery era activated! 10/10 would get messy again',
    caption:
      '“I came in as a beginner, made a mess, laughed a lot, and absolutely loved every minute of this pottery workshop.”',
    overlayTag: 'Wheel Throwing · Thane',
    contextLine: 'Original audio · Thane Workshop',
  },
  {
    id: 'reel-3',
    url: 'https://www.instagram.com/reel/DNVLoSjzhgv/',
    type: 'reel',
    typeLabel: 'Reel',
    handle: '@your_workshops',
    authorName: 'MELD Studio',
    initials: 'MS',
    badgeBg: 'bg-[#8F6A48]',
    imageSrc: '/images/studio-moments/moment-3.jpg',
    imageAlt: 'Master artisan demonstrating pottery making outdoors at Versova Mumbai',
    quote: 'Pottery workshop in Versova Mumbai',
    caption: '“Pottery workshop in Versova Mumbai, this Sunday 17th August”',
    overlayTag: 'Master Demonstration · Versova',
    contextLine: 'Original audio · Versova, Mumbai',
  },
]

export function SocialSection({ moments: propMoments }: { moments?: StudioMoment[] } = {}) {
  const moments = (propMoments && propMoments.length > 0 ? propMoments : STUDIO_MOMENTS).map(m => ({
    ...m,
    initials: m.initials || m.authorName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KR',
    badgeBg: m.badgeBg || 'bg-[#4F5B2A]',
  }))
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Update navigation button states and active index on scroll
  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)

    // Calculate approximate active card
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : clientWidth
    const newIndex = Math.min(
      moments.length - 1,
      Math.max(0, Math.round(scrollLeft / (cardWidth + 24)))
    )
    setActiveIndex(newIndex)
  }, [moments.length])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    handleScroll()
    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return

    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 24 : 360
    const target = direction === 'left' ? el.scrollLeft - step : el.scrollLeft + step

    el.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }

  const scrollToIndex = (index: number) => {
    const el = trackRef.current
    if (!el) return

    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 24 : 360

    el.scrollTo({
      left: index * step,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="moments-from-the-studio"
      className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10 overflow-hidden"
      aria-label="Moments From the Studio"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#4F5B2A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4F5B2A] rounded-full" />
              Community & Social
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] tracking-tight">
              Moments From the Studio
            </h2>
            <p className="font-sans text-sm text-[#6E635B] font-light max-w-xl leading-relaxed">
              Authentic glimpses of hands-on making, artisan guidance, and creative calm shared across our workshops.
            </p>
          </div>

          <div className="flex items-center gap-6 self-start md:self-end">
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#2B231F] hover:text-[#4F5B2A] border-b border-[#2B231F] hover:border-[#4F5B2A] pb-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A]"
            >
              <span>Follow @your_workshops</span>
              <span aria-hidden="true">&rarr;</span>
            </a>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2" aria-label="Carousel navigation">
              <button
                type="button"
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Previous moment"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A] ${
                  canScrollLeft
                    ? 'border-[#D8CEBE] bg-[#F3EFE6] text-[#2B231F] hover:bg-[#4F5B2A] hover:text-[#FBF9F4] hover:border-[#4F5B2A] active:scale-95'
                    : 'border-[#E8E1D5] bg-[#FBF9F4] text-[#D8CEBE] cursor-not-allowed opacity-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Next moment"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A] ${
                  canScrollRight
                    ? 'border-[#D8CEBE] bg-[#F3EFE6] text-[#2B231F] hover:bg-[#4F5B2A] hover:text-[#FBF9F4] hover:border-[#4F5B2A] active:scale-95'
                    : 'border-[#E8E1D5] bg-[#FBF9F4] text-[#D8CEBE] cursor-not-allowed opacity-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative group/carousel">
          {/* Subtle Floating Nav Buttons for Large Screens */}
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            disabled={!canScrollLeft}
            aria-label="Previous moment"
            className={`hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border shadow-md items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A] ${
              canScrollLeft
                ? 'border-[#D8CEBE] bg-[#FBF9F4] text-[#2B231F] hover:bg-[#4F5B2A] hover:text-white hover:border-[#4F5B2A] opacity-90 hover:opacity-100 hover:scale-105'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCard('right')}
            disabled={!canScrollRight}
            aria-label="Next moment"
            className={`hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border shadow-md items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A] ${
              canScrollRight
                ? 'border-[#D8CEBE] bg-[#FBF9F4] text-[#2B231F] hover:bg-[#4F5B2A] hover:text-white hover:border-[#4F5B2A] opacity-90 hover:opacity-100 hover:scale-105'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Swipeable Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-2 -mx-6 px-6 md:-mx-4 md:px-4 focus:outline-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            tabIndex={0}
            role="region"
            aria-label="Studio moments carousel"
          >
            {moments.map((moment, idx) => (
              <article
                key={moment.id}
                className="group relative flex-none w-[85vw] sm:w-[360px] lg:w-[calc(33.333%-1rem)] max-w-[400px] snap-center sm:snap-start bg-white border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#4F5B2A]/40 transition-all duration-300 flex flex-col"
              >
                {/* Card Top Chrome: Creator Identity */}
                <div className="p-4 pb-3 flex items-center justify-between border-b border-[#F0EAE1] bg-[#FAF8F3]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${moment.badgeBg} text-white flex items-center justify-center text-xs font-semibold tracking-wider font-mono shadow-sm flex-shrink-0`}
                    >
                      {moment.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-xs font-medium text-[#2B231F] truncate leading-tight">
                        {moment.authorName}
                      </p>
                      <p className="font-sans text-[11px] text-[#8C827A] truncate leading-tight">
                        {moment.handle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={moment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${moment.handle} on Instagram`}
                    className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#4F5B2A] hover:text-[#38421D] bg-[#4F5B2A]/10 hover:bg-[#4F5B2A]/20 px-2.5 py-1 rounded-full transition-colors flex-shrink-0"
                  >
                    <span>View</span>
                    <span aria-hidden="true" className="text-[10px]">↗</span>
                  </a>
                </div>

                {/* Media Window (Portrait Aspect Ratio) */}
                <div className="relative w-full aspect-[9/13] bg-[#241F1C] overflow-hidden block">
                  {playingId === moment.id ? (
                    <div className="relative w-full h-full bg-black">
                      {moment.videoUrl ? (
                        <video
                          src={moment.videoUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={getInstagramEmbedUrl(moment.url) || `${moment.url}embed/`}
                          className="w-full h-full border-0"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          title={`Instagram video player for ${moment.handle}`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPlayingId(null)
                        }}
                        className="absolute top-2 right-2 z-20 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[11px] font-sans font-medium rounded shadow-md flex items-center gap-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        aria-label="Close video player"
                      >
                        ✕ Close
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={moment.imageSrc}
                        alt={moment.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 360px, 400px"
                        priority={idx === 0}
                      />

                      {/* Gradient Scrims for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                      {/* Top Badge: Type Indicator */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white/90 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-sans uppercase tracking-wider font-semibold border border-white/20">
                          {moment.type === 'reel' ? (
                            <>
                              <svg className="w-3 h-3 text-[#E8A87C]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                              </svg>
                              <span>Reel</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3 text-[#E8A87C]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                              </svg>
                              <span>Post</span>
                            </>
                          )}
                        </span>

                        <span className="text-[10px] font-sans tracking-wide text-white/80 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
                          {moment.overlayTag}
                        </span>
                      </div>

                      {/* Centered Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                          type="button"
                          onClick={() => setPlayingId(moment.id)}
                          aria-label={`Play Instagram ${moment.typeLabel} from ${moment.authorName}`}
                          className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-115 hover:bg-[#4F5B2A] hover:border-[#4F5B2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                        >
                          <svg className="w-6 h-6 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>

                      {/* Bottom Vignette Caption */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none">
                        <p className="text-white text-xs font-sans font-medium line-clamp-2 drop-shadow-md leading-relaxed">
                          {moment.quote}
                        </p>
                        <p className="text-white/70 text-[10px] font-mono mt-1 tracking-wide">
                          {moment.contextLine}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Lower Content & Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-4">
                  <p className="font-display text-[14px] text-[#2B231F] italic leading-relaxed line-clamp-3">
                    {moment.caption}
                  </p>

                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#8C827A] font-mono text-[11px]">
                      {moment.handle}
                    </span>

                    <a
                      href={moment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#4F5B2A] hover:text-[#38421D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A]"
                    >
                      <span>Watch on Instagram</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile / Tablet Pagination Dots */}
          <div className="flex sm:hidden justify-center items-center gap-2 pt-4" aria-label="Slide indicators">
            {moments.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to moment ${idx + 1}`}
                className={`transition-all duration-300 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A] ${
                  idx === activeIndex
                    ? 'w-6 h-2 bg-[#4F5B2A]'
                    : 'w-2 h-2 bg-[#D8CEBE] hover:bg-[#8C827A]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Subtle Understated Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C827A] font-sans">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <svg className="w-4 h-4 text-[#4F5B2A] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Live workshops captured by participants &amp; visiting creators.</span>
          </p>

          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4F5B2A] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A]"
          >
            Tag @your_workshops to be featured
          </a>
        </div>
      </div>
    </section>
  )
}
