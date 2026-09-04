import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Creative Wellness Circle | Kiiro Community',
  description: 'Mindful craft gatherings focused on tactile grounding, sensory focus, and community reflection.',
}

export default function CreativeWellnessCirclePage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Template G: Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#D99B26]">
              <Link href="/community" className="hover:underline">Community</Link>
              <span>/</span>
              <span>Wellness Circle</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
              Creative Wellness Circle
            </h1>

            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              A recurring sanctuary for urban professionals, artists, and culture seekers to slow down, engage tactile materials, and reconnect through collective focus.
            </p>
          </div>
        </section>

        {/* Purpose & Principles */}
        <section className="py-20 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          <div className="border-l-4 border-[#C2593F] pl-6 py-2">
            <h2 className="font-serif text-3xl text-[#2B231F] mb-3">Circle Purpose</h2>
            <p className="text-lg text-[#4A4036] font-light leading-relaxed">
              We live in a culture saturated with screens, speed, and digital abstraction. The Creative Wellness Circle provides a space to slow down through organic clay, natural pigments, and quiet presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#C2593F] font-semibold">Principle 01</span>
              <h3 className="font-serif text-xl text-[#2B231F]">No Performance Judgement</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Creation without pressure. The goal is sensory engagement and process intimacy, not polished perfection.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D99B26] font-semibold">Principle 02</span>
              <h3 className="font-serif text-xl text-[#2B231F]">Tactile Grounding</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Working with raw earth, water, and plant-derived pigments calms the nervous system and restores physical focus.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#2B231F] font-semibold">Principle 03</span>
              <h3 className="font-serif text-xl text-[#2B231F]">Shared Reflection</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Ending every circle with herbal tea and open conversation about art, presence, and daily rhythm.
              </p>
            </div>
          </div>

          {/* Member Stories */}
          <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-8 space-y-6">
            <h3 className="font-serif text-2xl text-[#2B231F]">Member Experiences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="bg-white p-6 border border-[#E8E1D5] font-serif text-sm text-[#4A4036] italic leading-relaxed space-y-2">
                <p>"Two hours in the circle felt like a weekend retreat. Working with terracotta clay helped me quiet a noisy week of corporate deadlines."</p>
                <cite className="block text-xs font-sans not-italic text-[#968A80] font-medium">— Radhika S., Architect (Mumbai Circle)</cite>
              </blockquote>

              <blockquote className="bg-white p-6 border border-[#E8E1D5] font-serif text-sm text-[#4A4036] italic leading-relaxed space-y-2">
                <p>"Learning the rhythm of Warli line work from Master Ramesh was deeply humbling. It changed how I view art in daily life."</p>
                <cite className="block text-xs font-sans not-italic text-[#968A80] font-medium">— Siddharth M., Designer (Bengaluru Circle)</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Join / Enquire */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-16 px-6 md:px-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#FBF9F4]">Join the Creative Wellness Circle</h3>
              <p className="text-sm text-[#968A80]">Register your interest for upcoming monthly gatherings in your city.</p>
            </div>
            <EnquiryForm defaultCategory="Individual Workshop" defaultSubject="Creative Wellness Circle Membership" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
