import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ALL_JOURNAL_POSTS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { FALLBACK_JOURNAL, JournalItem } from '@/lib/data'

export const metadata = {
  title: 'Journal & Cultural Writing | Kiiro',
  description: 'Editorial essays, craft material histories, field notes, and cultural reflections.',
}

export default async function JournalPage() {
  let posts: JournalItem[] = []
  try {
    const fetched = await client.fetch(ALL_JOURNAL_POSTS_QUERY)
    if (fetched && fetched.length > 0) {
      posts = fetched
    }
  } catch (error) {
    console.error('Error fetching journal posts from Sanity:', error)
  }

  if (!posts || posts.length === 0) {
    posts = FALLBACK_JOURNAL
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Kiiro Editorial & Field Notes
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Essays on Living Culture & Material Wisdom
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Serious cultural writing, non-superficial documentation, and stories from craft communities.
            </p>
          </div>
        </section>

        {/* Journal Index Grid */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageSrc = post.heroImage
                ? urlFor(post.heroImage as any).url()
                : post.imageUrl ||
                  'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop'

              return (
                <article
                  key={post._id || post.slug}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B231F]/90 backdrop-blur-md text-[#FBF9F4] px-2.5 py-0.5 font-semibold text-[10px] uppercase tracking-wider">
                        {post.category || 'Craft Heritage'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-[#E8E1D5] font-light">
                      {post.publishedAt}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="font-serif text-xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs text-[#6E635B] font-light leading-relaxed line-clamp-3">
                        {post.standfirst}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="text-[11px] text-[#968A80]">By {post.author}</span>
                      <Link
                        href={`/journal/${post.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2593F] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                      >
                        <span>Read Article</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
