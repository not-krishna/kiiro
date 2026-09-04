import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Corporate Creative Wellness & Team Engagement | Kiiro',
  description: 'Artisan-led corporate retreats, leadership wellness circles, and hands-on team engagement.',
}

export default function CorporateExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Corporate & Leadership Offsites
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Unplug Teams with Authentic Material Grounding
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Replace standard icebreakers with sensory clay work, Warli group canvas creation, and deep tactile focus led directly by master artisans.
            </p>
          </div>
        </section>

        {/* Program Formats */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2B231F]">Corporate Program Formats</h2>
            <p className="text-sm text-[#6E635B] font-light">
              Designed for executive offsites, townhalls, employee wellness weeks, and client engagement gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C2593F]">Format 01</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Executive Wellness Circles</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                2-hour micro-sessions focusing on sensory tactile clay work and breath focus to alleviate executive cognitive fatigue.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D99B26]">Format 02</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Collaborative Team Murals</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Half-day co-creation where teams paint a large-format Warli or Phad ceremonial canvas under artisan guidance for office display.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2B231F]">Format 03</span>
              <h3 className="font-serif text-2xl text-[#2B231F]">Custom Leadership Retreats</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Multi-day immersive offsites in Jaipur, Dahanu, or Goa integrating regional culinary arts, master craft workshops, and reflection.
              </p>
            </div>
          </div>
        </section>

        {/* Corporate Enquiry Form */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Plan a Corporate Engagement</h3>
              <p className="text-sm text-[#6E635B]">Tell us about your team size, preferred location, and event timeline.</p>
            </div>
            <EnquiryForm defaultCategory="Corporate & Team" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
