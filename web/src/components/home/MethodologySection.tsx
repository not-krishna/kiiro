import { DEFAULT_HOMEPAGE } from '@/content/homepage'
import type { MethodologyStage } from '@/content/types'

interface MethodologySectionProps {
  intro?: string
  stages?: MethodologyStage[]
}

const DEFAULT_STAGES: MethodologyStage[] = [
  {
    id: 'root',
    title: 'Root',
    heading: 'Ground. Orient. Settle.',
    body: 'A facilitated grounding practice, then the story of the craft and its lineage. Your attention shifts from racing thoughts to the present moment.',
    ledBy: 'Facilitator + Artisan',
    youFeel: 'Grounded, present',
  },
  {
    id: 'create',
    title: 'Create',
    heading: 'Hands busy. Mind quiet.',
    body: 'Guided, rhythmic making that engages your senses, paired with breath cues that support nervous-system regulation. Repetitive, tactile movement is known to ease the stress response and invite a flow state.',
    ledBy: 'Artisan + Facilitator',
    youFeel: 'Regulated, absorbed',
  },
  {
    id: 'restore',
    title: 'Restore',
    heading: 'Reflect. Integrate. Carry it home.',
    body: 'A guided group reflection gives you a way to express and process what came up, even when words fall short. Completing a piece brings a real sense of accomplishment.',
    ledBy: 'Facilitator',
    youFeel: 'Lighter, connected, accomplished',
  },
]

export function MethodologySection({ intro, stages }: MethodologySectionProps) {
  const content = DEFAULT_HOMEPAGE
  const items = stages?.length && stages[0]?.ledBy ? stages : DEFAULT_STAGES
  const visibleIntro = (!intro || intro.includes('living craft traditions directly')) ? content.methodologyIntro : intro

  return (
    <section id="methodology" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14]" data-motion-text>
            How a session unfolds
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            {visibleIntro}
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6 lg:gap-8" data-motion-stagger>
          {items.map((stage, index) => {
            const stepNum = String(index + 1).padStart(2, '0')
            const cleanTitle = stage.title.replace(/^0[1-3]\s*/, '')
            return (
              <li
                key={stage.id || stage.title}
                className="bg-[#F3EFE6] border border-[#D8CEBE] p-7 md:p-8 flex flex-col justify-between space-y-6 shadow-sm"
                data-motion-item
                data-motion-card
              >
                <div className="space-y-4">
                  {/* Top "Led by" label */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#E8E1D5] pb-3 text-xs">
                    <span className="font-mono text-sm text-[#4F5B2A] font-medium">
                      {stepNum}
                    </span>
                    {stage.ledBy && (
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#6E635B] font-medium">
                        Led by: <span className="text-[#2B231F] font-semibold">{stage.ledBy}</span>
                      </span>
                    )}
                  </div>

                  {/* Stage Title and subtitle */}
                  <div>
                    <h3 className="font-display text-2xl text-[#2B231F]">
                      {cleanTitle}
                    </h3>
                    {stage.heading && (
                      <p className="font-serif italic text-sm text-[#4F5B2A] mt-0.5">
                        ({stage.heading})
                      </p>
                    )}
                  </div>

                  {/* Body description */}
                  <p className="font-sans text-sm text-[#6E635B] font-light leading-relaxed">
                    {stage.body}
                  </p>
                </div>

                {/* Bottom "You feel" chip */}
                {stage.youFeel && (
                  <div className="pt-4 border-t border-[#E8E1D5]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAE3D5] text-[#2B231F] text-xs font-sans rounded-full">
                      <span className="text-[#6E635B] font-medium">You feel:</span>
                      <span className="font-semibold text-[#4F5B2A]">{stage.youFeel}</span>
                    </span>
                  </div>
                )}
              </li>
            )
          })}
        </ol>

        {/* Small print disclaimer below steps */}
        <p className="text-xs text-[#968A80] font-sans font-light italic max-w-3xl leading-relaxed pt-2">
          Informed by research on creative activity and wellbeing. MELD sessions support relaxation and wellbeing and are not a substitute for medical or mental health care.
        </p>
      </div>
    </section>
  )
}
