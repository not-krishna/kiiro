import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ALL_ARTFORMS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { FALLBACK_ARTFORMS, ArtformItem } from '@/lib/data'

export const metadata = {
  title: 'Living Artforms & Heritage Crafts | Kiiro',
  description: 'Explore living traditional, contemporary, and tactile wellness craft practices across India.',
}

export default async function ArtformsPage() {
  let artforms: ArtformItem[] = []
  try {
    const fetched = await client.fetch(ALL_ARTFORMS_QUERY)
    if (fetched && fetched.length > 0) {
      artforms = fetched
    }
  } catch (error) {
    console.error('Error fetching artforms from Sanity, using fallback data:', error)
  }

  if (!artforms || artforms.length === 0) {
    artforms = FALLBACK_ARTFORMS
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Repertoire of Heritage & Craft
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Living Cultural Practices Across Regions
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Connecting indigenous wisdom, tactile materials, and generational lineage through authentic, non-flattened engagement.
            </p>
          </div>
        </section>

        {/* Artforms Grid */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artforms.map((item) => {
              const imageSrc = item.heroImage
                ? urlFor(item.heroImage as any).url()
                : item.imageUrl ||
                  'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop'

              return (
                <div
                  key={item._id || item.slug}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-md"
                >
                  {/* Card Image Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B231F]/90 backdrop-blur-md text-[#FBF9F4] px-3 py-1 text-[10px] uppercase tracking-wider font-semibold">
                        {item.category || 'Traditional'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-[#E8E1D5] font-light">
                      📍 {item.region || 'India'}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-xs text-[#6E635B] leading-relaxed font-light line-clamp-3">
                        {item.shortDescription}
                      </p>

                      {item.materials && item.materials.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#968A80] block mb-1">
                            Materials:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.materials.slice(0, 3).map((mat: string, idx: number) => (
                              <span key={idx} className="text-[11px] bg-[#FBF9F4] text-[#6E635B] border border-[#E8E1D5] px-2 py-0.5">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
                      <Link
                        href={`/artforms/${item.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2593F] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                      >
                        <span>Explore Artform</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Enquiry CTA Section */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="font-serif text-3xl text-[#2B231F]">Looking to Bring an Artform to Your Community or Campus?</h3>
            <p className="text-sm text-[#6E635B] leading-relaxed">
              We design custom masterclasses, institutional programs, and corporate retreats led directly by master artisans.
            </p>
            <Link
              href="/enquire"
              className="inline-block bg-[#2B231F] hover:bg-[#C2593F] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Initiate Enquiry →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
