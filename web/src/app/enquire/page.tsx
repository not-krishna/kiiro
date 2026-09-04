import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Enquire & Connect | Kiiro Platform',
  description: 'Submit an enquiry for individual workshops, corporate engagements, educational programs, CSR partnerships, or craft gifting.',
}

export default async function EnquirePage({ searchParams }: { searchParams: Promise<{ category?: string; subject?: string }> }) {
  const params = await searchParams
  const defaultCategory = params.category || 'Individual Workshop'
  const defaultSubject = params.subject || ''

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C2593F] font-semibold">
              Primary Navigation CTA
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              Start a Conversation With Kiiro
            </h1>
            <p className="text-sm md:text-base text-[#968A80] leading-relaxed font-light">
              Whether you are an individual wanting to attend a workshop, a HR leader planning a retreat, or an institution exploring CSR, we respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Interactive Form Section */}
        <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
          <EnquiryForm defaultCategory={defaultCategory} defaultSubject={defaultSubject} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
