import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EventListing } from '@/components/events/EventListing'
import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent } from '@/content/events'
import type { EventItem } from '@/content/types'

export const metadata = {
  title: 'Weekly Events | Kiiro',
  description: 'Upcoming public creative wellness sessions. Book a spot when programming is listed.',
}

export const revalidate = 30

async function loadEvents(): Promise<EventItem[]> {
  try {
    const fetched = await client.fetch(ALL_EVENTS_QUERY)
    return (fetched || []).map(mapSanityEvent).filter((event: EventItem | null): event is EventItem => Boolean(event))
  } catch {
    return []
  }
}

export default async function WeeklyEventsPage() {
  const events = await loadEvents()

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-5">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C2593F] font-semibold">Weekly Events</p>
              <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">Join a listed session</h1>
              <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
                Public programming for individuals and small groups.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto space-y-8">
          {events.length === 0 ? (
            <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-16 space-y-6">
              <h2 className="font-serif text-3xl text-[#2B231F]">No sessions are published yet</h2>
              <p className="text-sm text-[#6E635B] font-light max-w-xl leading-relaxed">
                We do not list placeholder dates. When a session is scheduled you will see its name, date, time, location, duration, facilitator, price, and a booking option here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <EventListing key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
