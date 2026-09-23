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
  heroImage?: unknown
}

interface JournalSectionProps {
  posts?: JournalPost[]
}

export function JournalSection({ posts }: JournalSectionProps) {
  const items = posts?.filter((post) => post.title) ?? []
  if (items.length === 0) return null

  return (
    <section id="journal" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-end justify-between border-b border-[#E8E1D5] pb-6">
          <h2 className="font-display text-fluid-3xl" data-motion-text>From the studio floor</h2>
          <Link href="/journal" className="kiiro-cta text-[15px] font-medium border-b-2 border-[#2B231F] pb-1" data-motion-reveal data-motion-distance="18">
            <span>All stories</span>
            <span aria-hidden="true" data-cta-arrow>&rarr;</span>
          </Link>
        </div>
        <ul className="divide-y divide-[#E8E1D5] border-y border-[#E8E1D5]" data-motion-stagger>
          {items.slice(0, 3).map((post) => {
            const imageUrl =
              post.heroImage && typeof post.heroImage === 'object' ? urlFor(post.heroImage as never).url() : null
            return (
              <li key={post._id || post.slug} className="py-8 grid md:grid-cols-12 gap-6" data-motion-item data-motion-card>
                {imageUrl && (
                  <div className="md:col-span-3 relative h-32 bg-[#EAE3D5] overflow-hidden" data-motion-image="horizontal">
                    <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                <div className={imageUrl ? 'md:col-span-9' : 'md:col-span-12'}>
                  <p className="text-sm text-[#4F5B2A] mb-2" data-card-meta>{post.category}</p>
                  <h3 className="font-display text-2xl mb-2" data-card-title>{post.title}</h3>
                  {post.standfirst && <p className="text-sm text-[#6E635B] font-light">{post.standfirst}</p>}
                  {post.slug && (
                    <Link href={`/journal/${post.slug}`} className="kiiro-cta inline-flex mt-3 text-xs uppercase tracking-[0.16em] font-semibold">
                      <span>Read</span>
                      <span aria-hidden="true" data-cta-arrow>&rarr;</span>
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
