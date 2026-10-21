import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { JOURNAL_POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { getContentStore } from '@/lib/cms/contentStore'
import { FALLBACK_JOURNAL } from '@/lib/data'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export const revalidate = 30

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = getContentStore()
  let post: any = null

  try {
    post = await client.fetch(JOURNAL_POST_BY_SLUG_QUERY, { slug })
  } catch {
    // fallback
  }

  if (!post) {
    post = (store.journal || []).find((p) => p.slug === slug)
  }

  if (!post) {
    post = FALLBACK_JOURNAL.find((p) => p.slug === slug)
  }

  if (!post || post.published === false) {
    return {
      title: 'Article Not Found | Kiiro Field Notes',
      description: 'The requested journal article could not be found.',
    }
  }

  return {
    title: post.seoTitle || `${post.title} | Kiiro Field Notes`,
    description: post.seoDescription || post.standfirst || post.excerpt || 'Cultural essay and material heritage story.',
  }
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = getContentStore()
  let post: any = null

  try {
    post = await client.fetch(JOURNAL_POST_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Error fetching journal post from Sanity:', error)
  }

  if (!post) {
    post = (store.journal || []).find((p) => p.slug === slug)
  }

  if (!post) {
    post = FALLBACK_JOURNAL.find((p) => p.slug === slug)
  }

  // Not found or unpublished draft protection
  if (!post || post.published === false) {
    notFound()
  }

  // Resolve cover image
  const coverImageSrc = post.imageUrl || (post.heroImage ? urlFor(post.heroImage).url() : null)

  // Format date
  const displayDate = post.publishedAt
    ? !Number.isNaN(Date.parse(post.publishedAt))
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : post.publishedAt
    : 'Recent'

  const excerptText = post.standfirst || post.excerpt

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans selection:bg-[#E8D9C8]">
      <Header />

      <main className="flex-grow">
        {/* Editorial Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-24 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/journal" className="hover:underline">
                Journal
              </Link>
              <span>/</span>
              <span>{post.category || 'Craft Heritage'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-[#FBF9F4]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#968A80] uppercase tracking-wider pt-2 border-t border-[#3D332E]">
              <div>
                By <span className="text-[#FBF9F4] font-medium">{post.author || 'Kiiro Studio'}</span>
              </div>
              <div>
                Published: <span className="text-[#E8E1D5]">{displayDate}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image Feature (if present) */}
        {coverImageSrc && (
          <section className="max-w-4xl mx-auto px-6 md:px-10 -mt-8 md:-mt-12 relative z-10">
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-lg shadow-xl border border-[#D8CEBE] bg-[#EAE3D5]">
              <Image
                src={coverImageSrc}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </section>
        )}

        {/* Article Body */}
        <article className="py-12 md:py-16 px-6 md:px-10 max-w-4xl mx-auto space-y-10">
          {excerptText && (
            <div className="border-l-2 border-[#4F5B2A] pl-6 py-2">
              <p className="text-xl md:text-2xl font-serif text-[#2B231F] leading-relaxed italic">
                {excerptText}
              </p>
            </div>
          )}

          <div className="space-y-6 text-[#2B231F]">
            {Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableTextRenderer value={post.body} />
            ) : typeof post.body === 'string' && post.body.trim() ? (
              post.body
                .split('\n\n')
                .filter((p: string) => p.trim())
                .map((para: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-base md:text-lg text-[#3D332E] font-light leading-relaxed font-serif"
                  >
                    {para}
                  </p>
                ))
            ) : post.bodyParagraphs && Array.isArray(post.bodyParagraphs) ? (
              post.bodyParagraphs.map((para: string, idx: number) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-[#3D332E] font-light leading-relaxed font-serif"
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-base text-[#6E635B] font-light italic">
                Full essay content coming soon.
              </p>
            )}
          </div>

          {/* Share & Explore links */}
          <div className="border-t border-[#E8E1D5] pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/journal"
              className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold hover:underline inline-flex items-center gap-1.5"
            >
              <span>← Back to Journal Index</span>
            </Link>
            <Link
              href="/weekly-events"
              className="text-xs uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#4F5B2A] font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore Upcoming Sessions →</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
