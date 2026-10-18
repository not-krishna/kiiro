import React from 'react'

interface Advisor {
  name: string
  initials: string
  title: string
  affiliation: string
  specialty?: string
}

const ADVISORS: Advisor[] = [
  {
    name: 'Dr. Tapanendu Kundu',
    initials: 'TK',
    title: 'Chief Adviser Students Care, BITS Pilani Goa Campus',
    affiliation: 'Ex. Dean of Students Affairs, IIT Bombay',
    specialty: 'Expressive Art Specialist',
  },
  {
    name: 'Dr. Shalini Purohit',
    initials: 'SP',
    title: 'Chartered Psychologist',
    affiliation: 'British Psychological Society',
    specialty: 'Specialist Mentor Mental Health, Sheffield, UK',
  },
  {
    name: 'Dr. Sanjay Pandey',
    initials: 'SP',
    title: 'Head of Department',
    affiliation: 'Andrology & Reconstructive Urology, Kokilaben Hospital',
    specialty: 'Clinical Healthcare & Restorative Care',
  },
  {
    name: 'Sham Pahelpakar',
    initials: 'SP',
    title: 'Contemporary Visual Artist & Experience Facilitator',
    affiliation: 'Creative Facilitator at NID Ahmedabad & IIT Roorkee',
    specialty: 'Tribal Culture, Panchatatva & Natural Materials',
  },
  {
    name: 'Dr. Sourabh Awati',
    initials: 'SA',
    title: 'Warli Art Practitioner & Reiki Grand Master',
    affiliation: 'Holistic Wellness & Tribal Art Traditions',
    specialty: 'Over a Decade in Expressive Holistic Healing',
  },
  {
    name: 'Dr. Hrishikesh Jadav',
    initials: 'HJ',
    title: 'Programme Head',
    affiliation: 'Institute Research Scholar Companion Programme, IIT Bombay',
    specialty: 'IIT Bombay Scholar & Academic Wellness Lead',
  },
]

export function AdvisorySection() {
  return (
    <section
      id="advisory"
      className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10"
      aria-label="Our Distinguished Advisory"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-3xl space-y-3">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold flex items-center gap-2"
              data-motion-reveal
              data-motion-distance="14"
            >
              <span className="w-1.5 h-1.5 bg-[#4F5B2A] rounded-full" />
              Advisors & Partners
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]" data-motion-text>
              Our Distinguished Advisory
            </h2>
            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-2xl">
              Guiding Kiiro’s creative wellness methodology across expressive art therapies, psychological wellbeing, clinical care, and indigenous craft traditions.
            </p>
          </div>
        </div>

        {/* 6-Card Architectural Grid with Full Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-motion-stagger>
          {ADVISORS.map((advisor) => (
            <article
              key={advisor.name}
              className="bg-[#F3EFE6] border border-[#D8CEBE] p-7 md:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#4F5B2A] transition-all duration-300 group"
              data-motion-item
              data-motion-card
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-none bg-[#EAE3D5] border border-[#D8CEBE] flex items-center justify-center text-[#4F5B2A] font-display font-medium text-lg shrink-0 shadow-inner group-hover:border-[#4F5B2A] transition-colors">
                    {advisor.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-[#2B231F] font-normal leading-snug">
                      {advisor.name}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#4F5B2A] font-medium mt-0.5">
                      {advisor.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E8E1D5]">
                  <p className="font-sans text-xs text-[#2B231F] font-medium leading-relaxed">
                    {advisor.affiliation}
                  </p>
                  {advisor.specialty && (
                    <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                      {advisor.specialty}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E1D5]/60 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#968A80] font-mono">
                  Advisory Board
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F5B2A] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
