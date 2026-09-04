import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ARTFORM_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_ARTFORMS, FALLBACK_ARTISANS, FALLBACK_EXPERIENCES } from '@/lib/data'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artform = FALLBACK_ARTFORMS.find((a) => a.slug === slug)
  return {
    title: `${artform ? artform.title : 'Artform'} | Kiiro Living Craft`,
    description: artform?.shortDescription || 'Discover living traditional craft practices and cultural context.',
  }
}

export default async function ArtformDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let artform: any = null

  try {
    artform = await client.fetch(ARTFORM_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching artform from Sanity:', error)
  }

  if (!artform) {
    artform = FALLBACK_ARTFORMS.find((a) => a.slug === slug)
  }

  if (!artform) {
    notFound()
  }

  const artisans = artform.artisans?.length
    ? artform.artisans
    : FALLBACK_ARTISANS.filter((a) => a.craftReferences?.some((c) => c.slug === slug) || true).slice(0, 2)

  const relatedExperiences = artform.relatedExperiences?.length
    ? artform.relatedExperiences
    : FALLBACK_EXPERIENCES.filter((e) => e.artforms?.some((af) => af.slug === slug) || true).slice(0, 2)

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/artforms" className="hover:underline">Artforms</Link>
              <span>/</span>
              <span>{artform.category || 'Traditional'}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {artform.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#968A80] uppercase tracking-wider pt-2">
              <div><span className="text-[#FBF9F4]">Region:</span> {artform.region}</div>
              <div><span className="text-[#FBF9F4]">Category:</span> {artform.category || 'Traditional'}</div>
            </div>
          </div>
        </section>

        {/* Section 2 & 3: What It Is & Origin */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          <div className="border-l-2 border-[#C2593F] pl-6 py-2">
            <p className="text-xl md:text-2xl font-serif text-[#2B231F] leading-relaxed">
              {artform.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
            <div className="md:col-span-2 space-y-6">
              <h2 className="font-serif text-2xl text-[#2B231F]">Cultural Context & Lineage</h2>
              <div className="text-sm md:text-base text-[#4A4036] font-light leading-relaxed space-y-4">
                {artform.introduction ? (
                  <PortableTextRenderer value={artform.introduction} />
                ) : (
                  <p>{artform.culturalContext || artform.shortDescription}</p>
                )}
              </div>
            </div>

            {/* Sidebar Meta */}
            <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-6 space-y-6 h-fit">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-3">
                  Materials & Earth
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6E635B]">
                  {artform.materials?.map((m: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-[#C2593F]">✦</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E8E1D5] pt-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-3">
                  Technique & Rhythm
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6E635B]">
                  {artform.techniques?.map((t: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-[#D99B26]">✦</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Artisan Spotlight */}
        {artisans.length > 0 && (
          <section className="bg-[#2B231F] text-[#FBF9F4] py-16 px-6 md:px-10 border-t border-[#3D332E]">
            <div className="max-w-5xl mx-auto space-y-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold block">
                Custodians of the Knowledge
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {artisans.map((artisan: any) => (
                  <div key={artisan._id || artisan.slug} className="bg-[#382F2B] border border-[#4A3F3A] p-8 space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#D99B26] font-medium block">
                      {artisan.region}
                    </span>
                    <h3 className="font-serif text-2xl text-[#FBF9F4]">{artisan.name}</h3>
                    {artisan.quote && (
                      <p className="text-xs italic text-[#D1C7BD] font-serif leading-relaxed">
                        "{artisan.quote}"
                      </p>
                    )}
                    <Link
                      href={`/artisans/${artisan.slug}`}
                      className="inline-block text-xs uppercase tracking-[0.18em] text-[#C2593F] hover:underline pt-2"
                    >
                      View Artisan Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 10: Related Experiences */}
        {relatedExperiences.length > 0 && (
          <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-8 border-t border-[#E8E1D5]">
            <h2 className="font-serif text-3xl text-[#2B231F]">Hands-on Experiences in {artform.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedExperiences.map((exp: any) => (
                <div key={exp._id || exp.slug} className="bg-white border border-[#E8E1D5] p-6 space-y-4 hover:border-[#C2593F] transition-colors">
                  <span className="text-[10px] uppercase tracking-widest text-[#968A80] block">
                    {exp.duration} • {exp.format}
                  </span>
                  <h3 className="font-serif text-xl text-[#2B231F]">{exp.title}</h3>
                  <p className="text-xs text-[#6E635B] leading-relaxed line-clamp-2">
                    {exp.shortDescription}
                  </p>
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="inline-block text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold pt-2"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 13: Enquiry CTA */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="font-serif text-3xl text-[#2B231F]">Learn or Host {artform.title}</h3>
            <p className="text-sm text-[#6E635B] leading-relaxed">
              Whether you are an individual practitioner, corporate team, or educational institution, we facilitate authentic masterclasses led directly by master artisans.
            </p>
            <Link
              href={`/enquire?artform=${encodeURIComponent(artform.title)}`}
              className="inline-block bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Enquire About {artform.title} →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
