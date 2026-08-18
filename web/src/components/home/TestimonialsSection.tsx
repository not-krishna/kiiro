'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export interface TestimonialItem {
  _id?: string
  quote: string
  personName: string
  role?: string
  organisation?: string
  portrait?: any
  isVideo?: boolean
  videoUrl?: string
  videoThumbnail?: any
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
  eyebrow?: string
  title?: string
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    _id: '1',
    quote:
      '"The lovely team at Kiiro has provided our corporate retreat with significant cultural depth. Their masterclass workshops are exceptionally professional, attentively tailored to our team, and deeply memorable. Additionally, their team turnaround times are impressively fast!"',
    personName: 'Patrick Nawrocki',
    role: 'UX Manager at Superhabits',
    portrait: '/images/testimonials/avatar1.png',
    isVideo: false,
  },
  {
    _id: '2',
    quote:
      '"Bringing living master artisans directly into our design residency transformed how our team understands living craft traditions. It was a deeply tactile and unforgettable experience."',
    personName: 'Pri Patel',
    role: 'Product Designer at Lightdash',
    portrait: '/images/testimonials/avatar2.png',
    isVideo: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    _id: '3',
    quote:
      '"Kiiro has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the hands-on cultural experiences are fresh, innovative, and spot on!"',
    personName: 'Rob West',
    role: 'CEO of Kingdom Advisors',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    isVideo: false,
  },
  {
    _id: '4',
    quote:
      '"Our luxury resort guests constantly highlight the bespoke artisan residency as the pinnacle of their stay. Kiiro makes Indian heritage engaging, authentic, and modern."',
    personName: 'Divya Nair',
    role: 'Head of Guest Experience at Taj Hotels',
    portrait: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    isVideo: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    _id: '5',
    quote:
      '"Partnering with Kiiro allowed our foundation to bridge sustainable artisan livelihoods with hands-on corporate wellness programs. The impact is authentic and tangible."',
    personName: 'Dom Tytus',
    role: 'CSR Lead at Tata Consultancy Services',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    isVideo: false,
  },
]

export function TestimonialsSection({
  testimonials,
  eyebrow = 'TESTIMONIALS',
  title = "Don't take our word for it!\nHear it from our partners.",
}: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = direction === 'left' ? -420 : 420
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const getPortraitUrl = (item: TestimonialItem) => {
    if (typeof item.portrait === 'string') return item.portrait
    if (item.portrait?.asset) return urlFor(item.portrait).url()
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  }

  const getThumbUrl = (item: TestimonialItem) => {
    if (typeof item.videoThumbnail === 'string') return item.videoThumbnail
    if (item.videoThumbnail?.asset) return urlFor(item.videoThumbnail).url()
    return getPortraitUrl(item)
  }

  return (
    <section className="bg-[#FBF9F4] text-[#2B231F] border-t border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Eyebrow, Title and Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-3 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              <span className="w-1.5 h-1.5 bg-[#C2593F]" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-normal text-[#2B231F] leading-[1.08] whitespace-pre-line">
              {title}
            </h2>
          </div>

          {/* Slider Arrow Navigation Controls */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous testimonials"
              className="w-12 h-12 rounded-full border border-[#2B231F]/30 hover:border-[#2B231F] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus:ring-2 focus:ring-[#C2593F]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next testimonials"
              className="w-12 h-12 rounded-full border border-[#2B231F]/30 hover:border-[#2B231F] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus:ring-2 focus:ring-[#C2593F]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-2 pb-6 px-1"
        >
          {items.map((item, idx) => {
            const avatarUrl = getPortraitUrl(item)
            const thumbUrl = getThumbUrl(item)
            const subtitle = item.role || item.organisation || ''

            if (item.isVideo) {
              return (
                <div
                  key={item._id || idx}
                  onClick={() =>
                    item.videoUrl && setActiveVideo({ url: item.videoUrl, title: item.personName })
                  }
                  className="relative rounded-3xl overflow-hidden min-h-[440px] w-[320px] sm:w-[360px] md:w-[410px] flex-shrink-0 snap-start flex flex-col justify-between p-7 md:p-9 text-[#FBF9F4] group cursor-pointer border border-[#3D332E] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Video Thumbnail Background */}
                  <Image
                    src={thumbUrl}
                    alt={item.personName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/95 via-[#1F1916]/40 to-[#1F1916]/30 z-10" />

                  {/* Top Avatar Circle Badge */}
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/30 relative bg-[#2B231F]">
                      <Image src={avatarUrl} alt={item.personName} fill className="object-cover" />
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white/90">
                      Video Story
                    </span>
                  </div>

                  {/* Central Glassmorphism Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#C2593F] group-hover:border-[#C2593F] transition-all shadow-xl">
                      <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Author Info with Handwritten Signature */}
                  <div className="relative z-20 space-y-1 mt-auto">
                    <span className="font-signature text-3xl md:text-4xl text-white font-medium block leading-tight drop-shadow-sm">
                      {item.personName}
                    </span>
                    {subtitle && (
                      <span className="font-sans text-xs text-white/80 font-normal uppercase tracking-wider block">
                        {subtitle}
                      </span>
                    )}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={item._id || idx}
                className="bg-[#FFFFFF] border border-[#E8E1D5] rounded-3xl p-7 md:p-9 flex flex-col justify-between min-h-[440px] w-[320px] sm:w-[360px] md:w-[410px] flex-shrink-0 snap-start shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Avatar Circle Badge */}
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E1D5] relative bg-[#EAE3D5] mb-6 flex-shrink-0">
                  <Image src={avatarUrl} alt={item.personName} fill className="object-cover" />
                </div>

                {/* Main Quotation Body */}
                <p className="font-sans text-sm md:text-base text-[#2B231F] font-normal leading-relaxed mb-8 flex-1">
                  {item.quote}
                </p>

                {/* Bottom Signature & Designation */}
                <div className="pt-4 border-t border-[#F3EFE6] space-y-1">
                  <span className="font-signature text-3xl md:text-4xl text-[#2B231F] font-medium block leading-tight">
                    {item.personName}
                  </span>
                  {subtitle && (
                    <span className="font-sans text-xs text-[#968A80] font-normal uppercase tracking-wider block">
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#1F1916]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#2B231F] border border-[#3D332E] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#3D332E] text-[#FBF9F4]">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C2593F]">
                Testimonial Video • {activeVideo.title}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-[#968A80] hover:text-white transition-colors text-xl font-bold p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Canvas */}
            <div className="relative aspect-video bg-black">
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
