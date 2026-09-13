import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CorporateCatalogue } from '@/components/corporate/CorporateCatalogue'

export const metadata = {
  title: 'Plan a Group Experience | Kiiro',
  description:
    'Corporate and hospitality workshop catalogue with batch-based pricing. Browse, compare, then enquire.',
}

export default function CorporateExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Corporates & organisations
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Plan a Group Experience
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Filter the catalogue, compare origin, process, outcomes, duration, and per-person batch pricing, then enquire. This is not the individual ticket checkout.
            </p>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
          <Suspense fallback={<p className="text-sm text-[#6E635B]">Loading catalogue…</p>}>
            <CorporateCatalogue defaultCategory="Corporate & Team" />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
