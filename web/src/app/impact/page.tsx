import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { IMPACT_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Artisan Livelihood & Craft Impact | Kiiro Ecosystem',
  description: 'Quantified social impact, artisan revenue generation, and craft preservation metrics across India.',
}

export const revalidate = 30

export default async function ImpactPage() {
  const pageData = await client.fetch(IMPACT_PAGE_QUERY).catch(() => null)

  const heroHeading = pageData?.heroHeading || 'Measuring Craft Dignity & Economic Independence'
  const heroSubheading =
    pageData?.heroSubheading ||
    'We track real outcomes: direct revenue distribution to artisan families, sustained youth apprenticeships, and regional craft retention.'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Ecosystem Metrics & Social Value
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* Key Metrics Grid */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-2 shadow-xs">
              <span className="font-serif text-4xl md:text-5xl text-[#C2593F] font-normal">85%+</span>
              <p className="text-xs text-[#6E635B] uppercase tracking-wider font-medium">Direct Livelihood Share</p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-2 shadow-xs">
              <span className="font-serif text-4xl md:text-5xl text-[#D99B26] font-normal">420+</span>
              <p className="text-xs text-[#6E635B] uppercase tracking-wider font-medium">Master Artisans & Lineages</p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-2 shadow-xs">
              <span className="font-serif text-4xl md:text-5xl text-[#2B231F] font-normal">14</span>
              <p className="text-xs text-[#6E635B] uppercase tracking-wider font-medium">Endangered Craft Clusters</p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-2 shadow-xs">
              <span className="font-serif text-4xl md:text-5xl text-[#C2593F] font-normal">12,500+</span>
              <p className="text-xs text-[#6E635B] uppercase tracking-wider font-medium">Workshop Participants</p>
            </div>
          </div>

          {/* Impact Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white border border-[#E8E1D5] overflow-hidden group shadow-xs">
              <div className="relative h-64 w-full overflow-hidden bg-[#EAE3D5]">
                <Image
                  src="https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop"
                  alt="Transparent Financial Livelihood"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white font-serif text-xl">
                  Fair Dignity & Livelihood Share
                </div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="font-serif text-2xl text-[#2B231F]">Transparent Financial Model</h3>
                <p className="text-sm text-[#4A4036] font-light leading-relaxed">
                  For every public masterclass or institutional program, the major share of booking revenue goes directly to the facilitating artisan family and their cluster material fund.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E8E1D5] overflow-hidden group shadow-xs">
              <div className="relative h-64 w-full overflow-hidden bg-[#EAE3D5]">
                <Image
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop"
                  alt="Youth Apprenticeships"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white font-serif text-xl">
                  Generational Youth Apprenticeships
                </div>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="font-serif text-2xl text-[#2B231F]">Intergenerational Transmission</h3>
                <p className="text-sm text-[#4A4036] font-light leading-relaxed">
                  By providing reliable economic returns and prestigious urban teaching platforms, young family members are encouraged to choose traditional craft as a viable, respected career.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5] text-center space-y-6">
          <h3 className="font-serif text-3xl text-[#2B231F]">Partner With Kiiro for Measured Impact</h3>
          <Link
            href="/partnerships-csr"
            className="inline-block bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            Explore Corporate CSR Partnerships →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
