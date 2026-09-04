import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Custom Needs Ideation & Partnership Co-Lab | Kiiro',
  description: 'Co-design custom cultural initiatives, CSR programs, and heritage research projects.',
}

export default function NeedsIdeationPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Co-Creation Lab
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Bespoke Cultural Program Ideation
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Have a unique vision for a regional craft project, museum collaboration, or CSR initiative? Our cultural team works with you from concept to field implementation.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">01. Context Mapping</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                We map your institution’s mission and geographic focus to relevant artisan clusters, ensuring authentic alignment without superficial tropes.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">02. Field Architecture</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Co-designing program budgets, artisan stipends, logistics, and measurable social impact milestones.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">03. Execution & Reporting</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                On-ground management by Kiiro facilitators with transparent documentation, photo/video archives, and impact reporting.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Initiate an Ideation Session</h3>
              <p className="text-sm text-[#6E635B]">Share your goals, initial thoughts, and expected project timeframe.</p>
            </div>
            <EnquiryForm defaultCategory="CSR & Partnerships" defaultSubject="Custom Ideation Lab Request" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
