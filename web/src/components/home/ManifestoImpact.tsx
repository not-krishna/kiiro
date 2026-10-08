import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { cleanVisibleCopy } from '@/lib/copy'

interface ManifestoImpactProps {
  manifestoTitle?: string
  manifestoText?: string
}

export function ManifestoImpact({ manifestoTitle, manifestoText }: ManifestoImpactProps) {
  const fallbackTitle = 'We spend our days in our heads. Kiiro brings you back to your hands.'
  const fallbackText =
    'Stress lives in the body, and so does relief. When you shade, stitch, stamp, or shape, your breathing slows and your mind finally gets a break from the noise. Add a master artisan, a centuries-old craft, and good company, and an ordinary afternoon becomes a reset.\n\nEvery Kiiro session is guided by living traditions, so your restoration also keeps a craft, and a craftsperson, alive.'

  const cleanTitle = cleanVisibleCopy(manifestoTitle || '')
  const title = (!cleanTitle || cleanTitle.includes('preserve behind glass')) ? fallbackTitle : cleanTitle

  const cleanText = cleanVisibleCopy(manifestoText || '')
  const text = (!cleanText || cleanText.includes('heritage craft traditions directly')) ? fallbackText : cleanText

  const stats = [
    { value: '800+', label: 'Workshops', context: 'Hands-on sessions across India' },
    { value: '10,000+', label: 'Participants', context: 'People who took a creative break' },
    { value: '7', label: 'Cities', context: 'Mumbai, Kolkata, Pune, Goa, Bangalore, Jaipur' },
    { value: '15+', label: 'Corporate teams', context: 'Team wellness through making' },
    { value: '10+', label: 'Resorts', context: 'Guest wellness experiences' },
  ]

  const textParagraphs = text.split('\n\n').filter(Boolean)

  return (
    <section id="about" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5]">
      {/* 1. Impact Stats Bar */}
      <div className="py-16 md:py-20 px-6 md:px-10 bg-[#FBF9F4] border-b border-[#E8E1D5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-8" data-motion-stagger>
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2 text-center flex flex-col items-center justify-center" data-motion-item>
                <AnimatedNumber
                  value={stat.value}
                  className="block font-display text-fluid-4xl font-normal text-[#2B231F] leading-none text-center"
                />
                <div className="text-center">
                  <h3 className="font-sans text-sm font-medium text-[#2B231F] text-center">
                    {stat.label}
                  </h3>
                  <p className="font-sans text-sm text-[#6E635B] font-light mt-0.5 text-center">
                    {stat.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Video Belief Manifesto Banner */}
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
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14] text-[#2B231F]" data-motion-text>
            {title}
          </h2>
          <div className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed max-w-2xl mx-auto space-y-4" data-motion-reveal data-motion-distance="18">
            {textParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
