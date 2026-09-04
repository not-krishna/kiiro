import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Artisan Capacity Building & Cluster Support | Kiiro',
  description: 'Infrastructure development, natural dye processing hubs, and apprentice training for indigenous craft communities.',
}

export default function CapacityBuildingPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Artisan Cluster Empowerment
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Sustained Infrastructure & Skill Transmission
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Investing in communal studio workspaces, raw material security, facilitator training, and next-generation youth apprenticeships.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Communal Studio Hubs</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Setting up weather-resistant workspaces in villages so artisans can paint, dry textiles, and host workshops year-round regardless of monsoon conditions.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Raw Material Security</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Creating collective procurement funds for unbleached cotton, organic myrobalan, natural indigo, and lead-free quartz powder.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Youth Apprenticeships</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Providing monthly stipends for young village apprentices so they can learn generational techniques from elders without economic pressure.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Sponsor a Cluster Initiative</h3>
              <p className="text-sm text-[#6E635B]">Explore targeted CSR sponsorship for artisan villages in Maharashtra, Gujarat, or Rajasthan.</p>
            </div>
            <EnquiryForm defaultCategory="CSR & Partnerships" defaultSubject="Capacity Building Sponsorship" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
