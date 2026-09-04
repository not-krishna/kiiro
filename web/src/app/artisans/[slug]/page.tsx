import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ARTISAN_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_ARTISANS, FALLBACK_EXPERIENCES } from '@/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artisan = FALLBACK_ARTISANS.find((a) => a.slug === slug)
  return {
    title: `${artisan ? artisan.name : 'Master Artisan'} | Kiiro Profile`,
    description: artisan?.bio || 'Generational artisan profile and living craft masterclass lead.',
  }
}

export default async function ArtisanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let artisan: any = null

  try {
    artisan = await client.fetch(ARTISAN_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching artisan from Sanity:', error)
  }

  if (!artisan) {
    artisan = FALLBACK_ARTISANS.find((a) => a.slug === slug)
  }

  if (!artisan) {
    notFound()
  }

  const hostedExperiences = artisan.hostedExperiences?.length
    ? artisan.hostedExperiences
    : FALLBACK_EXPERIENCES.slice(0, 2)

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/artisans" className="hover:underline">Artisan Network</Link>
              <span>/</span>
              <span>{artisan.region}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {artisan.name}
            </h1>

            <div className="text-xs text-[#968A80] uppercase tracking-widest font-light">
              Lineage: <span className="text-[#FBF9F4] font-medium">{artisan.lineage}</span>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          {artisan.quote && (
            <blockquote className="bg-[#F3EDE2] border-l-4 border-[#C2593F] p-8 font-serif text-xl md:text-2xl text-[#2B231F] italic leading-relaxed">
              "{artisan.quote}"
            </blockquote>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <h2 className="font-serif text-2xl text-[#2B231F]">Biography & Practice</h2>
              <p className="text-base text-[#4A4036] font-light leading-relaxed whitespace-pre-line">
                {artisan.bio}
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-6 space-y-6 h-fit">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                  Region & Location
                </h4>
                <p className="text-xs text-[#6E635B]">{artisan.region}</p>
              </div>

              {artisan.craftReferences && artisan.craftReferences.length > 0 && (
                <div className="border-t border-[#E8E1D5] pt-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                    Craft Disciplines
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#6E635B]">
                    {artisan.craftReferences.map((c: any) => (
                      <li key={c.slug}>
                        <Link href={`/artforms/${c.slug}`} className="text-[#C2593F] hover:underline">
                          {c.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Hosted Masterclasses */}
          {hostedExperiences.length > 0 && (
            <div className="border-t border-[#E8E1D5] pt-12 space-y-6">
              <h3 className="font-serif text-2xl text-[#2B231F]">Masterclasses Facilitated by {artisan.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostedExperiences.map((exp: any) => (
                  <div key={exp._id || exp.slug} className="bg-white border border-[#E8E1D5] p-6 space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#968A80] block">
                      {exp.duration} • {exp.format}
                    </span>
                    <h4 className="font-serif text-xl text-[#2B231F]">{exp.title}</h4>
                    <Link
                      href={`/experiences/${exp.slug}`}
                      className="inline-block text-xs uppercase tracking-[0.18em] text-[#C2593F] font-semibold pt-2"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
