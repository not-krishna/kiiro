import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { ALL_EVENTS_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_EVENTS, EventItem } from '@/lib/data'

export const metadata = {
  title: 'Weekly Events & Public Workshops | Kiiro',
  description: 'Book upcoming artisan-led craft workshops across Mumbai, Jaipur, Bengaluru, Delhi NCR, and Pune.',
}

export default async function WeeklyEventsPage() {
  let events: EventItem[] = []
  try {
    const fetched = await client.fetch(ALL_EVENTS_QUERY)
    if (fetched && fetched.length > 0) {
      events = fetched
    }
  } catch (error) {
    console.error('Error fetching events from Sanity:', error)
  }

  if (!events || events.length === 0) {
    events = FALLBACK_EVENTS
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C2593F] font-semibold">
              Weekly Public Gatherings
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Upcoming Workshops & Masterclasses
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Hands-on weekend sessions led by master craftspeople across 7 cities. Real materials, authentic lineage, limited seats.
            </p>
          </div>
        </section>

        {/* Events Grid with Image Covers */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
            <h2 className="font-serif text-2xl text-[#2B231F]">Scheduled Gatherings</h2>
            <span className="text-xs text-[#968A80] uppercase tracking-wider">
              {events.length} Sessions Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((evt) => {
              const imageSrc =
                evt.imageUrl ||
                'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop'

              return (
                <div
                  key={evt._id || evt.slug}
                  className="bg-white border border-[#E8E1D5] hover:border-[#C2593F] transition-all flex flex-col sm:flex-row overflow-hidden group shadow-xs hover:shadow-md"
                >
                  {/* Image Cover Side */}
                  <div className="relative sm:w-2/5 h-56 sm:h-auto overflow-hidden bg-[#EAE3D5]">
                    <Image
                      src={imageSrc}
                      alt={evt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent sm:hidden" />
                    
                    {/* Floating City Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#2B231F] text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                        {evt.city}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 sm:hidden text-xs text-white font-medium">
                      ₹{evt.price} • {evt.bookingStatus}
                    </div>
                  </div>

                  {/* Details Side */}
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#968A80]">
                        <span className="text-[#C2593F] font-semibold">{evt.date}</span>
                        <span>{evt.startTime}</span>
                      </div>

                      <h3 className="font-serif text-xl text-[#2B231F] group-hover:text-[#C2593F] transition-colors leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-[#6E635B] font-light">
                        Venue: {evt.venue}
                      </p>

                      <div className="flex items-center space-x-3 pt-1">
                        <span className="font-serif text-lg font-normal text-[#2B231F]">₹{evt.price}</span>
                        <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold border ${
                          evt.bookingStatus === 'open'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : evt.bookingStatus === 'limited'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-stone-100 text-stone-700 border-stone-300'
                        }`}>
                          {evt.bookingStatus === 'open' ? 'Seats Open' : evt.bookingStatus === 'limited' ? 'Few Left' : 'Enquiry'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8E1D5]">
                      <Link
                        href={`/weekly-events/${evt.slug}`}
                        className="block w-full text-center bg-[#2B231F] group-hover:bg-[#C2593F] text-white py-2.5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                      >
                        Reserve Spot →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Custom Group Request */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="font-serif text-3xl text-[#2B231F]">Don&apos;t See a Date in Your City?</h3>
            <p className="text-sm text-[#6E635B] leading-relaxed">
              We organize private group workshops, family cultural circles, and studio sessions upon request.
            </p>
            <Link
              href="/enquire"
              className="inline-block bg-[#2B231F] hover:bg-[#C2593F] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Request Private Session →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
