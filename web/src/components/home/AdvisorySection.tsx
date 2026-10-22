'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export interface Advisor {
  name: string
  initials: string
  title: string
  affiliation: string
  specialty?: string
  portraitUrl?: string
  bio?: string
}

export interface CoreTeamMember {
  name: string
  initials: string
  role: string
  credentials?: string
  bio: string
  portraitUrl?: string
}

const DEFAULT_ADVISORS: Advisor[] = [
  {
    name: 'Dr. Tapanendu Kundu',
    initials: 'TK',
    title: 'Chief Adviser Students Care, BITS Pilani Goa Campus',
    affiliation: 'Ex. Dean of Students Affairs, IIT Bombay',
    specialty: 'Expressive Art Specialist',
    bio: 'Pioneering student mental health initiatives and creative wellness integration at premier engineering institutions across India.',
    portraitUrl: 'https://cdn.sanity.io/images/s47moswb/production/1e3163b42a46c9e453bbbd3b84f76ea3c41d3cf7-272x265.png',
  },
  {
    name: 'Dr. Shalini Purohit',
    initials: 'SP',
    title: 'Chartered Psychologist',
    affiliation: 'British Psychological Society',
    specialty: 'Specialist Mentor Mental Health, Sheffield, UK',
    bio: 'Specialist clinical mentor focused on creative expression and grounding techniques for emotional regulation.',
    portraitUrl: 'https://cdn.sanity.io/images/s47moswb/production/72520cf55d94dc3f3b1ae77b7a906970dea6c34b-382x387.png',
  },
  {
    name: 'Shaam Pahelpakar',
    initials: 'SP',
    title: 'Contemporary Visual Artist & Experience Facilitator',
    affiliation: 'Creative Facilitator at NID Ahmedabad & IIT Roorkee',
    specialty: 'Tribal Culture, Panchatatva & Natural Materials',
    bio: 'Deep expertise in indigenous Indian art forms, tactile intelligence, and experiential facilitation.',
    portraitUrl: 'https://cdn.sanity.io/images/s47moswb/production/e34b4b6e1d41cf2233a3f92205b0e2d28c8e08df-285x307.png',
  },
  {
    name: 'Dr. Sanjay Pandey',
    initials: 'SP',
    title: 'Head of Department',
    affiliation: 'Andrology & Reconstructive Urology, Kokilaben Hospital',
    specialty: 'Clinical Healthcare & Restorative Care',
    bio: 'Advocating for holistic patient recovery and stress reduction through mindful tactile engagement.',
    portraitUrl: 'https://cdn.sanity.io/images/s47moswb/production/3a2340a994800c2c0a002c7da610b1212bfb63b0-291x215.png',
  },
]

const CORE_TEAM: CoreTeamMember[] = [
  {
    name: 'Sulagna Guhathakurta',
    initials: 'SG',
    role: 'Founder',
    credentials: 'Founder & Creative Wellness Director',
    bio: 'Leading experiential wellness through living Indian craft lineages and artisan collaboration.',
  },
  {
    name: 'Dr. Madhurima Prasad',
    initials: 'MP',
    role: 'Learning Experience Designer & Facilitator',
    credentials: 'ICF PCC certified leadership and transitional coach',
    bio: 'Specialising in experiential learning and leadership development through restorative practices.',
  },
  {
    name: 'Dr. Disha Srivastav',
    initials: 'DS',
    role: 'Learning Experience Designer & Facilitator',
    credentials: 'Applied Theatre, LEGO® Serious Play, Storytelling, Behavioural Facilitation, Certified Dance Movement Therapist (TISS)',
    bio: 'Integrating embodied somatic therapies, storytelling, and expressive arts into group wellness.',
  },
  {
    name: 'Risha Ray',
    initials: 'RR',
    role: 'Artist & Design Leader',
    credentials: 'National Institute of Design (NID)',
    bio: 'Design educator and visual artist focusing on sensory materiality and mindful studio practices.',
  },
  {
    name: 'Puja Guha',
    role: 'Traditional & Contemporary Visual Artist',
    initials: 'PG',
    credentials: 'Visual Artist & Facilitator',
    bio: 'Practicing visual artist bringing fine art sensibility to mindful, restorative studio making.',
  },
  {
    name: 'Suneeta Sohal',
    initials: 'SS',
    role: 'Thera Art Teacher',
    credentials: 'Ceramics: Bisque, Glazing & Firing',
    bio: 'Clay and ceramic therapist facilitating grounding sensory connection on the pottery wheel.',
  },
  {
    name: 'Prajakta',
    initials: 'P',
    role: 'Experience Facilitator',
    credentials: 'Creative Wellness & Artisan Coordinator',
    bio: 'Community engagement and studio workshop coordination across living craft disciplines.',
  },
  {
    name: 'Dr. Hrishikesh Jadav',
    initials: 'HJ',
    role: 'Creative Wellness Expert',
    credentials: 'IIT Bombay Batch 2020; Institute Research Scholar Companion Programme Head, IIT Bombay',
    bio: 'Academic wellness researcher translating stress-reduction science into grounded tactile rituals.',
  },
  {
    name: 'Dr. Sourabh Awati',
    initials: 'SA',
    role: 'Holistic Wellness Expert & Warli Art Practitioner',
    credentials: 'Reiki Grand Master; Over a decade in expressive holistic healing',
    bio: 'Bridging indigenous Warli art traditions with mindful therapeutic energy work.',
  },
]

export function AdvisorySection({ advisors: propAdvisors }: { advisors?: Advisor[] }) {
  const [isCoreTeamOpen, setIsCoreTeamOpen] = useState(false)

  // Order rule: 1. Dr. Tapanendu Kundu, 2. Dr. Shalini Purohit, 3. Shaam Pahelpakar, 4. Dr. Sanjay Pandey
  const advisors = React.useMemo(() => {
    if (!propAdvisors || propAdvisors.length === 0) return DEFAULT_ADVISORS

    const findByName = (keyword: string) =>
      propAdvisors.find((a) => a.name.toLowerCase().includes(keyword.toLowerCase()))

    const kundu = findByName('Kundu') || DEFAULT_ADVISORS[0]
    const purohit = findByName('Purohit') || DEFAULT_ADVISORS[1]
    const pahelpakar = findByName('Pahelpakar') || findByName('Sham') || findByName('Shaam') || DEFAULT_ADVISORS[2]
    const pandey = findByName('Pandey') || DEFAULT_ADVISORS[3]

    return [
      { ...DEFAULT_ADVISORS[0], ...kundu, name: 'Dr. Tapanendu Kundu' },
      { ...DEFAULT_ADVISORS[1], ...purohit, name: 'Dr. Shalini Purohit' },
      { ...DEFAULT_ADVISORS[2], ...pahelpakar, name: 'Shaam Pahelpakar' },
      { ...DEFAULT_ADVISORS[3], ...pandey, name: 'Dr. Sanjay Pandey' },
    ]
  }, [propAdvisors])

  return (
    <section
      id="advisory"
      className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10"
      aria-label="Our Distinguished Advisory & Core Team"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-3xl space-y-3">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold flex items-center gap-2"
              data-motion-reveal
              data-motion-distance="14"
            >
              <span className="w-1.5 h-1.5 bg-[#4F5B2A] rounded-full" />
              Advisory Board
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]" data-motion-text>
              Our Distinguished Advisory
            </h2>
            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-2xl">
              Guiding MELD’s creative wellness methodology across expressive art therapies, psychological wellbeing, clinical care, and indigenous craft traditions.
            </p>
          </div>
        </div>

        {/* 1. Advisory Board — First Row (Desktop: 4 columns side by side in one row) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch" data-motion-stagger>
            {advisors.map((advisor, idx) => (
              <article
                key={advisor.name}
                className="bg-[#F3EFE6] border border-[#D8CEBE] p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm hover:border-[#4F5B2A] transition-all duration-300 group"
                data-motion-item
                data-motion-card
              >
                <div className="space-y-4">
                  {/* Large Prominent Portrait */}
                  <div className="relative w-full h-56 sm:h-60 lg:h-64 bg-[#EAE3D5] border border-[#D8CEBE] group-hover:border-[#4F5B2A] transition-colors overflow-hidden">
                    {advisor.portraitUrl ? (
                      <Image
                        src={advisor.portraitUrl}
                        alt={`Portrait of ${advisor.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        unoptimized={advisor.portraitUrl.startsWith('/uploads/')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#4F5B2A] font-display font-medium text-3xl">
                        {advisor.initials}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#2B231F]/80 backdrop-blur-sm text-[#FBF9F4] text-[9px] font-sans tracking-[0.2em] uppercase font-medium">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Name and Credentials */}
                  <div className="space-y-1">
                    <h3 className="font-display text-lg md:text-xl text-[#2B231F] font-normal leading-snug">
                      {advisor.name}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#4F5B2A] font-medium">
                      {advisor.title}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
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

        {/* 2. Meet Our Core Team — Below the Advisory Board (Expandable Control) */}
        <div className="pt-6 border-t border-[#E8E1D5]">
          <button
            type="button"
            onClick={() => setIsCoreTeamOpen((prev) => !prev)}
            aria-expanded={isCoreTeamOpen}
            aria-controls="core-team-container"
            className="w-full flex items-center justify-between p-6 md:p-7 bg-[#F3EFE6] border border-[#D8CEBE] hover:border-[#4F5B2A] transition-colors duration-300 text-left group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F5B2A]"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5B2A]" />
              <div>
                <h3 className="font-display text-xl md:text-2xl text-[#2B231F] font-normal group-hover:text-[#4F5B2A] transition-colors">
                  Meet Our Core Team
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6E635B] font-light mt-0.5">
                  Facilitators, learning designers, and wellness practitioners guiding every MELD session
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#4F5B2A] font-medium shrink-0 ml-4">
              <span className="hidden sm:inline">
                {isCoreTeamOpen ? 'Collapse Team' : 'View Core Team (9)'}
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isCoreTeamOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Expandable Core Team Grid */}
          <div
            id="core-team-container"
            aria-hidden={!isCoreTeamOpen}
            className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch ${
              isCoreTeamOpen ? 'grid' : 'hidden'
            }`}
          >
            {CORE_TEAM.map((member) => (
              <article
                key={member.name}
                className="bg-[#F7F4EC] border border-[#E8E1D5] p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-[#4F5B2A] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#EAE3D5] border border-[#D8CEBE] flex items-center justify-center text-[#4F5B2A] font-display font-medium text-base shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="font-display text-base md:text-lg text-[#2B231F] font-normal leading-snug">
                        {member.name}
                      </h4>
                      <p className="font-sans text-[11px] uppercase tracking-wider text-[#4F5B2A] font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {member.credentials && (
                    <p className="font-sans text-xs text-[#2B231F] font-medium leading-relaxed pt-2 border-t border-[#E8E1D5]">
                      {member.credentials}
                    </p>
                  )}

                  <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E1D5]/60 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#968A80] font-mono">
                    MELD Core Team
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F5B2A]/70" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
