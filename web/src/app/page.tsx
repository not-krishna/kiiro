import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ManifestoImpact } from '@/components/home/ManifestoImpact'
import { ArtformsSection } from '@/components/home/ArtformsSection'
import { ExperiencesAudience } from '@/components/home/ExperiencesAudience'
import { ArtisanImpact } from '@/components/home/ArtisanImpact'
import { PartnershipsSection } from '@/components/home/PartnershipsSection'
import { JournalSection } from '@/components/home/JournalSection'
import { EnquirySection } from '@/components/home/EnquirySection'
import { SocialSection } from '@/components/home/SocialSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

import { client } from '@/sanity/lib/client'
import {
  HOMEPAGE_QUERY,
  ARTFORMS_QUERY,
  EXPERIENCES_QUERY,
  ARTISANS_QUERY,
  JOURNAL_QUERY,
  TESTIMONIALS_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 30 // ISR Revalidation window (30 seconds)

export default async function HomePage() {
  // Fetch Sanity Content Lake data gracefully with fallbacks
  const [homeData, artformsData, experiencesData, artisansData, journalData, testimonialsData] =
    await Promise.all([
      client.fetch(HOMEPAGE_QUERY).catch(() => null),
      client.fetch(ARTFORMS_QUERY).catch(() => []),
      client.fetch(EXPERIENCES_QUERY).catch(() => []),
      client.fetch(ARTISANS_QUERY).catch(() => []),
      client.fetch(JOURNAL_QUERY).catch(() => []),
      client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    ])

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans selection:bg-[#E8D9C8]">
      {/* Header Navigation Shell */}
      <Header />

      {/* Main Production Homepage Narrative Flow */}
      <main className="flex-1">
        {/* 01 Hero */}
        <Hero data={homeData} />

        {/* 02 Manifesto & Impact */}
        <ManifestoImpact
          manifestoTitle={homeData?.manifestoTitle}
          manifestoText={homeData?.manifestoText}
        />

        {/* 03 Artforms */}
        <ArtformsSection artforms={homeData?.featuredArtforms || artformsData} />

        {/* 04 Experiences by Audience */}
        <ExperiencesAudience />

        {/* 05 Artisan Impact */}
        <ArtisanImpact data={homeData?.artisanFeature || artisansData[0]} />

        {/* 06 Partnerships & CSR */}
        <PartnershipsSection title={homeData?.partnershipsTitle} />

        {/* 07 Journal */}
        <JournalSection posts={homeData?.featuredJournalPosts || journalData} />

        {/* 08 Enquiry */}
        <EnquirySection />

        {/* 09 Social */}
        <SocialSection />

        {/* 10 Testimonials (Placed directly above Footer) */}
        <TestimonialsSection testimonials={testimonialsData} />
      </main>

      {/* 11 Footer Shell */}
      <Footer />
    </div>
  )
}
