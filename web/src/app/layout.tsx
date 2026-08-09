import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans">
        {children}
      </body>
    </html>
  )
}
