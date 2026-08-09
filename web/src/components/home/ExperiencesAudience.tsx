'use client'

import { useState } from 'react'
import Link from 'next/link'

export function ExperiencesAudience() {
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const audiences = [
    {
      id: '01',
      title: 'Schools & Colleges',
      subtitle: 'Cultural Literacy & Hands-On Heritage Education',
      who: 'K-12 Students, Design Colleges, Universities',
      what: 'Curriculum-aligned masterclasses in living craft traditions, natural materials, and indigenous history.',
      why: 'Immersive tactile learning that bridges academic theory with living craft mastery.',
      cta: 'Explore School Programs',
      accentColor: '#C2593F', // Terracotta
    },
    {
      id: '02',
      title: 'Corporates & Organizations',
      subtitle: 'Team Wellness, CSR & Collaborative Ideation',
      who: 'Leadership Teams, HR Leaders, CSR Directors',
      what: 'Screen-free team retreats, tactile pottery grounding, and artisan livelihood partnerships.',
      why: 'De-screen corporate teams through tangible craft making while generating direct artisan impact.',
      cta: 'Plan Corporate Workshop',
      accentColor: '#D99B26', // Ochre
    },
    {
      id: '03',
      title: 'Hospitality & Luxury Resorts',
      subtitle: 'Bespoke Guest Residencies & Cultural Experiences',
      who: 'Luxury Resorts, Boutique Hotels, Heritage Properties',
      what: 'On-site artisan residency pop-ups, guest evening workshops, and heirloom gifting.',
      why: 'Elevate guest stays with authentic regional cultural engagement led by master craftspeople.',
      cta: 'Partner With Us',
      accentColor: '#8A9A86', // Sage
    },
    {
      id: '04',
      title: 'Online & Remote Teams',
      subtitle: 'Global Masterclasses & Digital Cultural Connection',
      who: 'Distributed Teams, Global Culture Enthusiasts',
      what: 'Live interactive virtual workshops with delivered artisan craft kits sent to participants.',
      why: 'Connect remote teams worldwide through tangible shared physical making experiences.',
      cta: 'Book Virtual Workshop',
      accentColor: '#2B3A4E', // Indigo
    },
  ]

  return (
    <section id="experiences" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 border-b border-[#E8E1D5] pb-8">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            Immersive Pathways • Section 04
          </span>
          <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F]">
            Experiences Tailored By Audience
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed">
            Whether for educational institutions, corporate teams, or luxury destinations, Kiiro designs structured hands-on experiences that inspire and connect.
          </p>
        </div>

        {/* Editorial Navigation Rows System (No Cards) */}
        <div className="space-y-0 divide-y divide-[#E8E1D5] border-y border-[#E8E1D5]">
          {audiences.map((aud, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={aud.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-8 md:py-10 transition-all cursor-pointer ${
                  isActive ? 'bg-[#FBF9F4]/80 px-6 md:px-8' : 'hover:bg-[#FBF9F4]/40 px-2'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Title & Audience Metadata */}
                  <div className="space-y-2 lg:w-1/3">
                    <div className="flex items-center space-x-3 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#968A80]">
                      <span
                        className="w-2 h-2 rounded-none inline-block"
                        style={{ backgroundColor: aud.accentColor }}
                      />
                      <span>{aud.id} • {aud.title}</span>
                    </div>
                    <h3 className="font-display text-fluid-2xl font-normal text-[#2B231F]">
                      {aud.title}
                    </h3>
                  </div>

                  {/* Subtitle / Scope */}
                  <div className="lg:w-1/3 text-xs font-sans text-[#6E635B] font-light leading-relaxed">
                    <span className="font-semibold text-[#2B231F] block mb-1">
                      {aud.subtitle}
                    </span>
                    <p className="line-clamp-2">{aud.what}</p>
                  </div>

                  {/* Action Link */}
                  <div className="lg:w-1/4 flex lg:justify-end items-center">
                    <Link
                      href="#enquiry"
                      className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#C2593F] transition-colors"
                    >
                      {aud.cta} →
                    </Link>
                  </div>
                </div>

                {/* Expanded Architectural Detail View */}
                {isActive && (
                  <div className="mt-8 pt-6 border-t border-[#E8E1D5] grid md:grid-cols-3 gap-6 font-sans text-xs animate-fade-in">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#968A80] font-semibold mb-1">
                        Target Audience
                      </span>
                      <p className="text-[#2B231F] font-light leading-relaxed">
                        {aud.who}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#968A80] font-semibold mb-1">
                        Curated Program Format
                      </span>
                      <p className="text-[#2B231F] font-light leading-relaxed">
                        {aud.what}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#968A80] font-semibold mb-1">
                        Institutional Value
                      </span>
                      <p className="text-[#2B231F] font-light leading-relaxed">
                        {aud.why}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

