import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WeeklyEventsBrowser } from '@/components/events/WeeklyEventsBrowser'
import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent, CONFIRMED_SCHEDULED_EVENTS, sortEventsChronologically } from '@/content/events'
import type { EventItem } from '@/content/types'

export const metadata = {
  title: 'Living Calendar — Weekly Craft Sessions | Kiiro',
  description:
    'Hands-on weekend creative wellness workshops across Bangalore, Mumbai & Goa. Wheel pottery, indigo natural dyeing, heritage leathercraft, and mindful arts.',
}

export const revalidate = 30

export default async function WeeklyEventsPage() {
  const cmsEvents = await client.fetch(ALL_EVENTS_QUERY).catch(() => [])

  const eventsFromCms: EventItem[] = ((cmsEvents || []) as unknown[])
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => Boolean(event))
    .filter((event) => event.audience !== 'b2b')

  const rawEvents = eventsFromCms.length > 0 ? eventsFromCms : CONFIRMED_SCHEDULED_EVENTS
  const { upcoming, past } = sortEventsChronologically(rawEvents)

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans selection:bg-[#E8D9C8]">
      <Header />
      <main className="flex-grow">
        {/* Editorial Dark Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-24 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#A6B78F] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#A6B78F] font-semibold">
                Weekly Public Programming
              </span>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8 space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-[#FBF9F4]">
                  Living Events Calendar
                </h1>
                <p className="text-base md:text-lg text-[#D8CEBE] max-w-2xl leading-relaxed font-light">
                  Tactile, small-group creative circles hosted in working artisan sanctuaries. Step away
                  from digital screens and spend an intentional weekend making something real with your hands.
                </p>
              </div>

              {/* Live Metric Blocks */}
              <div className="md:col-span-4 flex md:justify-end gap-4 flex-wrap">
                <div className="bg-[#3D332E]/60 border border-[#4D423C] px-5 py-3.5 backdrop-blur-sm">
                  <div className="text-2xl font-sans font-bold text-[#FBF9F4]">{upcoming.length}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#A6B78F]">Upcoming Dates</div>
                </div>
                <div className="bg-[#3D332E]/60 border border-[#4D423C] px-5 py-3.5 backdrop-blur-sm">
                  <div className="text-2xl font-sans font-bold text-[#D8CEBE]">{past.length}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#968A80]">Past Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Browser Section */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <Suspense
            fallback={
              <div className="py-24 text-center text-[#6E635B] font-light">
                Loading weekly events schedule...
              </div>
            }
          >
            <WeeklyEventsBrowser upcoming={upcoming} past={past} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
