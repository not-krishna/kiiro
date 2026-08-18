import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#2B231F] text-[#E8E1D5] pt-20 pb-12 border-t border-[#3D332E] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3D332E]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-sans text-2xl font-bold tracking-[0.25em] uppercase text-[#FBF9F4] group-hover:text-[#C2593F] transition-colors">
                KIIRO
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-[#968A80] font-sans mt-0.5">
                Living Cultural Platform
              </span>
            </Link>
            <p className="text-xs text-[#968A80] max-w-sm leading-relaxed font-light">
              Connecting living cultural traditions, master artisans, knowledge, and contemporary experiences through immersive hands-on learning.
            </p>
            <div className="pt-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#D99B26]">
              Hands On. Rooted. Real.
            </div>
          </div>

          {/* Navigation Col 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FBF9F4]">
              Repertoire
            </h4>
            <ul className="space-y-2.5 text-xs text-[#968A80]">
              <li><Link href="#about" className="hover:text-[#FBF9F4] transition-colors">About Us & Manifesto</Link></li>
              <li><Link href="#events" className="hover:text-[#C2593F] transition-colors font-medium">Weekly Events</Link></li>
              <li><Link href="#artforms" className="hover:text-[#FBF9F4] transition-colors">Traditional Artforms</Link></li>
              <li><Link href="#artforms" className="hover:text-[#FBF9F4] transition-colors">Contemporary Crafts</Link></li>
              <li><Link href="#artforms" className="hover:text-[#FBF9F4] transition-colors">Tactile Wellness</Link></li>
              <li><Link href="#artisans" className="hover:text-[#FBF9F4] transition-colors">Artisan Network</Link></li>
            </ul>
          </div>

          {/* Navigation Col 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FBF9F4]">
              Institutional
            </h4>
            <ul className="space-y-2.5 text-xs text-[#968A80]">
              <li><Link href="#experiences" className="hover:text-[#FBF9F4] transition-colors">Schools & Colleges</Link></li>
              <li><Link href="#experiences" className="hover:text-[#FBF9F4] transition-colors">Corporates & Teams</Link></li>
              <li><Link href="#experiences" className="hover:text-[#FBF9F4] transition-colors">Hospitality & Luxury</Link></li>
              <li><Link href="#partnerships" className="hover:text-[#FBF9F4] transition-colors">CSR & Partnerships</Link></li>
            </ul>
          </div>

          {/* Locations & Presence */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FBF9F4]">
              Presence
            </h4>
            <p className="text-xs text-[#968A80] leading-relaxed font-light">
              7 Active Cities across India: Jaipur, Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, Goa.
            </p>
            <div className="pt-2">
              <Link
                href="#enquiry"
                className="inline-block text-xs uppercase tracking-[0.18em] text-[#D99B26] hover:underline"
              >
                Plan a Program →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-[#968A80]">
          <p>© {new Date().getFullYear()} Kiiro Cultural Platform. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] uppercase tracking-wider">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Sanity Content Lake</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

