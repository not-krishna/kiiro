'use client'

import Link from 'next/link'

export function EnquirySection() {
  return (
    <section id="enquiry" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C2593F] font-semibold">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2B231F] font-normal leading-tight">
            Designed for Groups & Individuals
          </h2>
          <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed">
            Choose the experience path that matches your intention — customized corporate group workshops or individual creative resets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <article className="bg-[#2B231F] text-[#FBF9F4] p-8 sm:p-10 md:p-12 flex flex-col justify-between border border-[#3D332E] shadow-sm relative group hover:border-[#C2593F] transition-all duration-300">
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-[#C2593F] font-semibold">
                B2B & Group Experiences
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
                Create an Experience for Your Group
              </h3>
              <p className="text-sm md:text-base text-[#D8CEBE] font-light leading-relaxed">
                Planning a creative workshop or group experience? Tell us what you have in mind, and let&apos;s explore the possibilities.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#3D332E]">
              <Link
                href="/experiences/corporates"
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-[#C2593F] text-white font-sans text-[15px] font-medium tracking-normal hover:bg-[#A84A33] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
              >
                Plan a Corporate Experience
              </Link>
            </div>
          </article>

          <article className="bg-[#FBF9F4] text-[#2B231F] p-8 sm:p-10 md:p-12 flex flex-col justify-between border border-[#D8CEBE] shadow-sm relative group hover:border-[#2B231F] transition-all duration-300">
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-[#C2593F] font-semibold">
                B2C Individual Bookings
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-[#2B231F]">
                Find Your Next Experience
              </h3>
              <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed">
                Discover creative workshops, explore upcoming events, and find an experience that interests you.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#E8E1D5]">
              <Link
                href="/experiences"
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center px-7 py-3.5 border border-[#2B231F] text-[#2B231F] font-sans text-[15px] font-medium tracking-normal hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
              >
                Discover Experiences
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

