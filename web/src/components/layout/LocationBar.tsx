import Link from 'next/link'
import { ACTIVE_CITIES } from '@/content/presence'

export function LocationBar() {
  return (
    <div className="border-b border-[#E8E1D5] bg-[#F3EFE6] text-[#2B231F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2 flex flex-wrap items-center justify-end gap-x-2 gap-y-1.5 sm:gap-x-3">
        <span className="shrink-0 font-sans text-[11px] md:text-[12px] text-[#6E635B] font-medium tracking-[0.06em] uppercase">
          Present in
        </span>
        <ul className="flex flex-wrap items-center justify-end gap-x-0 gap-y-1 text-[12px] md:text-[13px] font-sans text-[#2B231F]">
          {ACTIVE_CITIES.map((city, index) => (
            <li key={city} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 sm:mx-2.5 text-[#4F5B2A] opacity-75 select-none" aria-hidden>
                  ·
                </span>
              )}
              <Link
                href={`/experiences?city=${encodeURIComponent(city)}`}
                className="hover:text-[#4F5B2A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] font-medium"
                title={`View all experiences listed in ${city}`}
              >
                {city}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
