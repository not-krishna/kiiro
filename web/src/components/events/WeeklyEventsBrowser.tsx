'use client'

import { useCallback, useMemo, useState } from 'react'
import { WeeklyEventCard } from './WeeklyEventCard'
import type { EventItem } from '@/content/types'

interface WeeklyEventsBrowserProps {
  upcoming: EventItem[]
  past: EventItem[]
}

export function WeeklyEventsBrowser({ upcoming, past }: WeeklyEventsBrowserProps) {
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'in-person' | 'online'>('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Client requested cities list: Mumbai, Kolkata, Pune, Bangalore, Goa, Chennai, Hyderabad, Delhi
  const allCities = useMemo(() => {
    const requested = ['Mumbai', 'Kolkata', 'Pune', 'Bangalore', 'Goa', 'Chennai', 'Hyderabad', 'Delhi']
    const citySet = new Set<string>(requested)
    for (const evt of [...upcoming, ...past]) {
      if (evt.city && evt.city !== 'Online (Live Studio Stream)' && evt.city !== 'Bengaluru') {
        citySet.add(evt.city)
      }
    }
    return Array.from(citySet)
  }, [upcoming, past])

  // Count by format
  const inPersonCount = useMemo(() => {
    return [...upcoming, ...past].filter((e) => e.format !== 'online').length
  }, [upcoming, past])

  const onlineCount = useMemo(() => {
    return [...upcoming, ...past].filter((e) => e.format === 'online').length
  }, [upcoming, past])

  // Filter helper
  const filterList = useCallback(
    (list: EventItem[]) => {
      return list.filter((evt) => {
        const matchesFormat =
          selectedFormat === 'all' ||
          (selectedFormat === 'online' ? evt.format === 'online' : evt.format !== 'online')

        const matchesCity =
          selectedCity === 'all' ||
          (evt.city && (
            evt.city.toLowerCase() === selectedCity.toLowerCase() ||
            (selectedCity.toLowerCase() === 'bangalore' && evt.city.toLowerCase() === 'bengaluru') ||
            (selectedCity.toLowerCase() === 'bengaluru' && evt.city.toLowerCase() === 'bangalore')
          ))

        const haystack = `${evt.title} ${evt.shortDescription || ''} ${evt.city || ''} ${evt.venue || ''} ${evt.experienceType || ''} ${evt.facilitator || ''}`.toLowerCase()
        const matchesSearch =
          !searchQuery.trim() || haystack.includes(searchQuery.toLowerCase().trim())

        return matchesFormat && matchesCity && matchesSearch
      })
    },
    [selectedFormat, selectedCity, searchQuery]
  )

  const filteredUpcoming = useMemo(() => filterList(upcoming), [upcoming, filterList])
  const filteredPast = useMemo(() => filterList(past), [past, filterList])

  return (
    <div className="space-y-16">
      {/* Interactive Controls Bar: Format Filter Tabs + City Filter Tabs + Search */}
      <div className="bg-[#F3EFE6] border border-[#E8E1D5] p-5 md:p-6 space-y-4">
        {/* Row 1: Format Filter Pills (In Person / Online) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E1D5] pb-3">
          <span className="text-xs uppercase tracking-wider text-[#968A80] mr-2 font-medium shrink-0">
            Format:
          </span>
          <button
            type="button"
            onClick={() => setSelectedFormat('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              selectedFormat === 'all'
                ? 'bg-[#2B231F] text-[#FBF9F4] shadow-sm'
                : 'bg-white text-[#6E635B] hover:text-[#2B231F] border border-[#E8E1D5]'
            }`}
          >
            All Formats ({upcoming.length + past.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('in-person')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              selectedFormat === 'in-person'
                ? 'bg-[#2B231F] text-[#FBF9F4] shadow-sm'
                : 'bg-white text-[#6E635B] hover:text-[#2B231F] border border-[#E8E1D5]'
            }`}
          >
            In Person ({inPersonCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('online')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              selectedFormat === 'online'
                ? 'bg-[#2B231F] text-[#FBF9F4] shadow-sm'
                : 'bg-white text-[#6E635B] hover:text-[#2B231F] border border-[#E8E1D5]'
            }`}
          >
            Online ({onlineCount})
          </button>
        </div>

        {/* Row 2: City Filter Tabs + Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs uppercase tracking-wider text-[#968A80] mr-2 font-medium shrink-0">
              City:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                selectedCity === 'all'
                  ? 'bg-[#2B231F] text-[#FBF9F4] shadow-sm'
                  : 'bg-white text-[#6E635B] hover:text-[#2B231F] border border-[#E8E1D5]'
              }`}
            >
              All Cities ({upcoming.length + past.length})
            </button>
            {allCities.map((city) => {
              const cityCount = [...upcoming, ...past].filter(
                (e) => e.city?.toLowerCase() === city.toLowerCase()
              ).length
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                    selectedCity === city
                      ? 'bg-[#2B231F] text-[#FBF9F4] shadow-sm'
                      : 'bg-white text-[#6E635B] hover:text-[#2B231F] border border-[#E8E1D5]'
                  }`}
                >
                  {city} ({cityCount})
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative shrink-0 md:w-72">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, host, venue..."
              className="w-full bg-white border border-[#E8E1D5] px-4 py-2 text-xs text-[#2B231F] placeholder:text-[#968A80] focus:outline-none focus:border-[#4F5B2A] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#968A80] hover:text-[#2B231F]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Info Badge */}
        {(selectedFormat !== 'all' || selectedCity !== 'all' || searchQuery.trim()) && (
          <div className="flex items-center justify-between text-xs text-[#6E635B] pt-2 border-t border-[#E8E1D5]">
            <span>
              Showing {filteredUpcoming.length} upcoming and {filteredPast.length} past sessions
              {selectedFormat !== 'all' ? ` (${selectedFormat === 'online' ? 'Online' : 'In Person'})` : ''}
              {selectedCity !== 'all' ? ` in ${selectedCity}` : ''}
              {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat('all')
                setSelectedCity('all')
                setSearchQuery('')
              }}
              className="text-[#4F5B2A] hover:underline font-medium"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* SECTION 1: UPCOMING SESSIONS */}
      <section aria-labelledby="upcoming-sessions-heading" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold block">
              Live Reservations
            </span>
            <h2 id="upcoming-sessions-heading" className="font-display text-3xl md:text-4xl text-[#2B231F]">
              Upcoming Weekend Sessions
            </h2>
          </div>
          <p className="text-xs text-[#968A80] uppercase tracking-wider font-medium">
            Chronological Order · Nearest Dates First
          </p>
        </div>

        {filteredUpcoming.length === 0 ? (
          <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-10 md:p-14 text-center space-y-3">
            <p className="font-display text-2xl text-[#2B231F]">No upcoming sessions found</p>
            <p className="text-sm text-[#6E635B] font-light max-w-md mx-auto">
              There are no upcoming sessions matching your current filter. Try selecting &ldquo;All Formats&rdquo;, &ldquo;All Cities&rdquo;
              or clearing your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredUpcoming.map((event, idx) => (
              <WeeklyEventCard
                key={event.id || event.slug}
                event={event}
                isPast={false}
                priorityImage={idx < 3}
              />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL TRANSITION / DIVIDER */}
      <div className="relative my-20 py-12 px-8 md:px-12 bg-[#2B231F] text-[#FBF9F4] border border-[#3D332E] overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C2B7A8] font-semibold">
            Living Archive
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-normal leading-snug">
            Every session leaves an impression in clay, indigo, and wood.
          </h3>
          <p className="text-sm text-[#D8CEBE] font-light leading-relaxed">
            Below is our record of past public gatherings. While these specific dates have passed, our master artisans
            revisit these curriculums regularly. If a past session catches your eye, enquire to receive notification
            when it returns or book it as a private group circle.
          </p>
        </div>
        {/* Subtle decorative watermark */}
        <div
          className="absolute -right-8 -bottom-10 font-display text-[9rem] text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          KIIRO
        </div>
      </div>

      {/* SECTION 2: PAST SESSIONS */}
      <section aria-labelledby="past-sessions-heading" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#968A80] font-semibold">
              Completed Circles
            </span>
            <h2 id="past-sessions-heading" className="font-display text-3xl md:text-4xl text-[#6E635B]">
              Past Sessions Archive
            </h2>
          </div>
          <p className="text-xs text-[#968A80] uppercase tracking-wider font-medium">
            Most Recently Concluded &darr; Older Sessions
          </p>
        </div>

        {filteredPast.length === 0 ? (
          <div className="border border-[#E8E1D5] bg-[#F3EFE6]/60 p-10 text-center space-y-2">
            <p className="font-display text-xl text-[#6E635B]">No archived sessions in this view</p>
            <p className="text-xs text-[#968A80]">No past sessions match your selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPast.map((event) => (
              <WeeklyEventCard
                key={event.id || event.slug}
                event={event}
                isPast={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
