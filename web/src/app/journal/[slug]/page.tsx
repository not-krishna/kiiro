import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { JOURNAL_POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_JOURNAL } from '@/lib/data'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = FALLBACK_JOURNAL.find((p) => p.slug === slug)
  return {
    title: `${post ? post.title : 'Journal Article'} | Kiiro Field Notes`,
    description: post?.standfirst || 'Cultural essay and material heritage story.',
  }
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: any = null

  try {
    post = await client.fetch(JOURNAL_POST_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching journal post from Sanity:', error)
  }

  if (!post) {
    post = FALLBACK_JOURNAL.find((p) => p.slug === slug)
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/journal" className="hover:underline">Journal</Link>
              <span>/</span>
              <span>{post.category || 'Craft Heritage'}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-xs text-[#968A80] uppercase tracking-wider pt-2">
              <div>By <span className="text-[#FBF9F4] font-medium">{post.author}</span></div>
              <div>Published: {post.publishedAt}</div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-16 px-6 md:px-10 max-w-4xl mx-auto space-y-10">
          <div className="border-l-2 border-[#C2593F] pl-6 py-2">
            <p className="text-xl md:text-2xl font-serif text-[#2B231F] leading-relaxed italic">
              {post.standfirst}
            </p>
          </div>

          <div className="space-y-6">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : post.bodyParagraphs ? (
              post.bodyParagraphs.map((para: string, idx: number) => (
                <p key={idx} className="text-base md:text-lg text-[#4A4036] font-light leading-relaxed">
                  {para}
                </p>
              ))
            ) : null}
          </div>

          {/* Share & Explore links */}
          <div className="border-t border-[#E8E1D5] pt-8 flex items-center justify-between">
            <Link href="/journal" className="text-xs uppercase tracking-[0.2em] text-[#C2593F] font-semibold">
              ← Back to Journal Index
            </Link>
            <Link href="/artforms" className="text-xs uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#C2593F] font-semibold">
              Explore Related Artforms →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
