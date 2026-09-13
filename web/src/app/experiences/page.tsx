import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CtaLink } from '@/components/ui/CtaLink'
import { HOMEPAGE_EXPERIENCES } from '@/content/homepage'

export const metadata = {
  title: 'Experiences | Kiiro',
  description: 'What you can participate in — public sessions and group programmes. Distinct from artforms.',
}

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">Experiences</p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              What you can participate in
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Artforms describe the practice. Experiences are the sessions and programmes you actually join.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <CtaLink cta={{ label: 'Book Your Spot', href: '/weekly-events', kind: 'booking' }} variant="primary" />
              <CtaLink
                cta={{ label: 'Plan a Group Experience', href: '/experiences/corporates', kind: 'enquiry' }}
                variant="secondary"
                className="border-[#FBF9F4] text-[#FBF9F4] hover:bg-[#FBF9F4] hover:text-[#2B231F]"
              />
            </div>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-[#E8E1D5] border border-[#E8E1D5]">
          {HOMEPAGE_EXPERIENCES.map((experience) => (
            <article key={experience.id} className="bg-[#FBF9F4] p-8 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#968A80]">{experience.audience.join(' · ')}</p>
              <h2 className="font-serif text-2xl">{experience.name}</h2>
              <p className="text-sm text-[#6E635B] font-light leading-relaxed">{experience.description}</p>
              <Link href={experience.href} className="inline-block text-xs uppercase tracking-[0.16em] font-semibold text-[#C2593F]">
                Continue
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
