'use client'

import Link from 'next/link'

export function EnquirySection() {
  return (
    <section id="enquiry" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold" data-motion-reveal data-motion-distance="14">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2B231F] font-normal leading-tight" data-motion-text>
            Your hands already know how to unwind.
          </h2>
          <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            Whether it&apos;s one quiet Sunday or a team day out, give yourself the break that actually restores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch" data-motion-stagger>
          <article className="bg-[#2B231F] text-[#FBF9F4] p-8 sm:p-10 md:p-12 flex flex-col justify-between border border-[#4D423C] shadow-md relative group hover:border-[#A6B78F] transition-all duration-300" data-motion-item data-motion-card>
            <div className="space-y-6">
              <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#A6B78F] font-semibold">
                B2B & Group Experiences
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-[#FBF9F4]" data-card-title>
                Create an Experience for Your Team
              </h3>
              <p className="text-sm md:text-base text-[#E8E1D5] font-light leading-relaxed">
                Planning a creative workshop or group experience? Tell us what you have in mind, and let&apos;s explore the possibilities.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#4D423C]">
              <Link
                href="/experiences/corporates"
                className="kiiro-cta w-full sm:w-auto inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-[#4F5B2A] text-[#FBF9F4] font-sans text-[15px] font-medium tracking-normal hover:bg-[#3D4721] border border-[#A6B78F]/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B78F]"
              >
                <span>Plan a Group Experience</span>
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
                <span>Book Your First Session</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
