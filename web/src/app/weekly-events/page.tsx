import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExperienceBrowser } from '@/components/experiences/ExperienceBrowser'
import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY, ALL_WORKSHOPS_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent, CONFIRMED_SCHEDULED_EVENTS, sortEventsChronologically } from '@/content/events'
import { eventToCard, fallbackWorkshops, mapCmsWorkshop } from '@/content/discovery'
import type { EventItem, Workshop } from '@/content/types'

export const metadata = {
  title: 'Weekly Events Calendar | Kiiro',
  description: 'Upcoming public creative wellness sessions. Make something with your hands, learn new hobbies, and connect with people offline.',
}

export const revalidate = 30

export default async function WeeklyEventsPage() {
  const [cmsEvents, cmsWorkshops] = await Promise.all([
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
    client.fetch(ALL_WORKSHOPS_QUERY).catch(() => []),
  ])

  const workshops = ((cmsWorkshops || []) as unknown[])
    .map((doc) => mapCmsWorkshop(doc as Parameters<typeof mapCmsWorkshop>[0]))
    .filter((item): item is Workshop => Boolean(item))
  const workshopIndex = new Map((workshops.length ? workshops : fallbackWorkshops()).map((item) => [item.slug, item]))

  const eventsFromCms: EventItem[] = ((cmsEvents || []) as unknown[])
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => Boolean(event))
    .filter((event) => event.audience !== 'b2b')

  const rawEvents = eventsFromCms.length > 0 ? eventsFromCms : CONFIRMED_SCHEDULED_EVENTS
  const { sortedAll } = sortEventsChronologically(rawEvents)

  const cards = sortedAll.map((event) => eventToCard(event, event.workshopSlug ? workshopIndex.get(event.workshopSlug) : undefined))

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold">Weekly Events Schedule</span>
            <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight">Living Events Calendar</h1>
            <p className="text-base text-[#D8CEBE] max-w-2xl leading-relaxed font-light">
              Tactile, hands-on public sessions for individuals and small groups. Browse upcoming Sunday dates, pick something new to try, and spend time differently.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
          {cards.length === 0 ? (
            <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-16 space-y-6">
              <h2 className="font-display text-3xl text-[#2B231F]">No sessions are published yet</h2>
              <p className="text-sm text-[#6E635B] font-light max-w-xl leading-relaxed">
                Dates, cities, and venues are added when they are confirmed. We do not list placeholder schedules.
              </p>
            </div>
          ) : (
            <Suspense fallback={<div className="py-12 text-center text-[#6E635B]">Loading weekly sessions...</div>}>
              <ExperienceBrowser
                cards={cards}
                categories={[]}
                showWeeklyPrice
                emptyMessage="No weekly sessions in this category."
              />
            </Suspense>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
