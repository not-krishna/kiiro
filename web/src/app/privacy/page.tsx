import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy | Kiiro',
  description: 'Kiiro platform privacy policy and data governance practices.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26]">Legal & Governance</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal">Privacy Policy</h1>
          </div>
        </section>

        <section className="py-16 px-6 md:px-10 max-w-4xl mx-auto space-y-8 text-sm text-[#4A4036] font-light leading-relaxed">
          <p>
            Kiiro Cultural Platform (&quot;Kiiro&quot;, &quot;we&quot;, &quot;our&quot;) respects your privacy. This document outlines how we collect, handle, and protect information submitted through our website and enquiry forms.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">1. Information Collection</h3>
          <p>
            We collect personal details (such as name, email address, phone number, and institutional affiliation) solely when explicitly provided by you through our enquiry forms, event booking forms, or newsletter subscriptions.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">2. Use of Information</h3>
          <p>
            Collected information is strictly used to coordinate workshop reservations, respond to institutional enquiries, communicate event updates, and issue course completion certificates. We never sell or transfer your personal data to third-party ad networks.
          </p>

          <h3 className="font-serif text-xl text-[#2B231F] font-normal pt-4">3. Data Security & Storage</h3>
          <p>
            Operational data is stored using secure encrypted endpoints. No sensitive financial information or payment card credentials are ever stored within our Sanity content lake or website infrastructure.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
