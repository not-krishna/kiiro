'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8E1D5] bg-[#FBF9F4]/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group focus:outline-none focus:ring-1 focus:ring-[#C2593F] py-1">
            <span className="font-sans text-xl font-bold tracking-[0.25em] uppercase text-[#2B231F] group-hover:text-[#C2593F] transition-colors">
              KIIRO
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-[#968A80] font-sans mt-0.5">
              Living Cultural Platform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans text-[11px] font-semibold tracking-[0.15em] xl:tracking-[0.18em] uppercase text-[#6E635B]">
            <Link href="#about" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              About Us
            </Link>
            <Link href="#artforms" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              Artforms
            </Link>
            <Link href="#experiences" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              Experiences
            </Link>
            <Link href="#artisans" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              Artisans & Impact
            </Link>
            <Link href="#events" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap text-[#C2593F]">
              Weekly Events
            </Link>
            <Link href="#partnerships" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              Partnerships
            </Link>
            <Link href="#journal" className="hover:text-[#2B231F] border-b-2 border-transparent hover:border-[#C2593F] transition-all py-2 whitespace-nowrap">
              Journal
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#2B231F] hover:text-[#C2593F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C2593F]"
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

