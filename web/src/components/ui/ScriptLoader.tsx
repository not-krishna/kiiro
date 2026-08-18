'use client'

import { useEffect, useState } from 'react'

interface ScriptCharacter {
  char: string
  script: string
  lang: string
}

const SCRIPT_SEQUENCE: ScriptCharacter[] = [
  { char: 'क', script: 'Devanagari', lang: 'Hindi • Sanskrit • Marathi' },
  { char: 'ক', script: 'Bengali', lang: 'Bangla • Assamese' },
  { char: 'க', script: 'Tamil', lang: 'Tamil' },
  { char: 'క', script: 'Telugu', lang: 'Telugu' },
  { char: 'ಕ', script: 'Kannada', lang: 'Kannada' },
  { char: 'ക', script: 'Malayalam', lang: 'Malayalam' },
  { char: 'ક', script: 'Gujarati', lang: 'Gujarati' },
  { char: 'ਕ', script: 'Gurmukhi', lang: 'Punjabi' },
  { char: 'କ', script: 'Odia', lang: 'Odia' },
  { char: 'ک', script: 'Urdu', lang: 'Urdu • Perso-Arabic' },
  { char: 'K', script: 'Latin', lang: 'Heritage • Mastery • Livelihood' },
]

export function ScriptLoader() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Check session storage to run only once per session
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('kiiro_script_loader_seen')
      if (hasLoaded) {
        return // Skip loader on subsequent views in the same session
      }
      setShouldRender(true)
    }
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    // Rapid cycle through script characters (~110ms per step)
    const stepInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < SCRIPT_SEQUENCE.length - 1) {
          return prev + 1
        }
        clearInterval(stepInterval)
        return prev
      })
    }, 110)

    // Capped total duration before initiating smooth fade out (~1.65 seconds total)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 1650)

    // Complete dissolve out and mark session loaded
    const doneTimer = setTimeout(() => {
      setIsDone(true)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kiiro_script_loader_seen', 'true')
      }
    }, 2250)

    return () => {
      clearInterval(stepInterval)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [shouldRender])

  if (!shouldRender || isDone) {
    return null
  }

  const currentItem = SCRIPT_SEQUENCE[currentIndex]
  const isFinal = currentIndex === SCRIPT_SEQUENCE.length - 1

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#FBF9F4] text-[#2B231F] p-8 md:p-12 transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-busy="true"
      aria-label="Loading Kiiro Experience"
    >
      {/* Top Header Branding */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#968A80]">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2593F] animate-pulse" />
          <span>KIIRO CULTURAL PLATFORM</span>
        </div>
        <span className="hidden sm:inline tracking-[0.2em] text-[#B87B1E]">
          LIVING CRAFT TRADITIONS
        </span>
      </div>

      {/* Main Center Glyph & Script Container */}
      <div className="flex flex-col items-center justify-center my-auto space-y-8 text-center max-w-lg w-full">
        {/* Character Display Stage */}
        <div className="relative h-40 md:h-52 w-full flex items-center justify-center">
          {isFinal ? (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center space-y-3">
              <span className="font-display text-fluid-4xl font-normal tracking-[0.15em] text-[#2B231F] leading-none">
                KIIRO
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C2593F] font-semibold">
                Living Cultural Platform
              </span>
            </div>
          ) : (
            <div
              key={currentIndex}
              className="animate-in fade-in zoom-in-90 duration-100 flex flex-col items-center justify-center"
            >
              <span className="font-serif text-7xl md:text-9xl text-[#C2593F] leading-none drop-shadow-sm transition-all">
                {currentItem.char}
              </span>
            </div>
          )}
        </div>

        {/* Script & Language Info Label */}
        <div className="h-12 flex flex-col items-center justify-center space-y-1">
          {!isFinal && (
            <>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#2B231F]">
                {currentItem.script} Script
              </span>
              <span className="font-sans text-[11px] text-[#968A80] font-light tracking-wider">
                {currentItem.lang}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar & Script Count Indicator */}
      <div className="w-full max-w-md space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-[#968A80] uppercase tracking-widest">
          <span>10 Script Lineages</span>
          <span>{Math.round(((currentIndex + 1) / SCRIPT_SEQUENCE.length) * 100)}%</span>
        </div>
        <div className="w-full h-[2px] bg-[#E8E1D5] overflow-hidden relative">
          <div
            className="h-full bg-[#C2593F] transition-all duration-100 ease-linear"
            style={{
              width: `${((currentIndex + 1) / SCRIPT_SEQUENCE.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
