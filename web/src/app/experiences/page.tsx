import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ALL_EXPERIENCES_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_EXPERIENCES, ExperienceItem } from '@/lib/data'

export const metadata = {
  title: 'Hands-On Experiences & Masterclasses | Kiiro',
  description: 'Immersive workshops, corporate retreats, school masterclasses, and online artisan learning.',
}

export default async function ExperiencesPage() {
  let experiences: ExperienceItem[] = []
  try {
    const fetched = await client.fetch(ALL_EXPERIENCES_QUERY)
    if (fetched && fetched.length > 0) {
      experiences = fetched
    }
  } catch (error) {
    console.error('Error fetching experiences from Sanity:', error)
  }

  if (!experiences || experiences.length === 0) {
    experiences = FALLBACK_EXPERIENCES
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Hands-On Learning & Immersion
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Craft Experiences Built on Intimacy and Respect
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              From weekend public workshops to corporate leadership retreats and institutional learning modules.
            </p>
          </div>
        </section>

        {/* Quick Nav Categories */}
        <section className="bg-[#F3EDE2] border-b border-[#E8E1D5] py-6 px-6 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6E635B]">
            <Link href="/experiences/corporates" className="hover:text-[#C2593F] transition-colors">Corporates & Teams →</Link>
            <span className="text-[#D99B26]">|</span>
            <Link href="/experiences/schools-colleges" className="hover:text-[#C2593F] transition-colors">Schools & Colleges →</Link>
            <span className="text-[#D99B26]">|</span>
            <Link href="/experiences/hospitality-luxury" className="hover:text-[#C2593F] transition-colors">Hospitality & Luxury →</Link>
            <span className="text-[#D99B26]">|</span>
            <Link href="/experiences/online" className="hover:text-[#C2593F] transition-colors">Online Workshops →</Link>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => {
              const imageSrc =
                exp.imageUrl ||
                'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop'

              return (
                <div
                  key={exp._id || exp.slug}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
                >
                  {/* Experience Image Cover */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={imageSrc}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B231F]/90 backdrop-blur-md text-[#FBF9F4] px-3 py-1 text-[10px] uppercase tracking-wider font-semibold">
                        {exp.experienceType || 'Workshop'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-[#E8E1D5] font-light">
                      ⏱ {exp.duration} • {exp.format}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl md:text-3xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                        {exp.title}
                      </h2>

                      <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                        {exp.shortDescription}
                      </p>

                      {exp.audience && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {exp.audience.map((aud: string, idx: number) => (
                            <span key={idx} className="text-[11px] bg-[#FBF9F4] text-[#6E635B] border border-[#E8E1D5] px-2 py-0.5">
                              {aud}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="text-xs text-[#968A80] uppercase tracking-wider font-light">
                        Format: {exp.format || 'In-Person'}
                      </span>
                      <Link
                        href={`/experiences/${exp.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2593F] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                      >
                        <span>View Experience</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Global Enquiry CTA */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="font-serif text-3xl text-[#FBF9F4]">Need a Tailored Experience for Your Team or Institution?</h3>
            <p className="text-sm text-[#968A80] leading-relaxed">
              We design custom sessions ranging from 2-hour executive wellness circles to 3-day artisan-led immersion masterclasses.
            </p>
            <Link
              href="/enquire"
              className="inline-block bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Plan Custom Program →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
