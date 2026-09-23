'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'
import { LocationBar } from './LocationBar'
import { PRIMARY_NAV, SITE_TAGLINE } from '@/content/navigation'
import type { NavItem } from '@/content/types'

function cleanHref(href: string) {
  return href.split('?')[0]
}

function matchesPath(pathname: string, href: string) {
  const path = cleanHref(href)
  return pathname === path || (path !== '/' && pathname.startsWith(`${path}/`))
}

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const active = matchesPath(pathname, item.href) || Boolean(item.children?.some((child) => matchesPath(pathname, child.href)))
  const triggerClass = `hover:text-[#4F5B2A] transition-colors py-1.5 whitespace-nowrap text-[13.5px] leading-none tracking-[0.06em] uppercase font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] ${
    active ? 'text-[#4F5B2A] font-semibold' : 'text-[#6E635B]'
  }`

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className={triggerClass}
        aria-current={active ? 'page' : undefined}
        data-nav-motion
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="relative" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 ${triggerClass}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        data-nav-motion
      >
        {item.label}
        <svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor">
          <path d="M3 4.5 6 7.5 9 4.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          id={id}
          role="menu"
          className="absolute left-0 top-full z-50 w-[22rem] border border-[#E8E1D5] bg-[#FBF9F4] py-3 shadow-sm"
        >
          {item.children.map((child) => {
            const childActive = matchesPath(pathname, child.href)
            return (
              <Link
                key={child.href + child.label}
                href={child.href}
                role="menuitem"
                className={`block px-5 py-2.5 focus-visible:outline-none ${
                  childActive ? 'bg-[#F3EFE6] text-[#4F5B2A]' : 'hover:bg-[#F3EFE6] hover:text-[#4F5B2A] focus-visible:bg-[#F3EFE6]'
                }`}
                aria-current={childActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="block text-[13.5px] font-medium tracking-[0.06em] uppercase text-[#2B231F]">{child.label}</span>
                {child.description && (
                  <span className="mt-0.5 block font-sans text-[13px] font-normal normal-case tracking-normal text-[#6E635B] leading-relaxed">
                    {child.description}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F4]" data-site-header>
        <div className="border-b border-[#E8E1D5]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-[4.125rem] flex items-center justify-between gap-6">
            <Link href="/" className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] py-1 shrink-0" data-nav-motion>
              <span className="font-sans text-[1.55rem] font-bold tracking-[0.18em] uppercase text-[#2B231F] group-hover:text-[#4F5B2A] transition-colors leading-none block">
                KIIRO
              </span>
              <span className="block text-[11px] tracking-normal normal-case text-[#6E635B] font-sans mt-0.5 max-w-[16rem] leading-snug">
                {SITE_TAGLINE}
              </span>
            </Link>

            <nav
              className="hidden lg:flex items-center gap-4 xl:gap-5.5 font-sans text-[#6E635B]"
              aria-label="Primary"
            >
              {PRIMARY_NAV.map((item) =>
                item.cta ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="kiiro-cta bg-[#2B231F] text-white px-4 py-2 text-[13.5px] font-medium tracking-[0.06em] uppercase hover:bg-[#4F5B2A] transition-colors ml-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
                    aria-current={matchesPath(pathname, item.href) ? 'page' : undefined}
                    data-nav-motion
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" data-cta-arrow>&rarr;</span>
                  </Link>
                ) : (
                  <DesktopDropdown key={item.label} item={item} pathname={pathname} />
                )
              )}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-h-11 min-w-11 p-2 text-[#2B231F] hover:text-[#4F5B2A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
              aria-label="Open navigation menu"
              data-nav-motion
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <LocationBar />
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
