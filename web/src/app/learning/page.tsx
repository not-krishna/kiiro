import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { LEARNING_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Craft Learning Paths & Masterclasses | Kiiro',
  description: 'Structured progression from beginner craft appreciation to advanced master artisan accreditation.',
}

export const revalidate = 30

export default async function LearningPage() {
  const pageData = await client.fetch(LEARNING_PAGE_QUERY).catch(() => null)

  const heroHeading = pageData?.heroHeading || 'Learning Pathways in Living Heritage'
  const heroSubheading =
    pageData?.heroSubheading ||
    'Master living traditional techniques through structured levels—from introductory weekend immersions to multi-month studio apprenticeships.'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Template H: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Structured Craft Progression
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* Learning Tiers */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C2593F]">Level 01</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Beginner Appreciation</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Single-session weekend immersions. Learn elemental line grammar, pigment mixing, and cultural history. No prior artistic experience required.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D99B26]">Level 02</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Intermediate Practice</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                4-week module focusing on complex storytelling composition, natural mordant bath preparation, and multi-color underglaze painting.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2B231F]">Level 03</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Advanced Masterclass</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Studio residency under direct mentorship of master artisans with formal certification upon completion.
              </p>
            </div>
          </div>

          <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#2B231F]">Kiiro Craft Certificates</h3>
              <p className="text-xs text-[#6E635B] font-light">
                Verify artisan-attested certificates issued for completed Level 02 & Level 03 learning modules.
              </p>
            </div>
            <Link
              href="/learning/certificates"
              className="bg-[#2B231F] hover:bg-[#C2593F] text-white px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-colors whitespace-nowrap"
            >
              Verify Certificate →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
