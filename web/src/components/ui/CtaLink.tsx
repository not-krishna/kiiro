import Link from 'next/link'
import type { Cta } from '@/content/types'

const base =
  'kiiro-cta inline-flex items-center justify-center px-7 py-3.5 font-sans text-[15px] font-medium tracking-normal normal-case transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]'

const variants = {
  primary: 'bg-[#C2593F] text-white hover:bg-[#A84A33]',
  secondary: 'border border-[#2B231F] text-[#2B231F] bg-transparent hover:bg-[#2B231F] hover:text-[#FBF9F4]',
  ghost: 'text-[#2B231F] border-b-2 border-[#2B231F] px-0 py-1 rounded-none hover:text-[#C2593F] hover:border-[#C2593F]',
}

interface CtaLinkProps {
  cta: Cta
  variant?: keyof typeof variants
  className?: string
}

export function CtaLink({ cta, variant = 'primary', className = '' }: CtaLinkProps) {
  if (!cta || !cta.href) return null
  const classes = `${base} ${variants[variant]} ${className}`
  const href = cta.href || '#'
  const external = cta.kind === 'external' || href.startsWith('http')

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        <span>{cta.label}</span>
        <span aria-hidden="true" data-cta-arrow>&rarr;</span>
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      <span>{cta.label}</span>
      <span aria-hidden="true" data-cta-arrow>&rarr;</span>
    </Link>
  )
}
