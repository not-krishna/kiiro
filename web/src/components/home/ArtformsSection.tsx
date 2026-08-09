'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ArtformItem {
  _id?: string
  title: string
  slug?: string
  category?: string
  region?: string
  shortDescription?: string
  materials?: string[]
  techniques?: string[]
}

interface ArtformsSectionProps {
  artforms?: ArtformItem[]
}

export function ArtformsSection({ artforms }: ArtformsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'Traditional' | 'Contemporary' | 'Wellness'>('Traditional')

  const fallbackArtforms: Record<'Traditional' | 'Contemporary' | 'Wellness', {
    title: string
    region: string
    description: string
    materials: string[]
    techniques: string[]
    list: { name: string; region: string }[]
  }> = {
    Traditional: {
      title: 'Jaipur Blue Pottery & Warli Ritual Art',
      region: 'Rajasthan & Maharashtra',
      description: 'Low-fired quartz ceramics crafted with ground glass and cobalt oxide, alongside indigenous Warli ritual wall pictographs rendered in rice paste.',
      materials: ['Quartz Stone Powder', 'Cobalt Oxide', 'Geru Clay Base', 'Rice Paste'],
      techniques: ['Hand Mounding', 'Freehand Brushwork', 'Low-Fire Kiln Firing'],
      list: [
        { name: 'Jaipur Blue Pottery & Heritage Tiles', region: 'Jaipur, Rajasthan' },
        { name: 'Warli Tribal Ritual Canvas', region: 'Dahanu, Maharashtra' },
        { name: 'Mata Ni Pachedi Sacred Textile', region: 'Ahmedabad, Gujarat' },
        { name: 'Cheriyal Scroll Painting', region: 'Telangana' },
      ],
    },
    Contemporary: {
      title: 'Botanical Indigo Vatting & Resisted Bandhani',
      region: 'Gujarat & Kutch',
      description: 'Extracting natural plant indigo through aerobic fermentation, coupled with high-density thread knotting and sustainable textile dyeing.',
      materials: ['Organic Indigo Leaves', 'Madder Root Pigment', 'Handspun Cotton', 'Natural Alum'],
      techniques: ['Vat Fermentation', 'Tied Resist Knotting', 'Woodblock Pigment Transfer'],
      list: [
        { name: 'Natural Indigo Vat Fermentation', region: 'Kutch, Gujarat' },
        { name: 'Bagru Handblock Resist Printing', region: 'Bagru, Rajasthan' },
        { name: 'Sujanpur Natural Pigment Chemistry', region: 'Himachal Pradesh' },
        { name: 'Kalamkari Eco-Etching', region: 'Andhra Pradesh' },
      ],
    },
    Wellness: {
      title: 'Tactile Ceramic Sculpting & Sensory Clay Grounding',
      region: 'Pan-India Craft Hubs',
      description: 'Screen-free tactile ceramic engagement formulated for mindfulness, sensory focus, and deep connection to mineral earth materials.',
      materials: ['Natural Terracotta Earth', 'Volcanic Mineral Clay', 'Hand Carving Tools'],
      techniques: ['Pinch Pot Shaping', 'Coil Sculpting', 'Mindful Clay Meditations'],
      list: [
        { name: 'Terracotta Earth Sculpting', region: 'Pan-India' },
        { name: 'Mindful Ceramic Pinching', region: 'Pan-India' },
        { name: 'Natural Mineral Pigment Grinding', region: 'Rajasthan' },
        { name: 'Aromatic Botanical Dyeing', region: 'Goa' },
      ],
    },
  }

  const activeContent = fallbackArtforms[activeCategory]

  return (
    <section id="artforms" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              Living Heritage • Section 03
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F]">
              Visual Cultural System
            </h2>
          </div>

          {/* Large Editorial Category Navigation Tabs */}
          <div className="flex flex-wrap gap-6 font-sans text-xs font-semibold uppercase tracking-[0.2em]">
            {(['Traditional', 'Contemporary', 'Wellness'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 border-b-2 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'border-[#C2593F] text-[#2B231F]'
                    : 'border-transparent text-[#968A80] hover:text-[#2B231F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Continuous Editorial Canvas (60/40 Split Field, No Cards) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Main Visual Media Field */}
          <div className="lg:col-span-7 border border-[#D8CEBE] p-4 bg-[#F3EFE6] flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-[#EAE3D5] overflow-hidden border border-[#D8CEBE] flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/30 to-transparent z-10" />
              
              <div className="relative z-20 space-y-3 text-[#FBF9F4]">
                <div className="flex items-center space-x-3 text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#D99B26]">
                  <span className="w-1.5 h-1.5 bg-[#D99B26]" />
                  <span>{activeCategory} Tradition • {activeContent.region}</span>
                </div>
                <h3 className="font-display text-fluid-2xl font-normal leading-tight text-[#FBF9F4]">
                  {activeContent.title}
                </h3>
                <p className="font-sans text-xs text-[#E8E1D5] font-light leading-relaxed max-w-xl">
                  {activeContent.description}
                </p>
              </div>
            </div>

            {/* Material & Technique Editorial Bar */}
            <div className="mt-4 pt-4 border-t border-[#D8CEBE] grid grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#968A80] font-semibold mb-1">
                  Raw Materials
                </span>
                <p className="text-[#2B231F] font-medium leading-snug">
                  {activeContent.materials.join(' • ')}
                </p>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#968A80] font-semibold mb-1">
                  Craft Processes
                </span>
                <p className="text-[#2B231F] font-medium leading-snug">
                  {activeContent.techniques.join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* Rule-Divided Editorial List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 py-2">
            <div className="space-y-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6E635B] block border-b border-[#E8E1D5] pb-3">
                Selected {activeCategory} Repertoire
              </span>

              <div className="space-y-0 divide-y divide-[#E8E1D5]">
                {activeContent.list.map((item, idx) => (
                  <div key={idx} className="py-4 group cursor-pointer flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-fluid-xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors">
                        {item.name}
                      </h4>
                      <span className="font-sans text-[11px] text-[#968A80] font-light">
                        {item.region}
                      </span>
                    </div>
                    <span className="font-sans text-xs font-semibold text-[#968A80] group-hover:text-[#C2593F] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E1D5]">
              <Link
                href="#enquiry"
                className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#C2593F] border-b-2 border-[#2B231F] hover:border-[#C2593F] transition-all pb-1"
              >
                Explore Full Craft Catalog →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

