import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_EVENTS } from '@/lib/data'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = FALLBACK_EVENTS.find((e) => e.slug === slug)
  return {
    title: `${event ? event.title : 'Event Booking'} | Kiiro Events`,
    description: event ? `Reserve your seat for ${event.title} in ${event.city}.` : 'Weekly craft workshop reservation.',
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let event: any = null

  try {
    event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching event from Sanity:', error)
  }

  if (!event) {
    event = FALLBACK_EVENTS.find((e) => e.slug === slug)
  }

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#C2593F]">
              <Link href="/weekly-events" className="hover:underline">Weekly Events</Link>
              <span>/</span>
              <span>{event.city}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#968A80] uppercase tracking-wider pt-2">
              <div><span className="text-[#FBF9F4]">Date:</span> {event.date}</div>
              <div><span className="text-[#FBF9F4]">Time:</span> {event.startTime}</div>
              <div><span className="text-[#FBF9F4]">Venue:</span> {event.venue}, {event.city}</div>
            </div>
          </div>
        </section>

        {/* Content & Booking Section */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
                <h3 className="font-serif text-2xl text-[#2B231F]">Workshop Details & Materials Included</h3>
                <p className="text-sm text-[#4A4036] font-light leading-relaxed">
                  Join master practitioners for a 3-hour hands-on immersion. All raw materials (natural pigments, handmade cotton rag paper, bamboo pens, or terracotta clay) are provided and included in your reservation fee.
                </p>
                <div className="pt-2 text-xs text-[#968A80] font-light">
                  • Suitable for beginner and intermediate participants.<br />
                  • Take home your completed handmade piece.<br />
                  • Tea & organic snacks served during conversation circle.
                </div>
              </div>

              {/* Form Component */}
              <div>
                <h3 className="font-serif text-2xl text-[#2B231F] mb-6">Reserve Your Seat</h3>
                <EnquiryForm defaultCategory="Individual Workshop" defaultSubject={event.title} />
              </div>
            </div>

            {/* Event Specs Sidebar */}
            <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-6 space-y-6 h-fit">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#968A80] block mb-1">
                  Reservation Fee
                </span>
                <span className="font-serif text-3xl text-[#2B231F] font-normal">
                  ₹{event.price}
                </span>
                <span className="text-xs text-[#6E635B] block mt-1">Per participant (all materials included)</span>
              </div>

              <div className="border-t border-[#E8E1D5] pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#968A80]">Capacity:</span>
                  <span className="font-semibold text-[#2B231F]">{event.capacity} seats</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#968A80]">Booking Status:</span>
                  <span className="font-semibold text-[#C2593F] uppercase tracking-wider">{event.bookingStatus}</span>
                </div>
              </div>

              <div className="border-t border-[#E8E1D5] pt-4">
                <p className="text-[11px] text-[#6E635B] leading-relaxed">
                  Notice: Cancellations requested 48 hours prior receive full credit transfer to any future weekly workshop.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
