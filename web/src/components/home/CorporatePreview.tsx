import Link from 'next/link'
import { CtaLink } from '@/components/ui/CtaLink'
import { CORPORATE_WORKSHOPS, priceRangeLabel, WORKSHOP_CATEGORIES } from '@/content/workshops'

export function CorporatePreview() {
  const featured = CORPORATE_WORKSHOPS.filter((workshop) => workshop.definition).slice(0, 6)

  return (
    <section id="corporate" className="bg-[#FBF9F4] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="max-w-2xl space-y-3">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              Corporate & hospitality
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal">Browse, compare, then enquire</h2>
            <p className="text-sm text-[#6E635B] font-light leading-relaxed">
              Workshop names and batch pricing are taken from the Corporate & Hospitality catalogue. Pricing is per person, per workshop — not a single global rate.
            </p>
          </div>
          <CtaLink
            cta={{ label: 'Plan a Group Experience', href: '/experiences/corporates', kind: 'enquiry' }}
            variant="primary"
          />
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.14em] text-[#968A80]">
          {WORKSHOP_CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
            <Link key={item.id} href={`/experiences/corporates?category=${item.id}`} className="hover:text-[#C2593F]">
              {item.label}
            </Link>
          ))}
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E1D5] border border-[#E8E1D5]">
          {featured.map((workshop) => (
            <li key={workshop.slug} className="bg-[#FBF9F4] p-6 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#C2593F]">{workshop.category}</p>
              <h3 className="font-serif text-xl">{workshop.name}</h3>
              {workshop.durationDays === 2 && (
                <p className="text-xs text-[#2B231F] font-semibold">2-day workshop</p>
              )}
              <p className="text-sm text-[#6E635B] font-light line-clamp-3">{workshop.definition}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[#968A80]">
                {priceRangeLabel(workshop) || 'Pricing on enquiry'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
