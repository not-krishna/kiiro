import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IndividualBookingForm } from '@/components/ui/forms/IndividualBookingForm'
import { CtaLink } from '@/components/ui/CtaLink'
import { MediaSlot } from '@/components/ui/MediaSlot'
import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { availabilityLabel, formatEventDate, formatPrice, mapSanityEvent } from '@/content/events'
import type { EventItem } from '@/content/types'

export const revalidate = 30

async function loadEvent(slug: string): Promise<EventItem | null> {
  try {
    const doc = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })
    return mapSanityEvent(doc)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await loadEvent(slug)
  return {
    title: event ? `${event.title} | Kiiro Events` : 'Event | Kiiro',
    description: event
      ? `Book a spot for ${event.title}${event.location ? ` in ${event.location}` : ''}.`
      : 'Weekly creative wellness session.',
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await loadEvent(slug)
  if (!event) notFound()

  const canBook = event.availability === 'open' || event.availability === 'limited' || event.availability === 'enquiry-only'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="border-b border-[#E8E1D5]">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7 space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A]">Weekly Events</p>
              <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight">{event.title}</h1>
              <dl className="space-y-3 text-sm text-[#6E635B]">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Date & time</dt>
                  <dd>
                    {formatEventDate(event.date) || 'To be confirmed'}
                    {event.startTime ? ` · ${event.startTime}` : ''}
                  </dd>
                </div>
                {event.location && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Location</dt>
                    <dd>{event.location}</dd>
                  </div>
                )}
                {event.duration && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Duration</dt>
                    <dd>{event.duration}</dd>
                  </div>
                )}
                {event.facilitator && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Facilitator</dt>
                    <dd>{event.facilitator}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Price</dt>
                  <dd className="font-serif text-2xl text-[#2B231F]">{formatPrice(event.price) || 'On enquiry'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">Availability</dt>
                  <dd>{availabilityLabel(event.availability)}</dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-5">
              <MediaSlot media={event.media[0]} label="Session image" className="min-h-[16rem] h-full" />
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-8">
            {canBook ? (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl">Book Your Spot</h2>
                <p className="text-sm text-[#6E635B] font-light">
                  This holds a request for the listed session. Payment, if required, is confirmed by the Kiiro team after your request.
                </p>
                <IndividualBookingForm
                  eventTitle={event.title}
                  eventDate={event.date}
                  eventTime={event.startTime}
                  eventEndTime={event.endTime}
                  eventCity={event.city}
                  eventVenue={event.venue}
                  eventPrice={event.price}
                  isWeekly={event.isWeekly}
                />
              </div>
            ) : (
              <p className="text-sm text-[#6E635B]">This session is not open for individual booking.</p>
            )}
          </div>
          <aside className="md:col-span-5 border border-[#E8E1D5] bg-[#F3EFE6] p-8 space-y-4 h-fit">
            <h2 className="font-serif text-2xl">Planning for a group?</h2>
            <p className="text-sm text-[#6E635B] font-light leading-relaxed">
              Organisations, hospitality partners, and institutions do not use this individual hold. Use the workshop catalogue instead.
            </p>
            <CtaLink
              cta={{ label: 'Browse the catalogue', href: '/experiences/corporates', kind: 'enquiry' }}
              variant="secondary"
            />
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
