import { CtaLink } from '@/components/ui/CtaLink'
import { MediaSlot } from '@/components/ui/MediaSlot'
import { availabilityLabel, formatEventDate, formatPrice } from '@/content/events'
import type { EventItem } from '@/content/types'

export function EventListing({ event }: { event: EventItem }) {
  return (
    <article className="border border-[#E8E1D5] bg-[#FBF9F4] grid md:grid-cols-12">
      <div className="md:col-span-4 min-h-[12rem]">
        <MediaSlot media={event.media[0]} label="Event image" className="h-full min-h-[12rem]" />
      </div>
      <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#4F5B2A]">
            {formatEventDate(event.date) || 'Date to be confirmed'}
            {event.startTime ? ` · ${event.startTime}` : ''}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-[#2B231F]">{event.title}</h2>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#6E635B]">
            {event.location && (
              <>
                <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Location</dt>
                <dd>{event.location}</dd>
              </>
            )}
            {event.experienceType && (
              <>
                <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Type</dt>
                <dd>{event.experienceType}</dd>
              </>
            )}
            {event.duration && (
              <>
                <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Duration</dt>
                <dd>{event.duration}</dd>
              </>
            )}
            {event.facilitator && (
              <>
                <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Facilitator</dt>
                <dd>{event.facilitator}</dd>
              </>
            )}
            <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Price</dt>
            <dd>{formatPrice(event.price) || 'On enquiry'}</dd>
            <dt className="uppercase tracking-[0.14em] text-[10px] text-[#968A80]">Availability</dt>
            <dd>{availabilityLabel(event.availability)}</dd>
          </dl>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <CtaLink cta={{ label: 'Book Your Spot', href: event.bookingHref, kind: 'booking' }} variant="primary" />
        </div>
      </div>
    </article>
  )
}
