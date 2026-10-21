'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WeeklyEventCard } from '@/components/events/WeeklyEventCard'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import type { OfferingItem } from '@/content/offeringsData'
import type { EventItem } from '@/content/types'

interface OfferingDetailViewProps {
  offering: OfferingItem
  relatedEvents: EventItem[]
}

export function OfferingDetailView({ offering, relatedEvents }: OfferingDetailViewProps) {
  const categoryPillarLabel =
    offering.category === 'traditional'
      ? 'Traditional Art · Root'
      : offering.category === 'contemporary'
      ? 'Contemporary Art · Create'
      : 'Wellness Practice · Restore'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* ======================================================== */}
        {/* 1. HERO SECTION: ARTFORM / OUR OFFERINGS                 */}
        {/* ======================================================== */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-24 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D99B26] font-medium">
              <Link href="/artforms" className="hover:underline">
                Our Offerings
              </Link>
              <span>/</span>
              <span>{categoryPillarLabel}</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A6B78F] font-semibold block">
                Artform / Our Offerings
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#FBF9F4]">
                {offering.title}
              </h1>
            </div>

            {/* Overview Quick Metadata */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#D8CEBE] uppercase tracking-wider pt-4 border-t border-white/10 font-sans">
              <div>
                <span className="text-[#968A80] block text-[10px]">Workshop Duration</span>
                <span className="text-[#FBF9F4] font-medium">{offering.workshopDuration}</span>
              </div>
              <div>
                <span className="text-[#968A80] block text-[10px]">Format</span>
                <span className="text-[#FBF9F4] font-medium">{offering.format}</span>
              </div>
              <div>
                <span className="text-[#968A80] block text-[10px]">Locations</span>
                <span className="text-[#A6B78F] font-semibold">{offering.locations.join(' · ')}</span>
              </div>
              <div>
                <span className="text-[#968A80] block text-[10px]">Facilitation</span>
                <span className="text-[#FBF9F4] font-medium">{offering.facilitator}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ARTFORM KNOWLEDGE ARCHITECTURE                        */}
        {/* All required: Definition, Origin, Age / How Old, Impact, */}
        {/* Why Should It Be Learnt, Key Process, Learning Duration  */}
        {/* ======================================================== */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-6xl mx-auto space-y-16">
          {/* Main Visual & Content Grid */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-8">
              {/* DEFINITION */}
              <div className="border-l-2 border-[#4F5B2A] pl-6 py-2 space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A] block">
                  Definition
                </span>
                <p className="text-xl md:text-2xl font-display text-[#2B231F] leading-relaxed">
                  {offering.definition}
                </p>
              </div>

              {/* ORIGIN & AGE / HOW OLD */}
              <div className="grid sm:grid-cols-2 gap-6 bg-[#F3EFE6] border border-[#E8E1D5] p-6">
                <div className="space-y-1.5">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
                    Origin
                  </h3>
                  <p className="text-sm font-medium text-[#2B231F] leading-relaxed">
                    {offering.origin}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
                    Age / How Old
                  </h3>
                  <p className="text-sm font-medium text-[#2B231F] leading-relaxed">
                    {offering.age}
                  </p>
                </div>
              </div>

              {/* IMPACT */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A] block">
                  Impact
                </span>
                <h3 className="font-display text-2xl text-[#2B231F]">
                  Cultural Relevance & Contemporary Impact
                </h3>
                <p className="text-sm md:text-base text-[#4A4036] font-light leading-relaxed">
                  {offering.impact}
                </p>
              </div>

              {/* WHY SHOULD IT BE LEARNT */}
              <div className="space-y-3 bg-white border border-[#E8E1D5] p-6">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A] block">
                  Why Should It Be Learnt
                </span>
                <h3 className="font-display text-2xl text-[#2B231F]">
                  The Significance of Experiencing {offering.title}
                </h3>
                <p className="text-sm md:text-base text-[#4A4036] font-light leading-relaxed">
                  {offering.whyLearn}
                </p>
              </div>
            </div>

            {/* Media / Image Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] shadow-xs">
                <Image
                  src={offering.imageUrl}
                  alt={offering.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* HOW LONG IT TAKES TO LEARN */}
              <div className="bg-[#2B231F] text-[#FBF9F4] p-6 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D99B26] font-semibold block">
                  How Long It Takes to Learn
                </span>
                <p className="text-xs md:text-sm text-[#D8CEBE] font-light leading-relaxed">
                  {offering.learningDuration}
                </p>
              </div>

              {/* Audience & Outcomes Quick Reference */}
              <div className="border border-[#E8E1D5] bg-white p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#968A80] block mb-1">
                    Target Audience
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {offering.audience.map((aud) => (
                      <span
                        key={aud}
                        className="px-2.5 py-1 text-[11px] font-medium bg-[#F3EFE6] text-[#2B231F] border border-[#E8E1D5]"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E8E1D5] pt-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#968A80] block mb-1">
                    Takeaway & Keepsake
                  </span>
                  <p className="text-xs text-[#4A4036] font-light leading-relaxed">
                    {offering.outcomes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KEY PROCESS (Full Width Breakdown) */}
          <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold block">
                Key Process
              </span>
              <h2 className="font-display text-3xl text-[#2B231F] mt-1">
                Key Process & Traditional Stages
              </h2>
              <p className="text-sm text-[#6E635B] font-light mt-1 max-w-3xl">
                Every practitioner moves through these sequential techniques under direct master artisan guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offering.keyProcess.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E8E1D5] p-6 space-y-3 relative hover:border-[#4F5B2A] transition-colors"
                >
                  <span className="font-mono text-xs text-[#4F5B2A] font-bold block">
                    STAGE 0{idx + 1}
                  </span>
                  <p className="text-sm text-[#2B231F] font-normal leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. KIIRO WORKSHOP & BOOKING FLOW                         */}
        {/* ======================================================== */}
        <section className="bg-[#F3EFE6] border-y border-[#E8E1D5] py-16 px-6 md:px-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold">
                Hands-on Workshop Experience
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#2B231F]">
                Experience {offering.title} in Person
              </h2>
              <p className="text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-2xl">
                We organize immersive studio masterclasses for individuals, private circles, corporate retreats, and institutional groups across {offering.locations.join(', ')}. All raw materials, specialized tools, and direct artisan guidance are fully provided.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                href={`/enquire?intent=individual&subject=${encodeURIComponent(offering.title)}`}
                className="w-full text-center bg-[#2B231F] hover:bg-[#4F5B2A] text-white py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-colors shadow-sm"
              >
                Book / Enquire →
              </Link>
              <Link
                href={`/experiences/corporates?offering=${encodeURIComponent(offering.slug)}`}
                className="w-full text-center border border-[#2B231F] text-[#2B231F] hover:bg-[#2B231F] hover:text-white py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                Plan Corporate Team Session
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. UPCOMING EVENTS (WEEKLY EVENT CARDS)                  */}
        {/* ======================================================== */}
        <section className="bg-[#FBF9F4] py-16 md:py-24 px-6 md:px-10 border-b border-[#E8E1D5]">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold block">
                  Upcoming Events
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[#2B231F]">
                  Scheduled Dates & Sessions
                </h2>
                <p className="text-sm text-[#6E635B] font-light">
                  Public weekend sessions currently scheduled for {offering.title}.
                </p>
              </div>
              <Link
                href="/weekly-events"
                className="text-xs uppercase tracking-[0.16em] text-[#2B231F] hover:text-[#4F5B2A] font-semibold underline underline-offset-4"
              >
                View Full Calendar →
              </Link>
            </div>

            {relatedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((evt) => (
                  <WeeklyEventCard key={evt.id || evt.slug} event={evt} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E8E1D5] p-10 md:p-14 text-center space-y-5 max-w-3xl mx-auto">
                <div className="w-10 h-10 mx-auto bg-[#F3EFE6] border border-[#D8CEBE] flex items-center justify-center text-[#4F5B2A] text-lg">
                  ✦
                </div>
                <h3 className="font-display text-2xl text-[#2B231F]">
                  No Public Sessions Currently Scheduled
                </h3>
                <p className="text-sm text-[#6E635B] font-light leading-relaxed max-w-xl mx-auto">
                  New public calendar dates for {offering.title} open periodically. You can request a private studio session, schedule a corporate team masterclass, or join our notification waitlist.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/enquire?intent=individual&subject=${encodeURIComponent(offering.title)}`}
                    className="inline-block bg-[#4F5B2A] hover:bg-[#3D4721] text-white px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                  >
                    Request Private Session →
                  </Link>
                  <Link
                    href="/weekly-events"
                    className="inline-block border border-[#2B231F] text-[#2B231F] hover:bg-[#2B231F] hover:text-white px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                  >
                    Explore Other Weekly Events
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. TESTIMONIALS: "What the partner has to say"           */}
        {/* ======================================================== */}
        <TestimonialsSection title="What a creative break did for them" />
      </main>

      <Footer />
    </div>
  )
}
