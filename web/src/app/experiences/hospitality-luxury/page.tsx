import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CorporateCatalogue } from '@/components/corporate/CorporateCatalogue'

export const metadata = {
  title: 'Hospitality & Luxury | Kiiro',
  description: 'Signature cultural wellness programming for resorts and properties, using the same workshop catalogue as group experiences.',
}

export default function HospitalityLuxuryPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">Hospitality & luxury resorts</p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Guest programming with cultural depth
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              The same living-art catalogue, framed for properties that want more than a spa menu. Browse, compare, then enquire as hospitality.
            </p>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
          <Suspense fallback={<p className="text-sm text-[#6E635B]">Loading catalogue…</p>}>
            <CorporateCatalogue audienceLabel="Hospitality" defaultCategory="Hospitality & Luxury" />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
