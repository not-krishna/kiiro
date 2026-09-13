'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ARTFROM_CHAPTERS } from '@/content/homepage'
import { workshopsByCategory } from '@/content/workshops'

export function ArtformsSection() {
  const [active, setActive] = useState<(typeof ARTFROM_CHAPTERS)[number]['id']>('traditional')
  const chapter = ARTFROM_CHAPTERS.find((item) => item.id === active) || ARTFROM_CHAPTERS[0]
  const related = workshopsByCategory(chapter.id).slice(0, 8)

  return (
    <section id="artforms" className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">Artforms</p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal">The practices themselves</h2>
          <p className="text-sm text-[#6E635B] font-light leading-relaxed">
            Traditional art, contemporary art, and wellness practice — three pillars every experience can draw from. The catalogue names below come from the corporate and hospitality workbook.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Artform categories">
          {ARTFROM_CHAPTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold border transition-colors ${
                active === item.id
                  ? 'bg-[#2B231F] text-white border-[#2B231F]'
                  : 'border-[#E8E1D5] text-[#6E635B] hover:border-[#C2593F]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 border-t border-[#E8E1D5] pt-10">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C2593F]">{chapter.title}</p>
            <h3 className="font-serif text-3xl">{chapter.title}</h3>
            <p className="text-sm text-[#6E635B] font-light leading-relaxed">{chapter.description}</p>
            <ul className="space-y-2 text-sm text-[#2B231F]">
              {chapter.practices.map((practice) => (
                <li key={practice} className="border-b border-[#E8E1D5] py-2">
                  {practice}
                </li>
              ))}
            </ul>
            <Link
              href={chapter.href}
              className="inline-block text-xs uppercase tracking-[0.18em] font-semibold border-b-2 border-[#2B231F] pb-1 hover:text-[#C2593F] hover:border-[#C2593F]"
            >
              Browse this pillar
            </Link>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#968A80] mb-4">Workshops in this pillar</p>
            <ul className="grid sm:grid-cols-2 gap-px bg-[#E8E1D5] border border-[#E8E1D5]">
              {related.map((workshop) => (
                <li key={workshop.slug} className="bg-[#FBF9F4] p-5">
                  <p className="font-serif text-lg text-[#2B231F]">{workshop.name}</p>
                  {workshop.origin && <p className="text-xs text-[#968A80] mt-1">{workshop.origin}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
