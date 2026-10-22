import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IndividualBookingForm } from '@/components/ui/forms/IndividualBookingForm'
import { CtaLink } from '@/components/ui/CtaLink'
import { MediaSlot } from '@/components/ui/MediaSlot'
import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { availabilityLabel, CONFIRMED_SCHEDULED_EVENTS, formatEventDate, formatPrice, mapSanityEvent } from '@/content/events'
import { getContentStore } from '@/lib/cms/contentStore'
import type { EventItem } from '@/content/types'

export const revalidate = 30

async function loadEvent(slug: string): Promise<EventItem | null> {
  try {
    const doc = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })
    if (doc) {
      const mapped = mapSanityEvent(doc)
      if (mapped) return mapped
    }
  } catch {
    // CMS not connected or fetch failed
  }

  let event: EventItem | null = null
  const store = getContentStore()
  const foundInStore = store.events.find((e) => e.slug === slug && e.published !== false)
  if (foundInStore) {
    event = foundInStore as unknown as EventItem
  } else {
    event = CONFIRMED_SCHEDULED_EVENTS.find((e) => e.slug === slug) || null
  }

  if (event && (event.slug?.toLowerCase().includes('kintsugi') || event.title?.toLowerCase().includes('kintsugi'))) {
    event = {
      ...event,
      venue: 'ITC Fortune',
      city: 'Goa',
      location: 'ITC Fortune, Candolim, Goa',
      address: 'Bamon Vaddo, Candolim, Bardez, North Goa, 403515 / 403516',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ITC+Fortune,+Bamon+Vaddo,+Candolim,+Bardez,+North+Goa,+403515',
    }
  }

  return event
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await loadEvent(slug)
  return {
    title: event ? `${event.title} | MELD EXPERIENCES` : 'Event | MELD EXPERIENCES',
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
        <section className="border-b border-[#E8E1D5] bg-[#FBF9F4]">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold">
                <span>Weekly Events</span>
                <span>/</span>
                <span>{event.experienceType || 'Living Craft'}</span>
              </div>

              {/* 1. Event Name */}
              <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight text-[#2B231F]">
                {event.title}
              </h1>

              {/* 2. Date, 3. Time, 4. Location Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#E8E1D5] py-4 text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#968A80] font-semibold">Date</span>
                  <span className="font-medium text-[#2B231F] mt-0.5 block">
                    {formatEventDate(event.date) || 'To be announced'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#968A80] font-semibold">Time</span>
                  <span className="font-medium text-[#2B231F] mt-0.5 block">
                    {event.startTime ? `${event.startTime}${event.endTime ? ` – ${event.endTime}` : ''}` : '3 Hours'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#968A80] font-semibold">Location</span>
                  {event.googleMapsUrl ? (
                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#2B231F] hover:text-[#4F5B2A] hover:underline mt-0.5 inline-flex items-center gap-1 transition-colors"
                      title="Open venue in Google Maps"
                    >
                      <span>{event.location || event.city || 'Studio Hub'}</span>
                      <svg className="w-3 h-3 text-[#4F5B2A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="font-medium text-[#2B231F] mt-0.5 block">
                      {event.location || event.city || 'Studio Hub'}
                    </span>
                  )}
                </div>
              </div>

              {/* 5. Description */}
              {event.shortDescription && (
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
                    Description
                  </h3>
                  <p className="text-base text-[#4A4036] font-light leading-relaxed">
                    {event.shortDescription}
                  </p>
                </div>
              )}

              {/* 6. Key Process */}
              {event.keyProcess && (
                <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
                    Key Process
                  </h3>
                  <p className="text-sm text-[#4A4036] font-light leading-relaxed">
                    {Array.isArray(event.keyProcess) ? event.keyProcess.join(' → ') : event.keyProcess}
                  </p>
                </div>
              )}

              {/* 7. Take Away / Keepsake */}
              {event.takeAway && (
                <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
                    Take Away / Keepsake
                  </h3>
                  <p className="text-sm text-[#4A4036] font-light leading-relaxed">
                    {event.takeAway}
                  </p>
                </div>
              )}

              {/* Session Meta */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-[#6E635B] border-t border-[#E8E1D5]">
                {event.facilitator && (
                  <div>
                    <span className="text-[#968A80] uppercase tracking-wider text-[10px] block">Facilitator</span>
                    <span className="font-medium text-[#2B231F]">{event.facilitator}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#968A80] uppercase tracking-wider text-[10px] block">Price</span>
                  <span className="font-serif text-xl text-[#2B231F]">{formatPrice(event.price)}</span>
                </div>
                <div>
                  <span className="text-[#968A80] uppercase tracking-wider text-[10px] block">Status</span>
                  <span className="font-medium text-[#4F5B2A]">{availabilityLabel(event.availability)}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between">
              <MediaSlot media={event.media[0]} label="Session image" className="min-h-[18rem] h-full" />
            </div>
          </div>
        </section>

        {/* 8. Book Now Section */}
        <section id="book-now" className="py-16 px-6 md:px-10 max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-8">
            {canBook ? (
              <div className="space-y-6">
                <div className="border-b border-[#E8E1D5] pb-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold">
                    Reserve Your Seat
                  </span>
                  <h2 className="font-display text-3xl text-[#2B231F] mt-1">Book Now</h2>
                  <p className="text-sm text-[#6E635B] font-light mt-1">
                    Direct individual booking for this scheduled session. Instant confirmation holds your place.
                  </p>
                </div>
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
              <div className="p-8 border border-[#E8E1D5] bg-white text-center space-y-4">
                <h3 className="font-display text-xl text-[#2B231F]">Session Completed</h3>
                <p className="text-sm text-[#6E635B]">
                  This session is not open for new bookings. Browse our upcoming calendar or enquire for upcoming private dates.
                </p>
                <Link
                  href="/weekly-events"
                  className="inline-block bg-[#4F5B2A] text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#3D4721]"
                >
                  View Upcoming Events
                </Link>
              </div>
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
