import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CorporateCatalogue } from '@/components/corporate/CorporateCatalogue'
import { CorporatePlanningForm } from '@/components/ui/forms/CorporatePlanningForm'

export const metadata = {
  title: 'Create an Experience for Your Team | Kiiro',
  description: 'Planning a creative workshop or group experience? Tell us what you have in mind.',
}

export default function CorporateExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <h1 className="font-display text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Create an Experience for Your Team
            </h1>
            <p className="text-base text-[#D8CEBE] max-w-2xl leading-relaxed font-light">
              Planning a creative workshop or group experience? Tell us what you have in mind, and let&apos;s explore the
              possibilities. Listed workshops are examples of work we have run — they are not a guaranteed menu.
            </p>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
          <CorporatePlanningForm />
        </section>
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E8E1D5]">
          <h2 className="font-display text-3xl text-[#2B231F] mb-4">Ideas we already run</h2>
          <p className="text-sm text-[#6E635B] font-light max-w-2xl mb-10">
            Batch pricing below is for group planning conversations. Availability depends on artisans, dates, and place.
          </p>
          <Suspense fallback={<p className="text-sm text-[#6E635B]">Loading catalogue…</p>}>
            <CorporateCatalogue />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
