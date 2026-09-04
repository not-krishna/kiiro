'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#2B231F] text-[#FBF9F4] p-8 md:hidden overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#3D332E] pb-6">
        <Link href="/" onClick={onClose} className="group">
          <span className="font-sans text-xl font-bold tracking-[0.25em] uppercase text-[#FBF9F4]">
            KIIRO
          </span>
          <span className="block text-[9px] tracking-[0.3em] uppercase text-[#968A80] font-sans mt-0.5">
            Living Cultural Platform
          </span>
        </Link>

        <button
          onClick={onClose}
          className="p-2 text-[#968A80] hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#C2593F]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-5 py-8 font-sans text-lg md:text-xl uppercase tracking-[0.15em] font-light">
        <Link href="/artforms" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Artforms
        </Link>
        <Link href="/experiences" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Experiences
        </Link>
        <Link href="/artisans" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Artisans & Impact
        </Link>
        <Link href="/weekly-events" onClick={onClose} className="text-[#C2593F] hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Weekly Events
        </Link>
        <Link href="/partnerships-csr" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Partnerships & CSR
        </Link>
        <Link href="/journal" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Journal
        </Link>
        <Link href="/about" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          About Us
        </Link>
        <Link href="/enquire" onClick={onClose} className="hover:text-[#D99B26] transition-colors border-b border-[#3D332E] pb-2.5">
          Enquiries
        </Link>
      </nav>

      {/* Footer CTA */}
      <div className="border-t border-[#3D332E] pt-8 space-y-4 font-sans">
        <Link
          href="/enquire"
          onClick={onClose}
          className="block w-full text-center py-4 bg-[#C2593F] text-[#FBF9F4] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#A64830] transition-all"
        >
          Explore Experiences →
        </Link>
        <p className="text-center text-xs text-[#968A80] uppercase tracking-widest">
          Hands On. Rooted. Real.
        </p>
      </div>
    </div>
  )
}

