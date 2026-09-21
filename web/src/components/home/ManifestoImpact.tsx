import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { cleanVisibleCopy } from '@/lib/copy'

interface ManifestoImpactProps {
  manifestoTitle?: string
  manifestoText?: string
}

export function ManifestoImpact({ manifestoTitle, manifestoText }: ManifestoImpactProps) {
  const title = cleanVisibleCopy(
    manifestoTitle ||
      'We believe culture is not something to preserve behind glass. It is something to learn, make, share and carry forward.'
  )
  const text = cleanVisibleCopy(
    manifestoText ||
      'Kiiro connects heritage craft traditions directly to participants, ensuring cultural knowledge lives on through hands-on learning and sustained artisan livelihoods.'
  )

  const stats = [
    { value: '800+', label: 'Workshops', context: 'Across major Indian hubs' },
    { value: '10,000+', label: 'Participants', context: 'Hands-on learners' },
    { value: '7', label: 'Cities', context: 'Active programming footprint' },
    { value: '15+', label: 'Corporate teams', context: 'Wellness and retreat formats' },
    { value: '10+', label: 'Resorts', context: 'Guest programming formats' },
  ]

  return (
    <section id="about" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5]">
      <div className="relative py-20 md:py-28 px-6 md:px-10 border-b border-[#E8E1D5] overflow-hidden bg-[#F3EFE6]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="hidden md:block w-full h-full object-cover opacity-35 saturate-[0.95] contrast-[1.05]"
          >
            <source src="/assets/bg-vdo-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#F3EFE6]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14] text-[#2B231F]">
            {title}
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed max-w-2xl mx-auto">
            {text}
          </p>
        </div>
      </div>

      <div className="py-16 md:py-20 px-6 md:px-10 bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-8">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <AnimatedNumber
                  value={stat.value}
                  className="block font-display text-fluid-4xl font-normal text-[#2B231F] leading-none"
                />
                <div>
                  <h3 className="font-sans text-sm font-medium text-[#2B231F]">
                    {stat.label}
                  </h3>
                  <p className="font-sans text-sm text-[#6E635B] font-light mt-0.5">
                    {stat.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

