import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/ui/EnquiryForm'

export const metadata = {
  title: 'Schools & Colleges Heritage Learning | Kiiro',
  description: 'Interdisciplinary craft masterclasses and cultural heritage appreciation for educational institutions.',
}

export default function SchoolsCollegesPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99B26] font-semibold">
              Educational & Institutional Programs
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
              Bringing Living Craft Knowledge to Classrooms
            </h1>
            <p className="text-sm md:text-base text-[#968A80] max-w-2xl leading-relaxed font-light">
              Connecting history, geography, material science, and visual arts through direct interactions with generational master artisans.
            </p>
          </div>
        </section>

        {/* Educational Pillars */}
        <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Curriculum Alignment</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Designed to complement Indian history, art education, environmental science, and social studies modules for primary through higher secondary students.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">Design & Art Colleges</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Intensive masterclasses for undergraduate and postgraduate students focusing on natural dye chemistry, indigenous toolmaking, and heritage preservation ethics.
              </p>
            </div>

            <div className="bg-white border border-[#E8E1D5] p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#2B231F]">On-Campus Workshops</h3>
              <p className="text-xs text-[#6E635B] leading-relaxed font-light">
                Our team handles complete logistics, bringing master artisans and organic materials directly to school campuses or design studios.
              </p>
            </div>
          </div>
        </section>

        {/* Institutional Enquiry */}
        <section className="bg-[#F3EDE2] py-16 px-6 md:px-10 border-t border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl text-[#2B231F]">Book a School or College Masterclass</h3>
              <p className="text-sm text-[#6E635B]">Share your grade levels, student batch size, and preferred artform interest.</p>
            </div>
            <EnquiryForm defaultCategory="Schools & Colleges" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
