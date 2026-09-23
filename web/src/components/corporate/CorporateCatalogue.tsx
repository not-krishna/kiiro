'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CorporatePlanningForm } from '@/components/ui/forms/CorporatePlanningForm'
import {
  CORPORATE_WORKSHOPS,
  formatTierLabel,
  priceRangeLabel,
  WORKSHOP_CATEGORIES,
} from '@/content/workshops'
import type { Workshop } from '@/content/types'

function isCategory(value: string | null): value is string {
  return Boolean(value && value !== 'all')
}

export function CorporateCatalogue({
  audienceLabel = 'Corporate & hospitality',
}: {
  audienceLabel?: string
}) {
  const searchParams = useSearchParams()
  const initial = searchParams.get('category')
  const [category, setCategory] = useState<string>(
    isCategory(initial) ? initial : 'all'
  )
  const [selected, setSelected] = useState<Workshop | null>(null)
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    return CORPORATE_WORKSHOPS.filter((workshop) => {
      const matchesCategory = category === 'all' || workshop.category === category
      const haystack = `${workshop.name} ${workshop.definition || ''} ${workshop.origin || ''}`.toLowerCase()
      const matchesQuery = !query || haystack.includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end justify-between" data-motion-reveal data-motion-distance="18">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Workshop category">
          {WORKSHOP_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold border ${
                category === item.id
                  ? 'bg-[#2B231F] text-white border-[#2B231F]'
                  : 'border-[#E8E1D5] text-[#6E635B]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="block lg:w-72">
          <span className="sr-only">Search workshops</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or origin"
            className="w-full bg-white border border-[#E8E1D5] px-4 py-3 text-sm focus:outline-none focus:border-[#4F5B2A]"
          />
        </label>
      </div>

      <p className="text-xs uppercase tracking-[0.16em] text-[#968A80]" data-motion-reveal data-motion-distance="14">
        {list.length} workshops · prices per person by batch size
      </p>

      <div className="overflow-x-auto border border-[#E8E1D5]" data-motion-reveal data-motion-distance="18">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F3EFE6] text-[10px] uppercase tracking-[0.14em] text-[#968A80]">
            <tr>
              <th className="px-4 py-3 font-semibold">Workshop</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Pricing</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {list.map((workshop) => (
              <tr key={workshop.slug} className="border-t border-[#E8E1D5] align-top hover:bg-[#F3EFE6]/55 transition-colors" data-motion-card>
                <td className="px-4 py-4">
                  <p className="font-serif text-lg text-[#2B231F]">{workshop.name}</p>
                  {workshop.origin && <p className="text-xs text-[#968A80] mt-1">{workshop.origin}</p>}
                </td>
                <td className="px-4 py-4 capitalize text-[#6E635B]">{workshop.category}</td>
                <td className="px-4 py-4 text-[#6E635B]">
                  {workshop.durationDays === 2 ? '2 days' : '—'}
                </td>
                <td className="px-4 py-4 text-[#6E635B] whitespace-nowrap">
                  {priceRangeLabel(workshop) || 'On enquiry'}
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setSelected(workshop)}
                    className="kiiro-cta text-xs uppercase tracking-[0.14em] font-semibold text-[#4F5B2A]"
                  >
                    <span>Compare</span>
                    <span aria-hidden="true" data-cta-arrow>&rarr;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="grid lg:grid-cols-12 gap-8 border border-[#E8E1D5] bg-[#FBF9F4] p-6 md:p-10" data-motion-stagger>
          <div className="lg:col-span-7 space-y-5" data-motion-item>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4F5B2A]">{selected.category}</p>
            <h2 className="font-serif text-3xl">{selected.name}</h2>
            {selected.durationDays === 2 && (
              <p className="text-sm font-semibold text-[#2B231F]">This is a 2-day workshop.</p>
            )}
            {selected.definition && <p className="text-sm text-[#6E635B] leading-relaxed">{selected.definition}</p>}
            {selected.origin && (
              <p className="text-sm">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#968A80] block">Origin</span>
                {selected.origin}
              </p>
            )}
            {selected.process && (
              <p className="text-sm whitespace-pre-line">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#968A80] block">Process</span>
                {selected.process}
              </p>
            )}
            {selected.outcome && (
              <p className="text-sm whitespace-pre-line">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#968A80] block">Outcome</span>
                {selected.outcome}
              </p>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#968A80] mb-2">Batch pricing (INR / person)</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {selected.pricing.map((tier) => (
                  <li key={formatTierLabel(tier)} className="border border-[#E8E1D5] px-4 py-3 text-sm">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[#968A80]">
                      {formatTierLabel(tier)}
                    </span>
                    {tier.pricePerPerson == null ? 'Not listed' : `₹${tier.pricePerPerson.toLocaleString('en-IN')}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5" data-motion-item>
            <h3 className="font-serif text-2xl mb-4">Enquire for {audienceLabel.toLowerCase()}</h3>
            <CorporatePlanningForm workshopSlug={selected.slug} workshopName={selected.name} />
          </div>
        </div>
      )}
    </div>
  )
}
