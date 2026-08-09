import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface JournalPost {
  _id?: string
  title: string
  slug?: string
  standfirst?: string
  category?: string
  author?: string
  publishedAt?: string
  heroImage?: any
}

interface JournalSectionProps {
  posts?: JournalPost[]
}

export function JournalSection({ posts }: JournalSectionProps) {
  const fallbackPosts: JournalPost[] = [
    {
      title: 'The Geography of Clay: How Mineral Soils Shape India’s Pottery Lineages',
      category: 'Craft Knowledge',
      author: 'Kiiro Editorial',
      publishedAt: '2026-08-01',
      standfirst: 'Tracing the raw terracotta deposits from the Gangetic plains to Kutch, and how earth chemistry dictates ancient firing techniques.',
    },
    {
      title: 'Beyond Motifs: Decoding the Ritual Geometry of Warli Art',
      category: 'Cultural Context',
      author: 'Anita Sharma',
      publishedAt: '2026-07-24',
      standfirst: 'Why the circle, triangle, and square represent the sun, sacred trees, and human shelter in indigenous Warli iconography.',
    },
    {
      title: 'Botanical Alchemy: Extracting Natural Indigo in Bagru',
      category: 'Process & Technique',
      author: 'Master Craftsperson Devraj',
      publishedAt: '2026-07-15',
      standfirst: 'Step-by-step fermentation of natural indigo vats and hand-block resist printing techniques.',
    },
  ]

  const items = posts && posts.length > 0 ? posts : fallbackPosts
  const featured = items[0]
  const secondary = items.slice(1, 3)

  const featuredImageUrl = featured?.heroImage ? urlFor(featured.heroImage).url() : null

  return (
    <section id="journal" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E8E1D5] pb-8">
          <div className="space-y-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              Publication & Knowledge • Section 07
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F]">
              Stories from the Craft Floor
            </h2>
          </div>
          <Link
            href="#journal"
            className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#C2593F] border-b border-[#2B231F] hover:border-[#C2593F] transition-all pb-0.5"
          >
            Read All Journal Stories →
          </Link>
        </div>

        {/* Editorial Publication System Layout (No Blog Cards) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Featured Story (7 Cols) */}
          {featured && (
            <div className="lg:col-span-7 border border-[#D8CEBE] p-4 bg-[#F3EFE6] space-y-6">
              <div className="relative aspect-[16/10] bg-[#EAE3D5] overflow-hidden border border-[#D8CEBE] flex flex-col justify-end p-8">
                {featuredImageUrl && (
                  <Image
                    src={featuredImageUrl}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/20 to-transparent z-10" />

                <div className="relative z-20 space-y-2 text-[#FBF9F4]">
                  <div className="flex justify-between items-center text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#D99B26]">
                    <span>{featured.category || 'Craft Knowledge'}</span>
                    <span>{featured.author || 'Kiiro Editorial'}</span>
                  </div>
                  <h3 className="font-display text-fluid-2xl font-normal text-[#FBF9F4]">
                    {featured.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 px-2 py-1">
                <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                  {featured.standfirst}
                </p>
                <div className="pt-4 border-t border-[#D8CEBE] flex justify-between items-center text-xs font-sans">
                  <span className="text-[#968A80] text-[11px] uppercase tracking-wider">August 2026 Issue</span>
                  <Link
                    href="#journal"
                    className="font-semibold uppercase tracking-[0.2em] text-[#C2593F] hover:text-[#2B231F] transition-colors"
                  >
                    Read Feature Essay →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Rule-Divided Supporting Stories Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#968A80] border-b border-[#E8E1D5] pb-3">
              Secondary Dispatches & Essays
            </span>

            <div className="divide-y divide-[#E8E1D5] space-y-0">
              {secondary.map((post, idx) => (
                <div key={post._id || idx} className="py-6 first:pt-0 space-y-3 group cursor-pointer">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#A65B3B]">
                    Story 0{idx + 2} • {post.category || 'Cultural Context'}
                  </span>
                  <h4 className="font-display text-fluid-xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed line-clamp-2">
                    {post.standfirst}
                  </p>
                  <div className="pt-2 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#2B231F] group-hover:text-[#C2593F] transition-colors">
                    Read Dispatch →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

