import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Craft Certificate Verification | Kiiro Learning',
  description: 'Verify official Kiiro craft proficiency certificates signed by master lineage custodians.',
}

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Accreditation & Provenance
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight">
              Certificate Verification Portal
            </h1>
            <p className="text-sm text-[#968A80] leading-relaxed font-light">
              Enter your unique certificate ID to verify authenticity, master artisan endorsement, and completed module credentials.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-xl mx-auto space-y-8">
          <div className="bg-white border border-[#E8E1D5] p-8 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-semibold mb-2">
                Certificate Identification Number
              </label>
              <input
                type="text"
                placeholder="e.g. KIIRO-WRL-2026-889"
                className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
              />
            </div>

            <button className="w-full bg-[#C2593F] hover:bg-[#A84A33] text-white py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              Verify Credential →
            </button>
          </div>

          <div className="text-center text-xs text-[#968A80] font-light">
            Need help retrieving your certificate? <Link href="/enquire" className="text-[#C2593F] underline">Contact Learning Support</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
