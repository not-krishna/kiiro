import type { Metadata } from 'next'
import {
  Playfair_Display,
  Inter,
  Caveat,
  Noto_Sans_Devanagari,
  Noto_Sans_Bengali,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
} from 'next/font/google'
import { ScriptLoader } from '@/components/ui/ScriptLoader'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-signature',
  display: 'swap',
})

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const tamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const telugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const kannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  variable: '--font-kannada',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const malayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  variable: '--font-malayalam',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const gujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const gurmukhi = Noto_Sans_Gurmukhi({
  subsets: ['gurmukhi'],
  variable: '--font-gurmukhi',
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Kiiro Experiences — Where Heritage Meets Hands-On Learning',
  description: 'A contemporary cultural wellness platform connecting living craft traditions, master artisans, hands-on learning, and community impact.',
  openGraph: {
    title: 'Kiiro Experiences — Where Heritage Meets Hands-On Learning',
    description: 'Living craft traditions, master artisans, hands-on learning, and community impact.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} ${devanagari.variable} ${bengali.variable} ${tamil.variable} ${telugu.variable} ${kannada.variable} ${malayalam.variable} ${gujarati.variable} ${gurmukhi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans">
        <ScriptLoader />
        {children}
      </body>
    </html>
  )
}
