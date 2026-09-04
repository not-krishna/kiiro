import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'About Kiiro | Living Cultural Platform & Manifesto',
  description: 'Learn about Kiiro’s mission to connect living craft traditions, master artisans, knowledge, and contemporary experiences.',
}

export const revalidate = 30

export default async function AboutPage() {
  const pageData = await client.fetch(ABOUT_PAGE_QUERY).catch(() => null)

  const heroHeading = pageData?.heroHeading || 'Hands On. Rooted. Real.'
  const heroSubheading =
    pageData?.heroSubheading ||
    'Kiiro is a credible cultural platform that makes living craft traditions, artisans, experiences, learning, community, and impact feel contemporary without flattening their identity.'
  const visionTitle = pageData?.visionTitle || 'Our Core Purpose'
  const visionText =
    pageData?.visionText ||
    'We do not treat Indian heritage as a museum relic or a decorative pattern. Craft is living knowledge—carried by human hands, sustained by earth, and passed down through generational practice.'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Manifesto & Identity
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* Manifesto Content */}
        <section className="py-20 px-6 md:px-10 max-w-4xl mx-auto space-y-12">
          <div className="border-l-4 border-[#C2593F] pl-6 py-2 space-y-4">
            <h2 className="font-serif text-3xl text-[#2B231F]">{visionTitle}</h2>
            <p className="text-lg text-[#4A4036] font-light leading-relaxed">
              {visionText}
            </p>
          </div>

          {/* Living Ecosystem Model */}
          <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-8 space-y-6">
            <h3 className="font-serif text-2xl text-[#2B231F]">The Living Ecosystem Model</h3>
            <p className="text-sm text-[#6E635B] leading-relaxed font-light">
              Every interaction on Kiiro connects seven core pillars:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-serif text-sm text-[#2B231F]">
              <div className="bg-white p-4 border border-[#E8E1D5]">Living Culture</div>
              <div className="bg-white p-4 border border-[#E8E1D5]">Artisan</div>
              <div className="bg-white p-4 border border-[#E8E1D5]">Knowledge</div>
              <div className="bg-white p-4 border border-[#E8E1D5]">Experience</div>
              <div className="bg-white p-4 border border-[#E8E1D5]">Participant</div>
              <div className="bg-white p-4 border border-[#E8E1D5]">Community</div>
              <div className="bg-white p-4 border border-[#E8E1D5] col-span-2">Social Impact</div>
            </div>
          </div>

          {/* Non-Negotiable Standards */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#2B231F]">What We Stand For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E8E1D5] p-6 space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C2593F] font-semibold">01. Authenticity</span>
                <p className="text-xs text-[#6E635B] leading-relaxed">
                  Real master artisans with documented lineage and respectful attribution—no invented stories.
                </p>
              </div>

              <div className="bg-white border border-[#E8E1D5] p-6 space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#D99B26] font-semibold">02. Material Integrity</span>
                <p className="text-xs text-[#6E635B] leading-relaxed">
                  Natural pigments, organic dyes, quartz, and raw earth—no synthetic approximations.
                </p>
              </div>

              <div className="bg-white border border-[#E8E1D5] p-6 space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#2B231F] font-semibold">03. Tactile Focus</span>
                <p className="text-xs text-[#6E635B] leading-relaxed">
                  Immersive hands-on creation that re-establishes physical intimacy in an overly digital world.
                </p>
              </div>

              <div className="bg-white border border-[#E8E1D5] p-6 space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C2593F] font-semibold">04. Fair Dignity</span>
                <p className="text-xs text-[#6E635B] leading-relaxed">
                  Direct revenue sharing that honors artisan expertise and supports cluster economic independence.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E8E1D5] text-center">
            <Link
              href="/enquire"
              className="inline-block bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Get In Touch With Kiiro →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
