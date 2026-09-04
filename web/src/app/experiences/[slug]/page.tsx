import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { EXPERIENCE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_EXPERIENCES, FALLBACK_ARTISANS, FALLBACK_EVENTS } from '@/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exp = FALLBACK_EXPERIENCES.find((e) => e.slug === slug)
  return {
    title: `${exp ? exp.title : 'Craft Experience'} | Kiiro Learning`,
    description: exp?.shortDescription || 'Immersive artisan-led craft experience and hands-on masterclass.',
  }
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let exp: any = null

  try {
    exp = await client.fetch(EXPERIENCE_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching experience from Sanity:', error)
  }

  if (!exp) {
    exp = FALLBACK_EXPERIENCES.find((e) => e.slug === slug)
  }

  if (!exp) {
    notFound()
  }

  const artisans = exp.artisans?.length
    ? exp.artisans
    : FALLBACK_ARTISANS.slice(0, 1)

  const upcomingEvents = FALLBACK_EVENTS.filter((e) => e.experienceReference?.slug === slug || true).slice(0, 2)

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/experiences" className="hover:underline">Experiences</Link>
              <span>/</span>
              <span>{exp.experienceType || 'Workshop'}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {exp.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#968A80] uppercase tracking-wider pt-2">
              <div><span className="text-[#FBF9F4]">Duration:</span> {exp.duration}</div>
              <div><span className="text-[#FBF9F4]">Format:</span> {exp.format}</div>
            </div>
          </div>
        </section>

        {/* Section 2, 3, 4, 5: Details & Overview */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          <div className="border-l-2 border-[#C2593F] pl-6 py-2">
            <p className="text-xl md:text-2xl font-serif text-[#2B231F] leading-relaxed">
              {exp.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-[#2B231F] mb-4">What Participants Do & Experience</h3>
                <p className="text-base text-[#4A4036] font-light leading-relaxed">
                  Under the direct guidance of master practitioners, participants learn traditional material preparation, tool handling, motif composition, and cultural symbolism. Every participant works with authentic organic materials and leaves with their own completed piece.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#2B231F] mb-4">Learning & Mindful Outcomes</h3>
                <ul className="space-y-3 text-sm text-[#4A4036] font-light">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#C2593F] mt-0.5">✓</span>
                    <span>Deep understanding of regional history, lineage, and indigenous artform grammar.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#C2593F] mt-0.5">✓</span>
                    <span>Hands-on practice with natural pigments, organic dyes, bamboo tools, or quartz dough.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#C2593F] mt-0.5">✓</span>
                    <span>Sensory calibration, tactile focus, and grounding away from digital screens.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-6 space-y-6 h-fit">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                  Target Audience
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.audience?.map((aud: string, idx: number) => (
                    <span key={idx} className="text-xs bg-white text-[#2B231F] border border-[#E8E1D5] px-2.5 py-1">
                      {aud}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E8E1D5] pt-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                  Facilitated By
                </h4>
                {artisans.map((artisan: any) => (
                  <div key={artisan.name} className="text-xs text-[#6E635B]">
                    <span className="font-medium text-[#2B231F] block">{artisan.name}</span>
                    <span>{artisan.region}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8E1D5] pt-4">
                <Link
                  href={`/enquire?subject=${encodeURIComponent(exp.title)}`}
                  className="block w-full text-center bg-[#C2593F] hover:bg-[#A84A33] text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  Book / Enquire →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Public Dates */}
        {upcomingEvents.length > 0 && (
          <section className="bg-white border-t border-[#E8E1D5] py-16 px-6 md:px-10">
            <div className="max-w-5xl mx-auto space-y-8">
              <h3 className="font-serif text-3xl text-[#2B231F]">Upcoming Public Dates & Cities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((evt: any) => (
                  <div key={evt._id || evt.slug} className="bg-[#FBF9F4] border border-[#E8E1D5] p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#968A80] uppercase">
                      <span>{evt.city} • {evt.venue}</span>
                      <span className="text-[#C2593F] font-semibold">₹{evt.price}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[#2B231F]">{evt.title}</h4>
                    <p className="text-xs text-[#6E635B] font-light">
                      Date: {evt.date} at {evt.startTime}
                    </p>
                    <Link
                      href={`/weekly-events/${evt.slug}`}
                      className="inline-block text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold pt-2"
                    >
                      Reserve Spot →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
