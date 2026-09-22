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
  portrait?: unknown
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
    quote:
      '"The hand building workshop with clay fostered connection and shared learning. Our employees appreciated the depth of the experience. A culturally rooted approach to corporate wellbeing programs."',
    personName: 'Divya Sudarshana',
    role: 'AVP Human Resources, Network 18',
    portrait: '/images/testimonials/divya-sudarshana.png',
    isVideo: false,
  },
  {
    _id: '2',
    quote:
      '"Kiiro’s workshop brought a hands-on creative experience with clay into our co-working ecosystem. It was grounding and engaging, improved focus, reduced stress, and a stronger sense of belonging within the co working space."',
    personName: 'Marlies Bloemendaal',
    role: 'Founder, Ministry Of New',
    portrait: '/images/testimonials/marlies-bloemendaal.png',
    isVideo: false,
  },
  {
    _id: '3',
    quote:
      '"Kolhapuri Chappal Making Workshop was one of a kind for me as well as my students. Experiencing the mindful stitching of soles with the generational artisans from Kolhapur was exceptional. Look forward to collaborate again."',
    personName: 'Tracy Waller',
    role: 'HOD, English Dept. Edubridge International School',
    portrait: '/images/testimonials/tracy-waller.png',
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
]

export function TestimonialsSection({
  testimonials,
  title = 'Heard from people who sat with the work.',
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
    if (item.portrait && typeof item.portrait === 'object' && 'asset' in item.portrait) return urlFor(item.portrait).url()
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  }

  const getThumbUrl = (item: TestimonialItem) => {
    if (typeof item.videoThumbnail === 'string') return item.videoThumbnail
    if (item.videoThumbnail && typeof item.videoThumbnail === 'object' && 'asset' in item.videoThumbnail) return urlFor(item.videoThumbnail).url()
    return getPortraitUrl(item)
  }

  return (
    <section className="bg-[#FBF9F4] text-[#2B231F] border-t border-[#E8E1D5] py-16 md:py-24 px-6 md:px-10 overflow-hidden" data-motion-horizontal>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-normal text-[#2B231F] leading-[1.08]" data-motion-text>
              {title}
            </h2>
          </div>

          {/* Sharp Architectural Slider Navigation */}
          <div className="flex items-center space-x-2 self-start md:self-end">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous testimonials"
              className="w-11 h-11 border border-[#D8CEBE] hover:border-[#2B231F] bg-[#F3EFE6] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus:ring-1 focus:ring-[#C2593F]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next testimonials"
              className="w-11 h-11 border border-[#D8CEBE] hover:border-[#2B231F] bg-[#F3EFE6] hover:bg-[#2B231F] hover:text-[#FBF9F4] flex items-center justify-center transition-all text-[#2B231F] focus:outline-none focus:ring-1 focus:ring-[#C2593F]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sharp Testimonial Cards Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-2 pb-6 px-1"
          data-motion-horizontal-track
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
                  className="relative bg-[#2B231F] border border-[#3D332E] min-h-[460px] w-[320px] sm:w-[360px] md:w-[410px] flex-shrink-0 snap-start flex flex-col justify-between p-7 md:p-8 text-[#FBF9F4] group cursor-pointer hover:border-[#C2593F] transition-all duration-300"
                  data-motion-card
                >
                  {/* Video Thumbnail Background */}
                  <Image
                    src={thumbUrl}
                    alt={item.personName}
                    fill
                    className="object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, 410px"
                  />

                  {/* Dark Editorial Gradient Overlay */}
                  <div className="absolute inset-0 bg-[#1F1916]/45 z-10" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-16 h-16 bg-[#C2593F] text-white flex items-center justify-center group-hover:bg-[#A64830] transition-colors">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative z-20 space-y-2 mt-auto pt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 border border-white/30 relative bg-[#2B231F] flex-shrink-0">
                        <Image src={avatarUrl} alt={item.personName} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-white font-normal leading-snug" data-card-title>
                          {item.personName}
                        </h3>
                        {subtitle && (
                          <p className="font-sans text-sm text-white/80 font-light" data-card-meta>
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={item._id || idx}
                className="bg-[#F3EFE6] border border-[#D8CEBE] p-7 md:p-8 flex flex-col justify-between min-h-[460px] w-[320px] sm:w-[360px] md:w-[410px] flex-shrink-0 snap-start relative group hover:bg-[#FBF9F4] hover:border-[#2B231F] transition-colors"
                data-motion-card
              >
                <p className="font-sans text-sm md:text-base text-[#2B231F] font-normal leading-relaxed mb-8 flex-1">
                  {item.quote}
                </p>

                <div className="pt-5 border-t border-[#E8E1D5] flex items-center space-x-4">
                  <div className="w-11 h-11 border border-[#D8CEBE] relative bg-[#EAE3D5] flex-shrink-0">
                    <Image src={avatarUrl} alt={item.personName} fill className="object-cover" sizes="44px" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-display text-base font-normal text-[#2B231F] truncate" data-card-title>
                      {item.personName}
                    </h3>
                    {subtitle && (
                      <p className="font-sans text-sm text-[#6E635B] font-light truncate" data-card-meta>
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#1F1916]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#2B231F] border border-[#3D332E] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#3D332E] text-[#FBF9F4]">
              <div className="flex items-center space-x-2">
                <span className="font-sans text-sm text-[#FBF9F4]">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 border border-[#3D332E] hover:border-white hover:bg-white hover:text-[#2B231F] text-white transition-all flex items-center justify-center text-sm font-semibold"
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
