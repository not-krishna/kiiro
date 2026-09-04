import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Hospitality & Luxury Resort Experiences | Kiiro',
  description: 'Curated guest cultural experiences and artisan pop-ups for boutique resorts and luxury hotels.',
}

export default function HospitalityLuxuryPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Boutique Hospitality & Luxury Partners
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Bespoke Cultural Experiences for Hotel Guests
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Transforming guest itineraries with intimate, private artisan masterclasses, tea circles, and regional craft storytelling.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Resident Artisan Salons</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Host a master artisan at your resort property for private morning sessions, sunset craft circles, and live demonstration studios for discerning guests.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Curated Heritage Keepsakes</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Provide guests with authentic, hand-painted welcoming gifts crafted by master artisans with lineage documentation and provenance cards.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Partner With Kiiro Hospitality</h3>
              <p className="text-sm text-[#6E635B]">Inquire about seasonal artisan residencies and resort pop-ups.</p>
            </div>
            <EnquiryForm defaultCategory="Corporate & Team" defaultSubject="Hospitality Partnership Enquiry" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
