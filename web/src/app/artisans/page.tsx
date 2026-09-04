import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ALL_ARTISANS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { FALLBACK_ARTISANS, ArtisanItem } from '@/lib/data'

export const metadata = {
  title: 'Master Artisans & Lineage Custodians | Kiiro Ecosystem',
  description: 'Meet the master craftspeople, lineage holders, and community leaders preserving living Indian traditions.',
}

export default async function ArtisansPage() {
  let artisans: ArtisanItem[] = []
  try {
    const fetched = await client.fetch(ALL_ARTISANS_QUERY)
    if (fetched && fetched.length > 0) {
      artisans = fetched
    }
  } catch (error) {
    console.error('Error fetching artisans from Sanity:', error)
  }

  if (!artisans || artisans.length === 0) {
    artisans = FALLBACK_ARTISANS
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Custodians of Generational Knowledge
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              The Artisan Network
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Craft is not an anonymous commodity; it is lived experience carried by master practitioners across regions.
            </p>
          </div>
        </section>

        {/* Artisans Grid with Portraits */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artisans.map((artisan) => {
              const portraitSrc = artisan.portrait
                ? urlFor(artisan.portrait as any).url()
                : artisan.imageUrl ||
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'

              return (
                <div
                  key={artisan._id || artisan.slug}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col sm:flex-row overflow-hidden group shadow-xs hover:shadow-md"
                >
                  {/* Portrait Side */}
                  <div className="relative sm:w-2/5 h-64 sm:h-auto overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={portraitSrc}
                      alt={artisan.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent sm:hidden" />
                    
                    <div className="absolute bottom-3 left-3 sm:hidden text-xs text-[#FBF9F4] font-medium">
                      📍 {artisan.region}
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs tracking-wider text-[#968A80] uppercase">
                        <span className="text-[#D99B26] font-semibold">{artisan.lineage}</span>
                      </div>

                      <h2 className="font-serif text-2xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors">
                        {artisan.name}
                      </h2>

                      {artisan.quote && (
                        <blockquote className="text-xs italic font-serif text-[#6E635B] border-l-2 border-[#C2593F] pl-3 py-1">
                          &quot;{artisan.quote}&quot;
                        </blockquote>
                      )}

                      <p className="text-xs text-[#4A4036] font-light leading-relaxed line-clamp-3">
                        {artisan.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="text-[11px] text-[#968A80]">
                        📍 {artisan.region}
                      </span>
                      <Link
                        href={`/artisans/${artisan.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2593F] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                      >
                        <span>Profile</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Impact Link CTA */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="font-serif text-3xl text-[#2B231F]">Supporting Dignified Livelihoods</h3>
            <p className="text-sm text-[#6E635B] leading-relaxed">
              Every workshop fee directly compensates artisans and supports community capacity building in indigenous clusters.
            </p>
            <Link
              href="/impact"
              className="inline-block bg-[#2B231F] hover:bg-[#C2593F] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Explore Artisan Impact →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
