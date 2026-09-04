import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { COMMUNITY_PAGE_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Community Ecosystem | Kiiro',
  description: 'Connecting practitioners, cultural enthusiasts, and master artisans through recurring circles.',
}

export const revalidate = 30

export default async function CommunityPage() {
  const pageData = await client.fetch(COMMUNITY_PAGE_QUERY).catch(() => null)

  const heroHeading = pageData?.heroHeading || 'A Gathering Space for Cultural Enthusiasts'
  const heroSubheading =
    pageData?.heroSubheading ||
    'Building long-term relationships between craft practitioners, urban participants, and indigenous master artists.'

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Community Hub
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C2593F]">Community Initiative</span>
                <h2 className="font-serif text-3xl text-[#2B231F]">Creative Wellness Circle</h2>
                <p className="text-sm text-[#6E635B] leading-relaxed font-light">
                  A monthly membership and gathering circle designed around mindful participation, grounding, tactile clay work, and shared reflection.
                </p>
              </div>
              <Link
                href="/community/creative-wellness-circle"
                className="text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold hover:underline block pt-4 border-t border-[#E8E1D5]"
              >
                Explore Creative Wellness Circle →
              </Link>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D99B26]">Public Gatherings</span>
                <h2 className="font-serif text-3xl text-[#2B231F]">Weekly Events & Masterclasses</h2>
                <p className="text-sm text-[#6E635B] leading-relaxed font-light">
                  Hands-on weekend workshops hosted in Mumbai, Jaipur, Bengaluru, Delhi NCR, and Pune led directly by master artisans.
                </p>
              </div>
              <Link
                href="/weekly-events"
                className="text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold hover:underline block pt-4 border-t border-[#E8E1D5]"
              >
                View Event Schedule →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
