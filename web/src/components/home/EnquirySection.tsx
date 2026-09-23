'use client'

import Link from 'next/link'

export function EnquirySection() {
  return (
    <section id="enquiry" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold" data-motion-reveal data-motion-distance="14">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2B231F] font-normal leading-tight" data-motion-text>
            Designed for Groups & Individuals
          </h2>
          <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            Choose the experience path that matches your intention — customized corporate group workshops or individual creative resets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch" data-motion-stagger>
          <article className="bg-[#2B231F] text-[#FBF9F4] p-8 sm:p-10 md:p-12 flex flex-col justify-between border border-[#3D332E] shadow-sm relative group hover:border-[#4F5B2A] transition-all duration-300" data-motion-item data-motion-card>
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-[#4F5B2A] font-semibold">
                B2B & Group Experiences
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight" data-card-title>
                Create an Experience for Your Team
              </h3>
              <p className="text-sm md:text-base text-[#D8CEBE] font-light leading-relaxed">
                Planning a creative workshop or group experience? Tell us what you have in mind, and let&apos;s explore the possibilities.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#3D332E]">
              <Link
                href="/experiences/corporates"
                className="kiiro-cta w-full sm:w-auto inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-[#4F5B2A] text-white font-sans text-[15px] font-medium tracking-normal hover:bg-[#3D4721] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
              >
                <span>Plan a Corporate Experience</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
            </div>
          </article>

          <article className="bg-[#FBF9F4] text-[#2B231F] p-8 sm:p-10 md:p-12 flex flex-col justify-between border border-[#D8CEBE] shadow-sm relative group hover:border-[#2B231F] transition-all duration-300" data-motion-item data-motion-card>
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-[#4F5B2A] font-semibold">
                B2C Individual Bookings
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-[#2B231F]" data-card-title>
                Discover creative workshops
              </h3>
              <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed">
                Explore upcoming events, and find an experience that interests you.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#E8E1D5]">
              <Link
                href="/weekly-events"
                className="kiiro-cta w-full sm:w-auto inline-flex min-h-12 items-center justify-center px-7 py-3.5 border border-[#2B231F] text-[#2B231F] font-sans text-[15px] font-medium tracking-normal hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
              >
                <span>Book your weekly event</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
