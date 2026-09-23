import Link from 'next/link'
import { CtaLink } from '@/components/ui/CtaLink'
import { availabilityLabel, formatEventDate, formatPrice, isEventPast, sortEventsChronologically } from '@/content/events'
import type { EventItem } from '@/content/types'

interface WeeklyEventsPreviewProps {
  events: EventItem[]
}

export function WeeklyEventsPreview({ events }: WeeklyEventsPreviewProps) {
  const { sortedAll } = sortEventsChronologically(events)
  const displayEvents = sortedAll.slice(0, 5)

  return (
    <section id="weekly-events" className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold" data-motion-reveal data-motion-distance="14">Living Calendar</span>
            <h2 className="font-display text-fluid-3xl font-normal" data-motion-text>Upcoming Public Programming</h2>
            <p className="text-fluid-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
              Tactile, hands-on sessions for individuals and small groups. Sorted dynamically by date so you can see what is happening next in your city.
            </p>
          </div>
          <Link
            href="/weekly-events"
            className="text-[15px] font-medium text-[#2B231F] border-b-2 border-[#2B231F] pb-1 hover:text-[#4F5B2A] hover:border-[#4F5B2A] transition-colors"
            data-motion-reveal
            data-motion-distance="18"
            data-link-motion
          >
            Explore all 20 weekly sessions →
          </Link>
        </div>

        {displayEvents.length === 0 ? (
          <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-14 space-y-6">
            <p className="font-display text-2xl text-[#2B231F]">No public sessions are listed yet.</p>
            <p className="text-sm text-[#6E635B] font-light max-w-xl leading-relaxed">
              When dates are published they will appear here with time, place, facilitator, price, and a booking option.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#E8E1D5] border-y border-[#E8E1D5]" data-motion-stagger>
            {displayEvents.map((event) => {
              const past = isEventPast(event.date)

              return (
                <li
                  key={event.id}
                  className={`py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start transition-opacity duration-300 ${
                    past ? 'opacity-65 bg-[#F3EFE6]/40 p-4 md:p-6 my-2 border border-[#E8E1D5]' : ''
                  }`}
                  data-motion-item
                >
                  <div className="md:col-span-3 text-sm text-[#6E635B] space-y-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${past ? 'text-[#968A80] line-through' : 'text-[#4F5B2A]'}`}>
                        {formatEventDate(event.date) || 'Date to be confirmed'}
                      </p>
                      {past && (
                        <span className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 bg-[#E8E1D5] text-[#6E635B] font-medium">
                          Past Session
                        </span>
                      )}
                    </div>
                    {event.startTime && <p>{event.startTime}</p>}
                    {event.location && <p className="normal-case tracking-normal text-[#6E635B]">{event.location}</p>}
                  </div>

                  <div className="md:col-span-6 space-y-2">
                    <h3 className={`font-display text-2xl ${past ? 'text-[#6E635B]' : 'text-[#2B231F]'}`}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#6E635B]">
                      {[event.experienceType, event.duration, event.facilitator].filter(Boolean).join(' · ')}
                    </p>
                    <p className="text-sm text-[#968A80]">
                      {formatPrice(event.price) || 'Price on enquiry'} · {past ? 'Completed' : availabilityLabel(event.availability)}
                    </p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    {past ? (
                      <Link
                        href={`/enquire?intent=individual&subject=${encodeURIComponent(event.title)}&event=${encodeURIComponent(event.slug)}&past=1`}
                        className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] border border-[#968A80] text-[#6E635B] hover:border-[#2B231F] hover:text-[#2B231F] transition-colors"
                      >
                        Enquire Next Date
                      </Link>
                    ) : (
                      <CtaLink
                        cta={{ label: 'Book Now', href: event.bookingHref, kind: 'booking' }}
                        variant="secondary"
                        className="w-full md:w-auto"
                      />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
