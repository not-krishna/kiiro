'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  formatAvailabilityLabel,
  formatEventDate,
  formatPrice,
  isEventPast,
  parseEventDateBadge,
} from '@/content/events'
import type { EventItem } from '@/content/types'

interface WeeklyEventCardProps {
  event: EventItem
  isPast?: boolean
  priorityImage?: boolean
  showDetailedSections?: boolean
}

export function WeeklyEventCard({
  event,
  isPast: forcedPast,
  priorityImage = false,
  showDetailedSections = false,
}: WeeklyEventCardProps) {
  const [showInfo, setShowInfo] = useState(false)
  const isPast = forcedPast ?? isEventPast(event.date)
  const dateBadge = parseEventDateBadge(event.date)

  const imageSrc = event.media?.[0]?.source || '/images/other/pottery-1.png'
  const imageAlt = event.media?.[0]?.alt || event.title

  // Booking or enquiry URL
  const actionHref = isPast
    ? `/enquire?intent=individual&subject=${encodeURIComponent(event.title)}&event=${encodeURIComponent(event.slug)}&past=1`
    : event.bookingHref || `/enquire?intent=individual&subject=${encodeURIComponent(event.title)}&event=${encodeURIComponent(event.slug)}&weekly=1`

  // Field fallbacks to ensure ALL 7 required fields are strictly populated
  const eventTitle = event.title || 'Living Craft Workshop'
  const formattedDate = formatEventDate(event.date) || 'Upcoming Weekend Session'
  const eventTime = event.startTime
    ? `${event.startTime}${event.endTime ? ` – ${event.endTime}` : ''}`
    : '10:30 AM – 01:30 PM'
  // Enforce verified Kintsugi location from LOCATIONS(1).csv (Candolim, Goa at ITC Fortune)
  const isKintsugi =
    event.slug?.toLowerCase().includes('kintsugi') ||
    event.title?.toLowerCase().includes('kintsugi') ||
    event.workshopSlug?.toLowerCase() === 'kintsugi'

  const locationText = isKintsugi
    ? 'ITC Fortune, Candolim, Goa'
    : event.location ||
      [event.venue, event.city].filter(Boolean).join(', ') ||
      (event.city ? `${event.city}, India` : 'Candolim, Goa')
  const descriptionText =
    event.shortDescription ||
    'Immersive hands-on masterclass guided by master artisans, focusing on tactile techniques, traditional materials, and living cultural heritage.'
  const keyProcessText = Array.isArray(event.keyProcess)
    ? event.keyProcess.join(' → ')
    : event.keyProcess ||
      'Ancestral material preparation, step-by-step master artisan demonstration, hands-on crafting, and final piece finishing'
  const takeAwayText =
    event.takeAway ||
    'Handcrafted heirloom keepsake created with your own hands during the workshop session'

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden border transition-all duration-500 ${
        showDetailedSections
          ? 'min-h-[580px]'
          : 'min-h-[460px] md:min-h-[480px]'
      } shadow-sm ${
        isPast
          ? 'border-[#3D332E]/60 bg-[#1A1513] opacity-85 hover:opacity-100 hover:border-[#6E635B]'
          : 'border-[#3D332E]/30 bg-[#1C1613] hover:border-[#4F5B2A] hover:shadow-xl hover:-translate-y-1'
      }`}
      data-motion-card
      data-motion-item
    >
      {/* Background Image with Ambient Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priorityImage}
          className={`object-cover transition-transform duration-700 ease-out ${
            isPast
              ? 'grayscale-[55%] contrast-[0.9] opacity-60 group-hover:scale-102'
              : 'group-hover:scale-108'
          }`}
        />
        {/* Editorial Atmospheric Dark Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isPast
              ? 'bg-gradient-to-t from-[#14100E] via-[#14100E]/90 via-55% to-[#14100E]/50'
              : 'bg-gradient-to-t from-[#14100E] via-[#14100E]/85 via-50% to-black/35 group-hover:from-[#14100E]/98 group-hover:via-[#14100E]/90'
          }`}
        />
      </div>

      {/* Top Header Row: Calendar Tear-Sheet Badge + Info Button */}
      <div className="relative z-10 p-5 flex items-start justify-between gap-3 pointer-events-auto">
        {/* Tear-Sheet Date Badge */}
        {dateBadge ? (
          <div
            className={`flex flex-col items-center overflow-hidden shadow-md border backdrop-blur-sm transition-transform duration-300 group-hover:scale-102 ${
              isPast
                ? 'border-[#4D423C] bg-[#2B231F]/90 text-[#968A80]'
                : 'border-[#E8E1D5]/40 bg-[#FBF9F4] text-[#2B231F]'
            }`}
          >
            {/* Top Tier: Weekday */}
            <div
              className={`w-full text-center px-3 py-1 text-[11px] font-semibold tracking-wider uppercase border-b ${
                isPast
                  ? 'bg-[#3D332E] text-[#C2B7A8] border-[#4D423C]'
                  : 'bg-[#FBF9F4] text-[#2B231F] border-[#E8E1D5]'
              }`}
            >
              {dateBadge.weekday}
            </div>
            {/* Bottom Tier: Day Number & Month */}
            <div
              className={`flex flex-col items-center px-3 py-1.5 min-w-[54px] ${
                isPast ? 'bg-[#211B17] text-[#968A80]' : 'bg-[#1E262C] text-[#FBF9F4]'
              }`}
            >
              <span className="font-sans text-xl font-bold leading-none tracking-tight">
                {dateBadge.day}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-medium opacity-90 mt-0.5">
                {dateBadge.month}
              </span>
            </div>
          </div>
        ) : (
          <div className="px-3 py-1.5 bg-[#2B231F]/80 text-[#D8CEBE] text-xs uppercase tracking-widest border border-white/10">
            Upcoming
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* In Person / Online Tag */}
          <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] border backdrop-blur-md shadow-sm ${
            event.format === 'online'
              ? 'bg-[#1E262C]/90 text-[#FBF9F4] border-white/20'
              : 'bg-[#FBF9F4] text-[#2B231F] border-[#E8E1D5]'
          }`}>
            {event.format === 'online' ? 'Online' : 'In Person'}
          </span>

          {/* Availability Badge */}
          {isPast ? (
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/10 text-[#C2B7A8] border border-white/15 backdrop-blur-md">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-[#4F5B2A]/90 text-[#FBF9F4] border border-[#A6B78F]/40 backdrop-blur-md shadow-sm">
              {formatAvailabilityLabel(event.availability)}
            </span>
          )}

          {/* Info Button (i) */}
          <button
            type="button"
            onClick={() => setShowInfo((prev) => !prev)}
            aria-expanded={showInfo}
            aria-label={showInfo ? 'Close event details' : `View details for ${eventTitle}`}
            className={`w-8 h-8 flex items-center justify-center backdrop-blur-md border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5B2A] ${
              showInfo
                ? 'bg-[#FBF9F4] text-[#2B231F] border-white shadow-lg scale-105'
                : 'bg-black/40 border-white/25 text-white/90 hover:bg-black/60 hover:border-white/40 hover:text-white'
            }`}
          >
            {showInfo ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Info Overlay Drawer (Revealed when (i) is clicked) */}
      {showInfo && (
        <div className="absolute inset-0 z-20 bg-[#161210]/95 backdrop-blur-md p-6 flex flex-col justify-between text-[#FBF9F4] animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b border-[#3D332E] pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A6B78F]">
                Session Overview
              </span>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="text-xs uppercase tracking-wider text-[#D8CEBE] hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <h4 className="font-display text-xl text-[#FBF9F4] leading-snug">
              {eventTitle}
            </h4>

            <p className="text-xs text-[#D8CEBE] font-light leading-relaxed">
              {descriptionText}
            </p>

            <dl className="space-y-2 text-xs text-[#D8CEBE] border-t border-[#3D332E] pt-3">
              <div className="flex justify-between gap-3">
                <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Format</dt>
                <dd className="font-medium text-right text-[#FBF9F4]">{event.format === 'online' ? 'Online' : 'In Person'}</dd>
              </div>
              {event.feelsLike && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Feels Like</dt>
                  <dd className="font-light italic text-right text-[#FBF9F4]">{event.feelsLike}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Date</dt>
                <dd className="font-medium text-right text-[#FBF9F4]">{formattedDate}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Time</dt>
                <dd className="font-medium text-right text-[#FBF9F4]">{eventTime}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Location</dt>
                <dd className="font-medium text-right text-[#FBF9F4]">
                  {event.googleMapsUrl ? (
                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C89B53] hover:underline transition-colors inline-flex items-center gap-1 justify-end"
                      title="Open in Google Maps"
                    >
                      <span>{locationText}</span>
                      <svg className="w-2.5 h-2.5 text-[#C89B53]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    locationText
                  )}
                </dd>
              </div>
              {event.facilitator && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[#968A80] uppercase tracking-wider text-[10px]">Host</dt>
                  <dd className="font-medium text-right text-[#FBF9F4]">{event.facilitator}</dd>
                </div>
              )}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#3D332E]/60 text-left">
                <dt className="text-[#A6B78F] uppercase tracking-wider text-[10px] font-semibold">Key Process</dt>
                <dd className="text-xs text-[#D8CEBE] font-light leading-relaxed">{keyProcessText}</dd>
              </div>
              <div className="flex flex-col gap-1 pt-1 border-t border-[#3D332E]/60 text-left">
                <dt className="text-[#A6B78F] uppercase tracking-wider text-[10px] font-semibold">Take Away / Keep Sake</dt>
                <dd className="text-xs text-[#D8CEBE] font-light leading-relaxed">{takeAwayText}</dd>
              </div>
              {event.price != null && (
                <div className="flex justify-between gap-3 pt-1 border-t border-[#3D332E]/60">
                  <dt className="text-[#A6B78F] uppercase tracking-wider text-[10px] font-semibold">Price</dt>
                  <dd className="font-semibold text-right text-[#FBF9F4]">{formatPrice(event.price)}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="pt-4 border-t border-[#3D332E] flex items-center justify-between gap-3">
            <Link
              href={`/weekly-events/${event.slug}`}
              className="text-xs text-[#D8CEBE] underline underline-offset-4 hover:text-white"
            >
              Full Details →
            </Link>
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#4F5B2A] text-white hover:bg-[#3D4721] transition-colors"
            >
              {isPast ? 'Enquire' : 'Book'}
            </Link>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Bottom Content Area: ALL 7 MANDATORY DETAILS DISPLAYED   */}
      {/* 1. Event, 2. Date, 3. Time, 4. Location,                 */}
      {/* 5. Description, 6. Key Process, 7. Take Away / Keep Sake */}
      {/* ======================================================== */}
      <div className="relative z-10 p-5 md:p-6 flex flex-col justify-end space-y-3.5 bg-gradient-to-t from-[#14100E] via-[#14100E]/95 to-transparent">
        {/* 1. EVENT (TITLE) */}
        <h3 className="font-display text-xl sm:text-2xl text-[#FBF9F4] leading-[1.25] tracking-normal group-hover:text-white transition-colors line-clamp-2">
          <Link href={`/weekly-events/${event.slug}`} className="focus:outline-none hover:underline">
            {eventTitle}
          </Link>
        </h3>

        {/* FEELS LIKE LINE */}
        {event.feelsLike && (
          <p className="text-xs text-[#E8D9C8] font-sans">
            <span className="text-[#A6B78F] font-medium">Feels like: </span>
            <span className="italic font-light">{event.feelsLike}</span>
          </p>
        )}

        {/* 2. DATE & 3. TIME */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#E8D9C8]">
          {/* Date */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#C89B53] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium text-[#FBF9F4]">{formattedDate}</span>
          </div>

          <span className="text-white/30 select-none">·</span>

          {/* Time */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#A6B78F] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-[#D8CEBE] font-normal">{eventTime}</span>
          </div>
        </div>

        {/* 4. LOCATION */}
        <div className="flex items-center gap-1.5 text-xs text-[#E8D9C8]">
          <svg
            className="w-3.5 h-3.5 text-[#C89B53] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {event.googleMapsUrl ? (
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-[#FBF9F4] truncate hover:text-[#C89B53] hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-[#C89B53]"
              title="Open venue in Google Maps"
            >
              <span>{locationText}</span>
              <svg className="w-3 h-3 text-[#C89B53] shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <span className="font-medium text-[#FBF9F4] truncate">{locationText}</span>
          )}
        </div>

        {/* 5. DESCRIPTION, 6. KEY PROCESS, 7. TAKE AWAY / KEEP SAKE (Optional full details) */}
        {showDetailedSections && (
          <>
            {/* 5. DESCRIPTION */}
            <div className="space-y-0.5 border-t border-white/10 pt-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#A6B78F] font-semibold block">
                Description
              </span>
              <p className="text-xs text-[#D8CEBE] font-light leading-relaxed line-clamp-2">
                {descriptionText}
              </p>
            </div>

            {/* 6. KEY PROCESS */}
            <div className="space-y-0.5 border-t border-white/10 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#A6B78F] font-semibold block">
                Key Process
              </span>
              <p className="text-xs text-[#D8CEBE] font-light leading-relaxed line-clamp-2">
                {keyProcessText}
              </p>
            </div>

            {/* 7. TAKE AWAY / KEEP SAKE */}
            <div className="space-y-0.5 border-t border-white/10 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#A6B78F] font-semibold block">
                Take Away / Keep Sake
              </span>
              <p className="text-xs text-[#D8CEBE] font-light leading-relaxed line-clamp-2">
                {takeAwayText}
              </p>
            </div>
          </>
        )}

        {/* FULL DETAILS → CTA & PRICE (REPLACES "INVESTMENT") */}
        <div className="flex items-center justify-between text-xs pt-3 border-t border-white/10">
          <Link
            href={`/weekly-events/${event.slug}`}
            className="text-xs text-[#D8CEBE] underline underline-offset-4 hover:text-white"
          >
            Full Details →
          </Link>
          {event.price != null && (
            <span className="font-medium text-[#FBF9F4] text-xs">
              {formatPrice(event.price)}
            </span>
          )}
        </div>

        {/* Bottom Booking / Enquiry Button */}
        <div>
          {isPast ? (
            <Link
              href={actionHref}
              className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#E8D9C8] backdrop-blur-sm transition-all duration-300 hover:bg-[#FBF9F4] hover:text-[#2B231F] hover:border-white shadow-sm"
            >
              <span>Enquire Next Date</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          ) : (
            <Link
              href={actionHref}
              className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#FBF9F4] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2B231F] transition-all duration-300 hover:bg-[#4F5B2A] hover:text-white shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Register Now</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
