import React from 'react'

interface PortableTextBlock {
  _type: string
  style?: string
  children?: { text?: string }[]
}

interface PortableTextRendererProps {
  value?: PortableTextBlock[] | string
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null

  if (typeof value === 'string') {
    return <p className="leading-relaxed text-[#4A4036] font-light my-4">{value}</p>
  }

  if (!Array.isArray(value)) return null

  return (
    <div className="prose prose-stone max-w-none text-[#4A4036] font-light leading-relaxed space-y-6">
      {value.map((block: PortableTextBlock, idx: number) => {
        if (block._type === 'block') {
          const text = block.children?.map((child) => child.text || '').join('') || ''
          const style = block.style || 'normal'

          if (style === 'h2') {
            return (
              <h2 key={idx} className="font-serif text-2xl md:text-3xl font-normal text-[#2B231F] pt-4 pb-2">
                {text}
              </h2>
            )
          }

          if (style === 'h3') {
            return (
              <h3 key={idx} className="font-serif text-xl md:text-2xl font-normal text-[#2B231F] pt-3 pb-1">
                {text}
              </h3>
            )
          }

          if (style === 'blockquote') {
            return (
              <blockquote key={idx} className="border-l-2 border-[#C2593F] pl-6 py-2 my-6 italic text-[#2B231F] font-serif text-lg bg-[#F3EDE2]/50 rounded-r-lg">
                &quot;{text}&quot;
              </blockquote>
            )
          }

          return (
            <p key={idx} className="text-base md:text-lg leading-relaxed text-[#4A4036]">
              {text}
            </p>
          )
        }

        return null
      })}
    </div>
  )
}
