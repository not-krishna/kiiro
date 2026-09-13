import { DEFAULT_HOMEPAGE } from '@/content/homepage'
import type { MethodologyStage } from '@/content/types'

interface MethodologySectionProps {
  intro?: string
  stages?: MethodologyStage[]
}

export function MethodologySection({ intro, stages }: MethodologySectionProps) {
  const content = DEFAULT_HOMEPAGE
  const items = stages?.length ? stages : content.methodologyStages

  return (
    <section id="methodology" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center space-x-3 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            <span className="w-1.5 h-1.5 bg-[#C2593F]" />
            <span>The Kiiro method</span>
          </div>
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14]">How a session unfolds</h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed">
            {intro || content.methodologyIntro}
          </p>
        </div>

        <ol className="grid md:grid-cols-3 border-t border-[#D8CEBE]">
          {items.map((stage, index) => (
            <li
              key={stage.id || stage.title}
              className={`py-10 md:py-14 md:px-10 ${index === 0 ? 'md:pl-0' : ''} ${
                index < items.length - 1 ? 'md:border-r border-[#D8CEBE]' : ''
              } border-b md:border-b-0 border-[#D8CEBE]`}
            >
              <p className="font-mono text-xs font-bold text-[#C2593F] tracking-wider mb-6">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-fluid-2xl text-[#2B231F] mb-3">{stage.title}</h3>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E635B] mb-4">
                {stage.heading}
              </p>
              <p className="font-sans text-sm text-[#6E635B] font-light leading-relaxed">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
