'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ARTFROM_CHAPTERS } from '@/content/homepage'
import { workshopsByCategory } from '@/content/workshops'

const CATEGORY_IMAGES: Record<string, string> = {
  traditional: '/images/hero/traditional-art-hero.jpg',
  contemporary: '/images/other/pottery-1.png',
  wellness: '/images/workshops/sound-healing-session.jpg',
}

const WORKSHOP_IMAGES: Record<string, string> = {
  pottery: '/images/other/pottery-1.png',
  kintsugi: '/images/other/kintsugi-1.png',
  'bandhni-tie-dye': '/images/workshops/bandhni-tie-dye.jpg',
  'batik-print-wax-resist-dyeing': '/images/workshops/bandhni-tie-dye.jpg',
  'cyanotype-printing': '/images/workshops/cyanotype-printing.jpg',
  'kolhapuri-chappal-making': '/images/workshops/block-printing-workshop.jpg',
  'channapatna-toy-making': '/images/other/pottery-2.png',
  'madhubani-painting': '/images/workshops/madhubani-painting-process.jpg',
  'warli-painting': '/images/workshops/warli-art-workshop.jpg',
  'gond-art': '/images/workshops/gond-art-workshop.jpg',
  'jaipur-tile-painting': '/images/other/pottery-1.png',
  'portuguese-azulejo-tile-painting': '/images/other/pottery-3.png',
  'kaavi-art': '/images/workshops/warli-art-workshop.jpg',
  'block-printing': '/images/workshops/block-printing-workshop.jpg',
  kalamkari: '/images/workshops/kalamkari-art-process.jpg',
  'paper-mache': '/images/workshops/madhubani-painting-process.jpg',
  'resin-art': '/images/workshops/cyanotype-printing.jpg',
  'candle-making': '/images/workshops/perfume-blending-masterclass.jpg',
  'perfume-making': '/images/workshops/perfume-blending-masterclass.jpg',
  'art-journaling': '/images/workshops/madhubani-painting-process.jpg',
  'sound-healing': '/images/workshops/sound-healing-session.jpg',
  breathwork: '/images/workshops/sound-healing-session.jpg',
  'somatic-movement': '/images/workshops/sound-healing-session.jpg',
  'expressive-art-therapy': '/images/workshops/madhubani-painting-process.jpg',
}

export function ArtformsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (id: string) => {
    setExpandedCategory((current) => (current === id ? null : id))
  }

  return (
    <section id="artforms" className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#C2593F] font-semibold" data-motion-reveal data-motion-distance="14">Our Offerings</span>
          <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F]" data-motion-text>The Pillars & Practices</h2>
          <p className="text-fluid-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            Explore our offerings structured inside three core disciplines: Traditional Art, Contemporary Art, and Wellness Practice. Click Explore on any category card to reveal the offerings contained inside.
          </p>
        </div>

        {/* Stacked Category Landscape Cards */}
        <div className="space-y-8" data-motion-stagger>
          {ARTFROM_CHAPTERS.map((item) => {
            const isExpanded = expandedCategory === item.id
            const offerings = workshopsByCategory(item.id)
            const imageUrl = CATEGORY_IMAGES[item.id] || CATEGORY_IMAGES.traditional
            const imageMotion = item.id === 'traditional' ? 'organic' : item.id === 'wellness' ? 'center' : 'horizontal'
            const parallaxStrength = item.id === 'wellness' ? '-3' : item.id === 'traditional' ? '-5' : '-8'

            return (
              <article
                key={item.id}
                className={`border transition-all duration-300 bg-white overflow-hidden shadow-sm ${
                  isExpanded ? 'border-[#C2593F] ring-1 ring-[#C2593F]' : 'border-[#E8E1D5] hover:border-[#2B231F]'
                }`}
                data-motion-item
                data-motion-card
                data-category-motion={item.id}
              >
                {/* Category Card Header (Landscape Layout) */}
                <div className="grid lg:grid-cols-12 gap-0">
                  <div
                    className="lg:col-span-5 relative h-56 lg:h-auto min-h-[15rem] bg-[#EAE3D5] overflow-hidden"
                    data-motion-image={imageMotion}
                    data-parallax={parallaxStrength}
                  >
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#2B231F]/90 text-white text-[10px] uppercase tracking-[0.18em] px-3 py-1 font-medium backdrop-blur-sm">
                      Pillar · {item.pillar}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-white/90 text-[#2B231F] text-[11px] font-semibold px-2.5 py-1">
                      {offerings.length} Offerings
                    </span>
                  </div>

                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl md:text-3xl text-[#2B231F]">
                        <span data-card-title>{item.title}</span>
                      </h3>
                      <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E1D5]">
                      <span className="text-xs text-[#968A80] font-sans">
                        {offerings.length} curated {item.title.toLowerCase()} practices
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCategory(item.id)}
                        className={`min-h-11 px-6 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                          isExpanded
                            ? 'bg-[#C2593F] text-white hover:bg-[#A84A33]'
                            : 'bg-[#2B231F] text-white hover:bg-[#C2593F]'
                        }`}
                        >
                        <span>{isExpanded ? `Close ${item.title}` : `Explore ${item.title}`}</span>
                        <svg
                          data-card-arrow
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* OFFERINGS CONTAINED INSIDE THIS CATEGORY CARD */}
                {isExpanded && (
                  <div className="border-t border-[#E8E1D5] bg-[#FBF9F4] p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#C2593F] font-semibold">
                          Catalogue
                        </span>
                        <h4 className="font-display text-xl text-[#2B231F]">
                          {item.title} Offerings ({offerings.length})
                        </h4>
                      </div>
                      <Link
                        href={`/experiences?category=${item.id}`}
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C2593F] hover:underline"
                      >
                        View in Full Catalogue →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {offerings.map((workshop) => {
                        const imageSrc = WORKSHOP_IMAGES[workshop.slug] || imageUrl
                        return (
                          <article
                            key={workshop.slug}
                            className="bg-white border border-[#E8E1D5] flex flex-col justify-between group hover:border-[#C2593F] transition-all duration-300 shadow-sm"
                            data-motion-card
                          >
                            <div>
                              <div className="relative h-44 w-full overflow-hidden bg-[#EAE3D5]" data-motion-image={imageMotion}>
                                <Image
                                  src={imageSrc}
                                  alt={workshop.name}
                                  fill
                                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {workshop.origin && (
                                  <span className="absolute bottom-2.5 left-2.5 bg-white/90 text-[#2B231F] text-[11px] font-medium px-2 py-0.5">
                                    {workshop.origin}
                                  </span>
                                )}
                              </div>

                              <div className="p-5 space-y-2">
                                <h5 className="font-display text-lg text-[#2B231F] group-hover:text-[#C2593F] transition-colors" data-card-title>
                                  {workshop.name}
                                </h5>
                                {workshop.definition && (
                                  <p className="text-xs text-[#6E635B] font-light leading-relaxed line-clamp-3">
                                    {workshop.definition}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="p-5 pt-0">
                              <Link
                                href={`/experiences?slug=${encodeURIComponent(workshop.slug)}`}
                                className="kiiro-cta w-full min-h-10 inline-flex items-center justify-center gap-2 border border-[#2B231F] text-[#2B231F] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#2B231F] hover:text-white transition-colors"
                              >
                                <span>Explore</span>
                                <svg className="w-3.5 h-3.5" data-cta-arrow fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
