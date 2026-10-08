import Link from 'next/link'

export function OnlineSessionsCallout() {
  return (
    <section
      id="online-sessions"
      className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-14 md:py-20 px-6 md:px-10"
      aria-label="Online Sessions"
    >
      <div className="max-w-7xl mx-auto">
        {/* Visually secondary container */}
        <div
          className="border border-[#E8E1D5] bg-[#F7F4EC] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-5xl mx-auto transition-colors duration-300 hover:border-[#D8CEBE]"
          data-motion-card
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#6E635B] font-medium block">
              Live Guided Online Format
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-normal text-[#2B231F] leading-snug">
              Can&apos;t make it in person? We&apos;ll come to you.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed">
              Distance, schedules, and circumstances shouldn&apos;t keep anyone from a creative reset. Our online sessions keep the same Root, Create, Restore arc, guided live by an artisan, so you&apos;re still making with your own hands, wherever you are.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/weekly-events?format=online"
              className="kiiro-cta inline-flex items-center gap-2 text-sm font-sans font-medium text-[#2B231F] border-b-2 border-[#2B231F] pb-1 hover:text-[#4F5B2A] hover:border-[#4F5B2A] transition-colors"
              data-link-motion
            >
              <span>Explore online sessions</span>
              <span aria-hidden="true" data-cta-arrow>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
