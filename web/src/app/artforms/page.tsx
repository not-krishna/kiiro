import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ARTFROM_CHAPTERS } from '@/content/homepage'
import { workshopsByCategory } from '@/content/workshops'

export const metadata = {
  title: 'Artforms | Kiiro',
  description: 'Traditional art, contemporary art, and wellness practice — the disciplines behind Kiiro experiences.',
}

export default async function ArtformsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const chapters =
    category === 'traditional' || category === 'contemporary' || category === 'wellness'
      ? ARTFROM_CHAPTERS.filter((chapter) => chapter.id === category)
      : ARTFROM_CHAPTERS

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">Artforms</p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">The practices</h1>
            <p className="text-sm text-[#968A80] max-w-2xl font-light leading-relaxed">
              Artforms are the disciplines. Experiences are what you book. Names in each pillar follow the approved workshop catalogue.
            </p>
          </div>
        </section>
        {chapters.map((chapter) => {
          const workshops = workshopsByCategory(chapter.id)
          return (
            <section key={chapter.id} id={chapter.id} className="px-6 md:px-10 py-16 border-b border-[#E8E1D5]">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C2593F]">{chapter.pillar}</p>
                  <h2 className="font-serif text-3xl">{chapter.title}</h2>
                  <p className="text-sm text-[#6E635B] font-light leading-relaxed">{chapter.description}</p>
                </div>
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-[#E8E1D5] border border-[#E8E1D5]">
                  {workshops.map((workshop) => (
                    <li key={workshop.slug} className="bg-[#FBF9F4] p-5">
                      <p className="font-serif text-lg">{workshop.name}</p>
                      {workshop.origin && <p className="text-xs text-[#968A80] mt-1">{workshop.origin}</p>}
                      {workshop.durationDays === 2 && <p className="text-xs font-semibold mt-2">2-day workshop</p>}
                      <Link
                        href={`/experiences/corporates?category=${chapter.id}`}
                        className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] text-[#C2593F]"
                      >
                        View in group catalogue
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
