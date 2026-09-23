import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExperienceBrowser } from '@/components/experiences/ExperienceBrowser'
import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY, ALL_WORKSHOPS_QUERY, WORKSHOP_CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent } from '@/content/events'
import {
  buildExperienceCards,
  fallbackWorkshops,
  mapCmsWorkshop,
  resolveCategories,
} from '@/content/discovery'
import type { EventItem, Workshop } from '@/content/types'

export const metadata = {
  title: 'Discover creative workshops | Kiiro',
  description: 'Explore upcoming events, and find an experience that interests you.',
}

export const revalidate = 30

async function loadBrowserData() {
  const [cmsWorkshops, cmsCategories, cmsEvents] = await Promise.all([
    client.fetch(ALL_WORKSHOPS_QUERY).catch(() => []),
    client.fetch(WORKSHOP_CATEGORIES_QUERY).catch(() => []),
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
  ])

  const mappedWorkshops = ((cmsWorkshops || []) as unknown[])
    .map((doc) => mapCmsWorkshop(doc as Parameters<typeof mapCmsWorkshop>[0]))
    .filter((item): item is Workshop => Boolean(item))
  const workshops = mappedWorkshops.length ? mappedWorkshops : fallbackWorkshops()

  const events: EventItem[] = ((cmsEvents || []) as unknown[])
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => Boolean(event))
    .filter((event) => event.audience !== 'b2b')

  const categories = resolveCategories(workshops, cmsCategories || [])
  const cards = buildExperienceCards(workshops, events, categories)
  return { cards, categories }
}

export default async function ExperiencesPage() {
  const { cards, categories } = await loadBrowserData()

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <h1 className="font-display text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Discover creative workshops
            </h1>
            <p className="text-base text-[#D8CEBE] max-w-2xl leading-relaxed font-light">
              Explore upcoming events, and find an experience that interests you.
            </p>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
          <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center text-[#6E635B] font-sans">Loading experiences...</div>}>
            <ExperienceBrowser cards={cards} categories={categories} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
