import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'
import { client } from '@/sanity/lib/client'
import { PARTNERSHIPS_CSR_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Strategic CSR & Artisan Partnerships | Kiiro Ecosystem',
  description: 'Empowering artisan clusters, preserving endangered heritage crafts, and driving measured social impact.',
}

export const revalidate = 30

export default async function PartnershipsCsrPage() {
  const pageData = await client.fetch(PARTNERSHIPS_CSR_PAGE_QUERY).catch(() => null)

  const heroHeading = pageData?.heroHeading || 'Preserving Heritage Through Sustained Livelihoods'
  const heroSubheading =
    pageData?.heroSubheading ||
    'We partner with forward-thinking corporations, grant foundations, and institutions to invest directly in artisan cluster capacity building, youth apprentice programs, and craft dignity.'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Template F: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Strategic CSR & Ecosystem Impact
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2B231F]">CSR Partnership Pathways</h2>
            <p className="text-sm text-[#6E635B] font-light">
              Moving beyond one-time donations toward sustainable self-reliance for traditional craft families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#C2593F] font-semibold">Pillar 01</span>
                <h3 className="font-serif text-2xl text-[#2B231F]">Capacity Building & Training</h3>
                <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                  Direct funding for village workspace infrastructure, natural dye boiling cauldrons, tool upgrades, and digital literacy for younger artisans.
                </p>
              </div>
              <Link
                href="/partnerships-csr/capacity-building"
                className="text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold hover:underline block pt-4 border-t border-[#E8E1D5]"
              >
                Explore Capacity Building →
              </Link>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#D99B26] font-semibold">Pillar 02</span>
                <h3 className="font-serif text-2xl text-[#2B231F]">Authentic Craft Gifting</h3>
                <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                  Replace mass-manufactured plastic corporate swag with handcrafted, teak-framed, or textile heritage pieces carrying direct artisan attribution.
                </p>
              </div>
              <Link
                href="/partnerships-csr/gifting"
                className="text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold hover:underline block pt-4 border-t border-[#E8E1D5]"
              >
                Explore Craft Gifting →
              </Link>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#2B231F] font-semibold">Pillar 03</span>
                <h3 className="font-serif text-2xl text-[#2B231F]">Needs Ideation Co-Lab</h3>
                <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                  Co-design custom social impact initiatives aligned with your company&apos;s ESG goals, regional presence, and cultural values.
                </p>
              </div>
              <Link
                href="/partnerships-csr/needs-ideation"
                className="text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold hover:underline block pt-4 border-t border-[#E8E1D5]"
              >
                Needs Ideation Lab →
              </Link>
            </div>
          </div>
        </section>

        {/* CSR Form */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Initiate a CSR & Partnership Conversation</h3>
              <p className="text-sm text-[#6E635B]">Connect with our social impact team to explore cluster sponsorship.</p>
            </div>
            <EnquiryForm defaultCategory="CSR & Partnerships" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
