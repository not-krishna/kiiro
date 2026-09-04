import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms of Service | Kiiro',
  description: 'Kiiro platform terms of service and workshop reservation policies.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26]">Legal & Governance</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal">Terms of Service</h1>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto space-y-8 text-sm text-[#4A4036] font-light leading-relaxed">
          <p>
            Welcome to Kiiro. By accessing our platform, booking a public workshop, or commissioning institutional programs, you agree to comply with the following terms.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">1. Workshop Reservations & Attendance</h3>
          <p>
            Public workshop seats are reserved upon confirmation. Due to venue capacity and raw material preparation by master artisans, cancellations requested 48 hours prior receive full credit transfer toward any future session.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">2. Cultural Integrity & Intellectual Property</h3>
          <p>
            All artform histories, artisan biographies, photographs, and educational materials published on Kiiro remain the cultural property of the respective artisan lineages and Kiiro. Reproducing artisan works for commercial exploitation without consent is strictly prohibited.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">3. Code of Conduct</h3>
          <p>
            Participants in all Kiiro masterclasses and community circles are expected to maintain respectful behavior toward master artisans, facilitators, and fellow participants.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
