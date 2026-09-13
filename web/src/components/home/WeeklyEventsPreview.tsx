import Link from 'next/link'
import { CtaLink } from '@/components/ui/CtaLink'
import { availabilityLabel, formatEventDate, formatPrice } from '@/content/events'
import type { EventItem } from '@/content/types'

interface WeeklyEventsPreviewProps {
  events: EventItem[]
}

export function WeeklyEventsPreview({ events }: WeeklyEventsPreviewProps) {
  return (
    <section id="weekly-events" className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-2xl space-y-3">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">Weekly Events</p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal">Upcoming programming</h2>
            <p className="text-sm text-[#6E635B] font-light leading-relaxed">
              Public sessions for individuals and small groups. Group and corporate programmes follow a separate enquiry path.
            </p>
          </div>
          <Link
            href="/weekly-events"
            className="text-xs uppercase tracking-[0.18em] font-semibold text-[#2B231F] border-b-2 border-[#2B231F] pb-1 hover:text-[#C2593F] hover:border-[#C2593F]"
          >
            View all events
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-14 space-y-6">
            <p className="font-serif text-2xl text-[#2B231F]">No public sessions are listed yet.</p>
            <p className="text-sm text-[#6E635B] font-light max-w-xl leading-relaxed">
              When dates are published they will appear here with time, place, facilitator, price, and a booking option.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#E8E1D5] border-y border-[#E8E1D5]">
            {events.slice(0, 4).map((event) => (
              <li key={event.id} className="py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-3 text-xs uppercase tracking-[0.14em] text-[#968A80] space-y-1">
                  <p className="text-[#C2593F] font-semibold">{formatEventDate(event.date) || 'Date to be confirmed'}</p>
                  {event.startTime && <p>{event.startTime}</p>}
                  {event.location && <p className="normal-case tracking-normal text-[#6E635B]">{event.location}</p>}
                </div>
                <div className="md:col-span-6 space-y-2">
                  <h3 className="font-serif text-2xl text-[#2B231F]">{event.title}</h3>
                  <p className="text-xs text-[#6E635B]">
                    {[event.experienceType, event.duration, event.facilitator].filter(Boolean).join(' · ')}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#968A80]">
                    {formatPrice(event.price) || 'Price on enquiry'} · {availabilityLabel(event.availability)}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <CtaLink
                    cta={{ label: 'Book Your Spot', href: event.bookingHref, kind: 'booking' }}
                    variant="secondary"
                    className="w-full md:w-auto"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
