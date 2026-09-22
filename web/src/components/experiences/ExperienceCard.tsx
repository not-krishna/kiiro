'use client'

import Link from 'next/link'
import { MediaSlot } from '@/components/ui/MediaSlot'
import { formatEventDate, formatPrice, isEventPast } from '@/content/events'
import type { ExperienceCardModel } from '@/content/discovery'

interface ExperienceCardProps {
  card: ExperienceCardModel
  expanded: boolean
  onToggle: () => void
  showPrice: boolean
}

function bookingHref(card: ExperienceCardModel, past: boolean) {
  const event = card.event
  const params = new URLSearchParams({
    intent: 'individual',
    subject: card.name,
    workshop: card.slug,
  })
  if (event?.slug) params.set('event', event.slug)
  if (event?.date) params.set('date', event.date)
  if (event?.startTime) params.set('time', event.startTime)
  if (event?.endTime) params.set('endTime', event.endTime)
  if (event?.city) params.set('city', event.city)
  if (event?.venue) params.set('venue', event.venue)
  if (card.isWeekly) params.set('weekly', '1')
  if (event?.price != null) params.set('price', String(event.price))
  if (past) params.set('past', '1')
  return `/enquire?${params.toString()}`
}

export function ExperienceCard({ card, expanded, onToggle, showPrice }: ExperienceCardProps) {
  const event = card.event
  const past = isEventPast(event?.date)

  const timeLabel = event?.startTime
    ? event.endTime
      ? `${event.startTime} – ${event.endTime}`
      : event.startTime
    : undefined

  return (
    <article
      className={`border transition-all duration-300 shadow-sm flex flex-col group ${
        past
          ? 'border-[#E8E1D5] bg-[#F5F2EA]/80 opacity-75 hover:opacity-100 hover:border-[#968A80]'
          : 'border-[#E8E1D5] bg-[#FBF9F4] hover:border-[#D8CEBE] hover:shadow-md'
      }`}
      data-motion-card
      data-motion-item
      data-category-motion={card.categoryId}
    >
      <div
        className="relative overflow-hidden"
        data-motion-image={card.categoryId === 'wellness' ? 'center' : card.categoryId === 'traditional' ? 'organic' : 'horizontal'}
      >
        <MediaSlot
          media={card.media[0]}
          label={`${card.name} image`}
          className={`aspect-[4/3] min-h-[12rem] transition-transform duration-500 ease-out ${
            past ? 'grayscale-[20%]' : 'group-hover:scale-[1.02]'
          }`}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5" data-card-meta>
          <span className="bg-[#2B231F]/90 backdrop-blur-sm text-[#FBF9F4] text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 font-medium border border-[#3D332E]">
            {card.categoryLabel}
          </span>
          {past && (
            <span className="bg-[#6E635B] backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.14em] px-2.5 py-1.5 font-medium">
              Past Session
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="space-y-1">
          <h2
            className={`font-display text-2xl transition-colors ${
              past ? 'text-[#6E635B]' : 'text-[#2B231F] group-hover:text-[#C2593F]'
            }`}
            data-card-title
          >
            {card.name}
          </h2>
          {card.origin && (
            <p className="text-xs text-[#968A80] font-sans">Origin: {card.origin}</p>
          )}
        </div>

        {card.definition && (
          <p className="text-sm text-[#6E635B] font-light leading-relaxed line-clamp-3">
            {card.definition}
          </p>
        )}

        <dl className="text-sm text-[#6E635B] space-y-1.5 pt-2 border-t border-[#E8E1D5]/60">
          {event?.date && (
            <div className="flex justify-between gap-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-[#968A80]">Date</dt>
              <dd className={`font-medium ${past ? 'text-[#968A80] line-through' : 'text-[#2B231F]'}`}>
                {formatEventDate(event.date)}
              </dd>
            </div>
          )}
          {timeLabel && (
            <div className="flex justify-between gap-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-[#968A80]">Time</dt>
              <dd className="font-medium text-[#2B231F]">{timeLabel}</dd>
            </div>
          )}
          {event?.city && (
            <div className="flex justify-between gap-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-[#968A80]">City</dt>
              <dd className="font-medium text-[#2B231F]">{event.city}</dd>
            </div>
          )}
          {event && (
            <div className="flex justify-between gap-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-[#968A80]">Venue</dt>
              <dd className="font-medium text-[#2B231F]">{event.venue || 'Venue to be confirmed'}</dd>
            </div>
          )}
          {showPrice && formatPrice(event?.price) && (
            <div className="flex justify-between gap-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-[#C2593F] font-semibold">Price</dt>
              <dd className="font-semibold text-[#2B231F]">{formatPrice(event?.price)}</dd>
            </div>
          )}
        </dl>

        {expanded && (
          <div className="border-t border-[#E8E1D5] pt-5 space-y-5 text-sm text-[#6E635B] animate-in fade-in slide-in-from-top-2 duration-300">
            {card.definition && (
              <section className="space-y-1.5">
                <h3 className="font-display text-lg text-[#2B231F]">About the experience</h3>
                <p className="font-light leading-relaxed">{card.definition}</p>
              </section>
            )}

            {card.processSteps.length > 0 && (
              <section className="space-y-2">
                <h3 className="font-display text-lg text-[#2B231F]">The process & making</h3>
                {card.processSteps.length === 1 ? (
                  <p className="font-light leading-relaxed whitespace-pre-line">{card.processSteps[0]}</p>
                ) : (
                  <ol className="list-decimal pl-5 space-y-1.5 font-light text-[#2B231F]">
                    {card.processSteps.map((step, idx) => (
                      <li key={idx} className="pl-1">
                        <span className="text-[#6E635B]">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            )}

            {card.outcome && (
              <section className="space-y-1.5 bg-[#F3EFE6] p-4 border border-[#E8E1D5]">
                <h3 className="font-display text-lg text-[#2B231F]">What you get to take home</h3>
                <p className="font-light leading-relaxed text-[#2B231F] whitespace-pre-line">{card.outcome}</p>
              </section>
            )}

            {(card.duration || event?.facilitator || card.materials || card.skillLevel) && (
              <section className="space-y-1 pt-2 border-t border-[#E8E1D5]">
                <h3 className="font-display text-base text-[#2B231F] mb-1.5">Additional information</h3>
                {card.duration && <p><span className="font-medium text-[#2B231F]">Duration:</span> {card.duration}</p>}
                {event?.facilitator && <p><span className="font-medium text-[#2B231F]">Host:</span> {event.facilitator}</p>}
                {card.skillLevel && <p><span className="font-medium text-[#2B231F]">Skill level:</span> {card.skillLevel}</p>}
                {card.materials && <p><span className="font-medium text-[#2B231F]">Materials provided:</span> {card.materials}</p>}
              </section>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E8E1D5]">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="kiiro-cta flex-1 min-h-12 inline-flex items-center justify-center gap-2 border border-[#2B231F] text-[#2B231F] text-[14px] font-medium hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
          >
            <span>{expanded ? 'Hide details' : 'Show details'}</span>
            <svg
              data-card-arrow
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Link
            href={bookingHref(card, past)}
            onClick={(e) => e.stopPropagation()}
            className={`kiiro-cta flex-1 min-h-12 inline-flex items-center justify-center text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F] ${
              past
                ? 'border border-[#6E635B] text-[#6E635B] hover:bg-[#2B231F] hover:text-white hover:border-[#2B231F]'
                : 'bg-[#C2593F] text-white hover:bg-[#A84A33]'
            }`}
          >
            <span>{past ? 'Enquire Next Date' : 'Book Now'}</span>
            <span aria-hidden="true" data-cta-arrow>&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
