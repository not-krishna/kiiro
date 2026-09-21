import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IndividualBookingForm } from '@/components/ui/forms/IndividualBookingForm'
import { CorporatePlanningForm } from '@/components/ui/forms/CorporatePlanningForm'
import { CsrPartnershipForm } from '@/components/ui/forms/CsrPartnershipForm'

export const metadata = {
  title: 'Enquire | Kiiro',
  description: 'Book a public session, plan a group experience, or start a partnership conversation.',
}

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<{
    intent?: string
    subject?: string
    event?: string
    date?: string
    time?: string
    endTime?: string
    city?: string
    venue?: string
    weekly?: string
    price?: string
    workshop?: string
  }>
}) {
  const params = await searchParams
  const intent = params.intent
  const price = params.price ? Number(params.price) : undefined

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 md:py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-5">
            <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight">Start a conversation</h1>
            <p className="text-base text-[#D8CEBE] font-light leading-relaxed">
              Individual bookings and group enquiries use different forms. A submitted request is not a confirmed reservation.
            </p>
          </div>
        </section>
        <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto space-y-16">
          {(intent === 'individual' || !intent) && (
            <div className="border border-[#D8CEBE] p-8 md:p-12 bg-white space-y-6">
              <h2 className="font-display text-2xl">Book a seat</h2>
              <IndividualBookingForm
                eventTitle={params.subject}
                eventDate={params.date}
                eventTime={params.time}
                eventEndTime={params.endTime}
                eventCity={params.city}
                eventVenue={params.venue}
                eventPrice={Number.isFinite(price) ? price : undefined}
                isWeekly={params.weekly === '1'}
              />
            </div>
          )}
          {(intent === 'group' || !intent) && (
            <div className="border border-[#D8CEBE] p-8 md:p-12 bg-white space-y-6">
              <h2 className="font-display text-2xl">Plan a group experience</h2>
              <CorporatePlanningForm workshopName={intent === 'group' ? params.subject : undefined} />
            </div>
          )}
          {intent === 'csr' && (
            <div className="border border-[#D8CEBE] p-8 md:p-12 bg-white space-y-6">
              <h2 className="font-display text-2xl">Partnership</h2>
              <CsrPartnershipForm />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
