'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

export interface ArtisanStoryItem {
  id?: string
  name: string
  craft: string
  region: string
  portraitUrl?: string
  portrait?: unknown
  quote: string
  description?: string
  impactMetric?: string
  impactLabel?: string
  impactDescription?: string
  ctaLabel?: string
  ctaUrl?: string
}

interface ArtisanFeatureData {
  heading?: string
  stories?: ArtisanStoryItem[]
}

interface ArtisanImpactProps {
  data?: ArtisanFeatureData
  stories?: ArtisanStoryItem[]
}

const DEFAULT_STORIES: ArtisanStoryItem[] = [
  {
    id: 'ramu',
    name: 'Master Craftsman Ramu',
    craft: 'Jaipur Blue Pottery Master',
    region: 'Kot Jewar, Rajasthan',
    portraitUrl: '/images/ramu-master-craftsman.png',
    quote: '"When participants hold the clay and feel the natural pigment, they are not just taking a workshop — they are taking home a living piece of our ancestral memory."',
    description: 'By facilitating direct hands-on learning, Kiiro ensures master artisans receive fair remuneration, dignity of practice, and an active platform to pass their heritage down to new generations.',
    impactMetric: '100%',
    impactLabel: 'Fair Wages',
    impactDescription: '& Transparent Craft Cluster Support',
    ctaLabel: 'Meet the artisan network',
    ctaUrl: '#enquiry',
  },
  {
    id: 'ram-lal',
    name: 'Ram Lal Chhipa',
    craft: 'Bagru Woodblock Printing Master',
    region: 'Bagru, Rajasthan',
    portraitUrl: '/images/artisans/block-printing-artisan.jpg',
    quote: '"Every relief carving in the teak wood block carries a rhythm passed down through five generations of indigo block printers."',
    description: 'Through our residential craft masterclasses, Ram Lal connects directly with urban creators, keeping natural mud-resist Dabu printing thriving across traditional clusters.',
    impactMetric: '40+',
    impactLabel: 'Families Supported',
    impactDescription: 'via Direct Craft Residencies',
    ctaLabel: 'Explore Bagru Workshops',
    ctaUrl: '/experiences/bagru-block-printing',
  },
  {
    id: 'ananya-menon',
    name: 'Ananya Menon',
    craft: 'Kintsugi & Ceramic Restoration',
    region: 'Assagao, Goa',
    portraitUrl: '/images/artisans/kintsugi-artisan.jpg',
    quote: '"Kintsugi teaches us that brokenness is not the end of an object\'s life, but the beginning of its most beautiful, golden chapter."',
    description: 'In our tranquil Goa studio sessions, Ananya guides participants through traditional urushi lacquer and gold joinery, turning fragile fractures into enduring art.',
    impactMetric: '100%',
    impactLabel: 'Mindful Craft',
    impactDescription: '& Zero-Waste Studio Philosophy',
    ctaLabel: 'Explore Kintsugi Sessions',
    ctaUrl: '/experiences/kintsugi',
  },
]

export function ArtisanImpact({ data, stories: propStories }: ArtisanImpactProps) {
  const heading = data?.heading || 'The Craft is the Experience. The Artisan is the Knowledge.'
  
  const rawStories = propStories && propStories.length > 0
    ? propStories
    : data?.stories && data.stories.length > 0
      ? data.stories
      : DEFAULT_STORIES

  const stories = rawStories.map((story) => {
    let img = story.portraitUrl
    if (!img && story.portrait) {
      try {
        img = urlFor(story.portrait).url()
      } catch {
        img = '/images/ramu-master-craftsman.png'
      }
    }
    return {
      ...story,
      portraitUrl: img || '/images/ramu-master-craftsman.png',
    }
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }, [stories.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }, [stories.length])

  // Autoplay 2.0 seconds timer
  useEffect(() => {
    if (isHovered || stories.length <= 1) return

    timerRef.current = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [nextSlide, isHovered, stories.length, currentIndex])

  const handleIndicatorClick = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    goToSlide(index)
  }

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextSlide()
      else prevSlide()
    }
    touchStartX.current = null
  }

  const currentStory = stories[currentIndex] || stories[0]

  return (
    <section id="artisans" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 border-b border-[#E8E1D5] pb-8">
          <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]" data-motion-text>
            {heading}
          </h2>
        </div>

        {/* 60/40 Editorial Feature Essay Layout Container */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Artisan Stories Carousel"
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch border border-[#D8CEBE] p-4 bg-[#F3EFE6] transition-opacity duration-500 ease-in-out">
            {/* Left Column — Portrait Media */}
            <div className="lg:col-span-7 relative bg-[#EAE3D5] min-h-[420px] lg:min-h-[540px] border border-[#D8CEBE] overflow-hidden flex flex-col justify-end p-8 md:p-12">
              {stories.map((story, idx) => {
                const isActive = idx === currentIndex
                return (
                  <div
                    key={story.id || idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={story.portraitUrl || '/images/ramu-master-craftsman.png'}
                      alt={story.name}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out scale-100 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/30 to-transparent z-10" />
                  </div>
                )
              })}

              <div className="relative z-20 space-y-2 text-[#FBF9F4]">
                <p className="font-sans text-sm text-[#E8E1D5] transition-all duration-500">{currentStory.region}</p>
                <h3 className="font-display text-fluid-3xl font-normal text-[#FBF9F4] transition-all duration-500">
                  {currentStory.name}
                </h3>
                <p className="font-sans text-sm text-[#E8E1D5] font-light transition-all duration-500">
                  {currentStory.craft}
                </p>
              </div>
            </div>

            {/* Right Column — Narrative & Editorial Quote */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 py-4 px-2 min-h-[380px]">
              <div className="space-y-6">
                <blockquote className="font-display text-fluid-xl text-[#2B231F] leading-relaxed italic pl-0 py-2 transition-opacity duration-500 min-h-[120px]">
                  {currentStory.quote}
                </blockquote>

                <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed transition-opacity duration-500">
                  {currentStory.description ||
                    'By facilitating direct hands-on learning, Kiiro ensures master artisans receive fair remuneration, dignity of practice, and an active platform to pass their heritage down to new generations.'}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8E1D5] space-y-4">
                <div className="font-sans text-xs text-[#6E635B]">
                  <span className="font-medium text-[#2B231F] block mb-1">Direct livelihood impact</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#2B231F]">
                    <AnimatedNumber value={currentStory.impactMetric || '100%'} />{' '}
                    {currentStory.impactLabel || 'Fair Wages'}
                  </span>{' '}
                  {currentStory.impactDescription || '& Transparent Craft Cluster Support'}
                </div>

                <Link
                  href={currentStory.ctaUrl || '#enquiry'}
                  className="kiiro-cta inline-flex items-center text-[15px] font-sans font-medium text-[#2B231F] hover:text-[#4F5B2A] border-b-2 border-[#2B231F] hover:border-[#4F5B2A] transition-all pb-1 gap-2"
                >
                  <span>{currentStory.ctaLabel || 'Meet the artisan network'}</span>
                  <span aria-hidden="true" data-cta-arrow>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Minimal Centered Circular Carousel Indicators (● ○ ○) */}
          {stories.length > 1 && (
            <div className="flex justify-center items-center gap-3 pt-6" aria-label="Carousel navigation">
              {stories.map((story, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={story.id || idx}
                    type="button"
                    onClick={() => handleIndicatorClick(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4F5B2A] focus:ring-offset-2 ${
                      isActive
                        ? 'bg-[#2B231F] scale-110 shadow-sm'
                        : 'bg-transparent border border-[#2B231F]/40 hover:border-[#2B231F] hover:scale-105'
                    }`}
                    aria-label={`Go to artisan story ${idx + 1}: ${story.name}`}
                    aria-current={isActive ? 'true' : 'false'}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
