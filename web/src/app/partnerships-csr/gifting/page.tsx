import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Craft-Led Corporate Gifting | Kiiro Ecosystem',
  description: 'Authentic handmade traditional art objects, bespoke teakwood frames, and textile hangings for corporate gifting.',
}

export default function CraftGiftingPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Authentic Heritage Gifting
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Gifts Carrying Personhood, Craft, and Provenance
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Elevate festive, client, and conference gifting with individual hand-painted works created by national award-winning master artisans.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Framed Master Works</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Reclaimed teakwood-framed Warli, Phad, or Kalamkari paintings accompanied by an artisan signature and storytelling card.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Custom Ceramic Sets</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Jaipur blue pottery coaster tiles and decorative platters with custom corporate logo integration on authentic gift boxes.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Direct Artisan Attribution</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                100% of gifting proceeds directly benefit artisan families with transparent price breakdowns and zero secret markups.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Request a Gifting Catalogue & Quote</h3>
              <p className="text-sm text-[#6E635B]">Share your required quantity, timeline, and custom packaging requirements.</p>
            </div>
            <EnquiryForm defaultCategory="CSR & Partnerships" defaultSubject="Corporate Craft Gifting Inquiry" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
