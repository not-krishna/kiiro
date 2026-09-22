'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PRIMARY_NAV, SITE_TAGLINE } from '@/content/navigation'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

function cleanHref(href: string) {
  return href.split('?')[0]
}

function matchesPath(pathname: string, href: string) {
  const path = cleanHref(href)
  return pathname === path || (path !== '/' && pathname.startsWith(`${path}/`))
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const currentGroup = PRIMARY_NAV.find((item) =>
      item.children?.some((child) => matchesPath(pathname, child.href))
    )
    setOpenGroup(currentGroup?.label || null)
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, pathname])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#2B231F] text-[#FBF9F4] p-8 lg:hidden overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div className="flex items-center justify-between border-b border-[#3D332E] pb-6">
        <Link href="/" onClick={onClose} className="group">
          <span className="font-sans text-[1.6rem] font-bold tracking-[0.18em] uppercase text-[#FBF9F4] leading-none block">KIIRO</span>
          <span className="block text-[12px] tracking-normal normal-case text-[#968A80] font-sans mt-0.5">
            {SITE_TAGLINE}
          </span>
        </Link>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="min-h-11 min-w-11 p-2 text-[#968A80] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col py-6 font-sans text-[15px] font-medium tracking-[0.06em] uppercase">
        {PRIMARY_NAV.map((item) => {
          if (item.cta) {
            const active = matchesPath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="mt-6 block w-full text-center py-3.5 bg-[#C2593F] text-[#FBF9F4] text-[14px] font-medium tracking-[0.06em] uppercase hover:bg-[#A64830] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          }

          if (!item.children?.length) {
            const active = matchesPath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`border-b border-[#3D332E] py-3 hover:text-[#D99B26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26] ${
                  active ? 'text-[#D99B26]' : ''
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          }

          const expanded = openGroup === item.label
          const groupActive = matchesPath(pathname, item.href) || Boolean(item.children.some((child) => matchesPath(pathname, child.href)))
          return (
            <div key={item.label} className="border-b border-[#3D332E]">
              <button
                type="button"
                className={`flex w-full items-center justify-between py-3 text-left tracking-[0.06em] uppercase hover:text-[#D99B26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26] ${
                  groupActive ? 'text-[#D99B26]' : ''
                }`}
                aria-expanded={expanded}
                onClick={() => setOpenGroup(expanded ? null : item.label)}
              >
                {item.label}
                <span aria-hidden className="text-lg leading-none">{expanded ? '−' : '+'}</span>
              </button>
              {expanded && (
                <div className="pb-3.5 space-y-2.5">
                  {item.children.map((child) => {
                    const childActive = matchesPath(pathname, child.href)
                    return (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        onClick={onClose}
                        className={`block pl-1 text-sm tracking-[0.06em] uppercase hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26] ${
                          childActive ? 'text-white' : 'text-[#D8CEBE]'
                        }`}
                        aria-current={childActive ? 'page' : undefined}
                      >
                        <span className="block text-[14.5px] text-[#FBF9F4]">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 block text-[13px] leading-relaxed text-[#968A80] normal-case tracking-normal">{child.description}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
