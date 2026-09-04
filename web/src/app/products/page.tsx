import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FALLBACK_PRODUCTS } from '@/lib/data'
import { client } from '@/sanity/lib/client'
import { PRODUCTS_PAGE_QUERY, ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const metadata = {
  title: 'Craft Products & Authentic Artefacts | Kiiro Catalogue',
  description: 'Editorial catalogue of hand-crafted traditional items made directly by master artisans.',
}

export const revalidate = 30

export default async function ProductsPage() {
  const [pageData, sanityProducts] = await Promise.all([
    client.fetch(PRODUCTS_PAGE_QUERY).catch(() => null),
    client.fetch(ALL_PRODUCTS_QUERY).catch(() => []),
  ])

  const heroHeading = pageData?.heroHeading || 'Handmade Works From Master Studios'
  const heroSubheading =
    pageData?.heroSubheading ||
    'Crafted in small batches with full artisan attribution, natural materials, and provenance documentation.'

  const displayProducts =
    sanityProducts && sanityProducts.length > 0
      ? sanityProducts.map((p: any) => ({
          _id: p._id,
          title: p.title,
          category: p.category || 'Handcrafted Artefact',
          shortDescription: p.shortDescription || '',
          price: p.price ? `${p.currency || '₹'}${p.price.toLocaleString()}` : 'Price on Request',
          maker: p.artisan?.name || 'Master Artisan Cluster',
          materials: p.artform?.title || 'Natural Living Craft Materials',
          dimensions: 'Authentic Studio Standard',
          availability: p.inStock ? 'In Stock (Limited Batch)' : 'Made to Order',
          imageUrl: p.image ? urlFor(p.image).width(800).url() : undefined,
        }))
      : FALLBACK_PRODUCTS

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Template I: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Craft Catalogue & Objects
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              {heroHeading}
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* Product Catalogue Grid */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayProducts.map((prod: any) => {
              const imageSrc =
                prod.imageUrl ||
                'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop'

              return (
                <div
                  key={prod._id}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={imageSrc}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B231F]/90 backdrop-blur-md text-[#FBF9F4] px-2.5 py-0.5 font-semibold text-[10px] uppercase tracking-wider">
                        {prod.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-[#E8E1D5] font-light">
                      {prod.availability}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                        {prod.title}
                      </h2>

                      <p className="text-xs text-[#6E635B] font-light leading-relaxed">
                        {prod.shortDescription}
                      </p>

                      <div className="bg-[#FBF9F4] border border-[#E8E1D5] p-3 text-xs text-[#6E635B] space-y-1 font-light">
                        <div><strong className="text-[#2B231F]">Maker:</strong> {prod.maker}</div>
                        <div><strong className="text-[#2B231F]">Materials:</strong> {prod.materials}</div>
                        <div><strong className="text-[#2B231F]">Dimensions:</strong> {prod.dimensions}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="font-serif text-xl text-[#2B231F]">{prod.price}</span>
                      <Link
                        href={`/enquire?subject=${encodeURIComponent(`Product Enquiry: ${prod.title}`)}`}
                        className="bg-[#2B231F] group-hover:bg-[#C2593F] text-white px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                      >
                        Inquire / Order →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Note on Ecommerce Scope */}
        <section className="bg-[#F3EDE2] py-12 px-6 md:px-10 border-t border-[#E8E1D5] text-center text-xs text-[#6E635B] font-light">
          Note: Products are handcrafted to order in limited studio batches. Direct transactional checkout is disabled; all acquisitions are fulfilled via direct inquiry.
        </section>
      </main>

      <Footer />
    </div>
  )
}
