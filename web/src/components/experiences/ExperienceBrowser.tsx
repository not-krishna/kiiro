'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExperienceCard } from './ExperienceCard'
import { WORKSHOP_CATEGORIES } from '@/content/workshops'
import type { ExperienceCardModel } from '@/content/discovery'
import type { WorkshopCategoryItem } from '@/content/types'

interface ExperienceBrowserProps {
  cards: ExperienceCardModel[]
  categories?: WorkshopCategoryItem[]
  showWeeklyPrice?: boolean
  emptyMessage?: string
}

export function ExperienceBrowser({
  cards,
  categories,
  showWeeklyPrice = false,
  emptyMessage = 'No experiences found matching your criteria.',
}: ExperienceBrowserProps) {
  const searchParams = useSearchParams()
  const initialCity = searchParams.get('city')

  const [category, setCategory] = useState('all')
  const [activeCity, setActiveCity] = useState<string | null>(initialCity)
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const availableCategoryList = useMemo(() => {
    if (categories?.length) {
      return categories
    }
    return WORKSHOP_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      id: c.id,
      label: c.label,
    }))
  }, [categories])

  const visibleCategories = useMemo(() => {
    return availableCategoryList.filter((cat) =>
      cards.some(
        (card) =>
          card.categoryId === cat.id ||
          (cat.id === 'traditional' && card.categoryId === 'traditional') ||
          (cat.id === 'contemporary' && card.categoryId === 'contemporary') ||
          (cat.id === 'wellness' && card.categoryId === 'wellness')
      )
    )
  }, [availableCategoryList, cards])

  const list = useMemo(() => {
    return cards.filter((card) => {
      const matchesCategory = category === 'all' || card.categoryId === category

      const matchesCity = !activeCity || (
        card.event?.city?.toLowerCase() === activeCity.toLowerCase() ||
        `${card.name} ${card.origin || ''} ${card.definition || ''}`.toLowerCase().includes(activeCity.toLowerCase())
      )

      const haystack = `${card.name} ${card.definition || ''} ${card.origin || ''} ${card.categoryLabel} ${card.event?.city || ''} ${card.event?.venue || ''}`.toLowerCase()
      const matchesSearch = !searchQuery.trim() || haystack.includes(searchQuery.toLowerCase().trim())

      return matchesCategory && matchesCity && matchesSearch
    })
  }, [cards, category, activeCity, searchQuery])

  return (
    <div className="space-y-8">
      {activeCity && (
        <div className="bg-[#2B231F] text-[#FBF9F4] p-4 sm:p-5 border border-[#3D332E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-[#4F5B2A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-display text-lg">Experiences in {activeCity}</p>
              <p className="text-xs text-[#D8CEBE] font-light">
                Showing {list.length} {list.length === 1 ? 'experience' : 'experiences'} listed for {activeCity}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveCity(null)}
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] px-4 py-2 border border-[#D8CEBE]/40 text-[#FBF9F4] hover:border-[#4F5B2A] hover:text-[#4F5B2A] transition-colors"
          >
            Show All Cities
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-6" data-motion-reveal data-motion-distance="18">
        <div
          className="flex gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
          role="tablist"
          aria-label="Experience categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={category === 'all'}
            onClick={() => setCategory('all')}
            className={`shrink-0 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] ${
              category === 'all'
                ? 'bg-[#2B231F] text-[#FBF9F4] border border-[#2B231F] shadow-sm'
                : 'bg-white border border-[#E8E1D5] text-[#6E635B] hover:border-[#2B231F] hover:text-[#2B231F]'
            }`}
          >
            All Experiences ({cards.length})
          </button>
          {visibleCategories.map((item) => {
            const count = cards.filter((c) => c.categoryId === item.id).length
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`shrink-0 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] ${
                  category === item.id
                    ? 'bg-[#2B231F] text-[#FBF9F4] border border-[#2B231F] shadow-sm'
                    : 'bg-white border border-[#E8E1D5] text-[#6E635B] hover:border-[#2B231F] hover:text-[#2B231F]'
                }`}
              >
                {item.label} ({count})
              </button>
            )
          })}
        </div>

        <div className="w-full md:w-72 relative">
          <label htmlFor="experience-search" className="sr-only">
            Search experiences
          </label>
          <input
            id="experience-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiences..."
            className="w-full bg-white border border-[#E8E1D5] px-4 py-2.5 text-sm text-[#2B231F] placeholder-[#968A80] focus:outline-none focus:border-[#4F5B2A] focus:ring-1 focus:ring-[#4F5B2A] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#968A80] hover:text-[#2B231F]"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-14 text-center space-y-4">
          <p className="font-display text-2xl text-[#2B231F]">
            {activeCity ? `No listed events found in ${activeCity}` : emptyMessage}
          </p>
          <p className="text-sm text-[#6E635B] font-light max-w-md mx-auto">
            {activeCity
              ? `We host sessions across major cities. Clear the city filter to browse our full workshop catalogue or submit a custom group request.`
              : `Try resetting your category filter or search query to explore more available creative workshops.`}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('all')
              setActiveCity(null)
              setSearchQuery('')
            }}
            className="inline-flex min-h-11 items-center px-6 bg-[#2B231F] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#4F5B2A] transition-colors"
          >
            Show All Experiences
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-motion-stagger>
          {list.map((card) => (
            <ExperienceCard
              key={card.id}
              card={card}
              expanded={openId === card.id}
              onToggle={() => setOpenId((current) => (current === card.id ? null : card.id))}
              showPrice={showWeeklyPrice && card.isWeekly}
            />
          ))}
        </div>
      )}
    </div>
  )
}

