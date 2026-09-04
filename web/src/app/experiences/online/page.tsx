import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Online Artisan Workshops & Global Masterclasses | Kiiro',
  description: 'Connect live with master artisans in rural studios across India with curated material kits delivered worldwide.',
}

export default function OnlineExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Global Virtual Access
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Live Studio Masterclasses From Anywhere in the World
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              High-definition live virtual sessions connecting global craft enthusiasts directly with village artisan studios, complete with delivered material kits.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Delivered Material Kit</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Receive organic rice paste, bamboo nibs, natural ochre dyes, and handmade cotton canvas directly at your home prior to session start.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Live Dual-Camera Studio</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Clear overhead cameras broadcast the artisan’s hand techniques and stroke movements with real-time multilingual facilitation.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Distributed Global Teams</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Ideal for multinational corporate teams seeking meaningful remote cultural connection across timezones.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Inquire About Online Masterclasses</h3>
              <p className="text-sm text-[#6E635B]">Let us know your country, time zone, and preferred artform interest.</p>
            </div>
            <EnquiryForm defaultCategory="Individual Workshop" defaultSubject="Online Workshop Request" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
