import Link from 'next/link'
import { WeeklyEventCard } from '@/components/events/WeeklyEventCard'
import { getUpcomingWeeklyEvents, sortEventsChronologically } from '@/content/events'
import type { EventItem } from '@/content/types'

interface WeeklyEventsPreviewProps {
  events: EventItem[]
}

export function WeeklyEventsPreview({ events }: WeeklyEventsPreviewProps) {
  // Only future/upcoming events should appear here, strictly the next 3 chronologically
  const upcomingEvents = getUpcomingWeeklyEvents(events, 3)
  const { upcoming } = sortEventsChronologically(events)
  const totalUpcomingCount = upcoming.length

  return (
    <section
      id="weekly-events"
      className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-16 md:py-24 px-6 md:px-10"
      aria-label="Upcoming Weekly Events"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-2xl space-y-3">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold flex items-center gap-2"
              data-motion-reveal
              data-motion-distance="14"
            >
              <span className="w-2 h-2 bg-[#4F5B2A] animate-pulse" />
              Your Calendar of Calm
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F]" data-motion-text>
              Upcoming Sessions
            </h2>
            <p
              className="text-fluid-base text-[#6E635B] font-light leading-relaxed"
              data-motion-reveal
              data-motion-distance="18"
            >
              Weekend sessions for individuals and small groups. Pick a craft, book a seat, and give yourself a few unhurried hours.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/weekly-events"
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#2B231F] border-b-2 border-[#2B231F] pb-1 hover:text-[#4F5B2A] hover:border-[#4F5B2A] transition-colors"
              data-motion-reveal
              data-motion-distance="18"
              data-link-motion
            >
              <span>Explore all sessions &rarr;</span>
            </Link>
          </div>
        </div>

        {/* 3-Card Grid */}
        {upcomingEvents.length === 0 ? (
          <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-14 space-y-4 text-center max-w-xl mx-auto">
            <p className="font-display text-2xl text-[#2B231F]">No upcoming sessions right now</p>
            <p className="text-sm text-[#6E635B] font-light leading-relaxed">
              New Sunday dates and seasonal craft circles are added every fortnight. Check back soon or browse our full calendar.
            </p>
            <div className="pt-2">
              <Link
                href="/weekly-events"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#4F5B2A] transition-colors"
              >
                View Past & Future Calendar
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            data-motion-stagger
          >
            {upcomingEvents.map((event, idx) => (
              <WeeklyEventCard
                key={event.id || event.slug}
                event={event}
                isPast={false}
                priorityImage={idx === 0}
                showDetailedSections={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
