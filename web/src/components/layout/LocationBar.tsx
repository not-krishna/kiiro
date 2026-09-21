import Link from 'next/link'
import { ACTIVE_CITIES } from '@/content/presence'

export function LocationBar() {
  return (
    <div className="border-b border-[#E8E1D5] bg-[#F3EFE6] text-[#2B231F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2.5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4">
        <p className="shrink-0 font-sans text-[13px] text-[#6E635B]">Present in</p>
        <ul className="flex flex-wrap items-center gap-x-0 gap-y-1 text-[13px] md:text-sm font-sans text-[#2B231F]">
          {ACTIVE_CITIES.map((city, index) => (
            <li key={city} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2.5 text-[#C2593F] select-none" aria-hidden>
                  ·
                </span>
              )}
              <Link
                href={`/experiences?city=${encodeURIComponent(city)}`}
                className="hover:text-[#C2593F] hover:underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
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
