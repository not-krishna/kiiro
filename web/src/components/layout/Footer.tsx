import Link from 'next/link'
import { ACTIVE_CITIES } from '@/content/presence'

export function Footer() {
  return (
    <footer className="bg-[#2B231F] text-[#E8E1D5] pt-20 pb-12 border-t border-[#3D332E] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3D332E]">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-sans text-2xl font-bold tracking-[0.25em] uppercase text-[#FBF9F4] group-hover:text-[#4F5B2A] transition-colors">
                KIIRO
              </span>
              <span className="block text-sm tracking-normal normal-case text-[#968A80] font-sans mt-0.5">
                Living cultural platform
              </span>
            </Link>
            <p className="text-sm text-[#968A80] max-w-sm leading-relaxed font-light">
              Connecting living cultural traditions, master artisans, knowledge, and contemporary experiences through immersive hands-on learning.
            </p>
            <div className="pt-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#D99B26]">
              Hands On. Rooted. Real.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#FBF9F4]">Repertoire</h4>
            <ul className="space-y-2.5 text-sm text-[#968A80]">
              <li>
                <Link href="/weekly-events" className="hover:text-[#4F5B2A] transition-colors font-medium">
                  Weekly Events
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#FBF9F4] transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/artforms" className="hover:text-[#FBF9F4] transition-colors">
                  Artforms
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-[#FBF9F4] transition-colors">
                  Artisan Network
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FBF9F4] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#FBF9F4]">Institutional</h4>
            <ul className="space-y-2.5 text-sm text-[#968A80]">
              <li>
                <Link href="/experiences/schools-colleges" className="hover:text-[#FBF9F4] transition-colors">
                  Schools & Colleges
                </Link>
              </li>
              <li>
                <Link href="/experiences/corporates" className="hover:text-[#FBF9F4] transition-colors">
                  Corporates & Teams
                </Link>
              </li>
              <li>
                <Link href="/experiences/hospitality-luxury" className="hover:text-[#FBF9F4] transition-colors">
                  Hospitality & Luxury
                </Link>
              </li>
              <li>
                <Link href="/partnerships-csr" className="hover:text-[#FBF9F4] transition-colors">
                  CSR & Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#FBF9F4]">Presence</h4>
            <p className="text-sm text-[#968A80] leading-relaxed font-light">
              {ACTIVE_CITIES.join(', ')}.
            </p>
            <Link href="/enquire" className="inline-block text-sm text-[#D99B26] hover:underline">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-[#968A80]">
          <p>© {new Date().getFullYear()} Kiiro Cultural Platform. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/impact" className="hover:text-white transition-colors">
              Impact Overview
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
