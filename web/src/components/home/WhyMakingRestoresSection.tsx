interface RestoreBenefit {
  number: string
  title: string
  body: string
}

const BENEFITS: RestoreBenefit[] = [
  {
    number: '01',
    title: 'Calms the nervous system',
    body: 'Rhythmic, repetitive motions like stamping, weaving, or shading help your body shift out of stress mode. Many people notice slower breathing and a softer mind within minutes.',
  },
  {
    number: '02',
    title: 'Quiets overthinking',
    body: "When you're absorbed in colour, texture, and process, there's no room left for the inner critic. This state of flow is often described as meditative.",
  },
  {
    number: '03',
    title: 'Lifts your mood',
    body: 'Finishing something with your own hands brings a real sense of accomplishment, a small, earned feeling of "I made this."',
  },
  {
    number: '04',
    title: 'Gives feelings a form',
    body: 'Some things are hard to say. Making gives emotions a place to go, without needing words.',
  },
  {
    number: '05',
    title: 'Builds belonging',
    body: 'Working side by side helps ease loneliness. Shared making builds connection faster than small talk ever does.',
  },
]

export function WhyMakingRestoresSection() {
  return (
    <section
      id="why-making-restores"
      className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10"
      aria-label="Why a creative break works better"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span
            className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold flex items-center gap-2"
            data-motion-reveal
            data-motion-distance="14"
          >
            <span className="w-1.5 h-1.5 bg-[#4F5B2A] rounded-full" />
            The Science of Hand-Making
          </span>
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14] text-[#2B231F]" data-motion-text>
            Why a creative break works better
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            A scroll isn&apos;t rest, and neither is another meeting. Making things by hand offers a different kind of break.
          </p>
        </div>

        {/* 5-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-motion-stagger>
          {BENEFITS.map((item, index) => (
            <article
              key={item.number}
              className={`bg-[#FBF9F4] border border-[#D8CEBE] p-7 md:p-8 flex flex-col justify-between space-y-5 transition-all duration-300 hover:border-[#4F5B2A] hover:shadow-sm ${
                index === 3 || index === 4 ? 'lg:col-span-1' : ''
              }`}
              data-motion-item
              data-motion-card
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#4F5B2A] font-medium block">
                  {item.number}
                </span>
                <h3 className="font-display text-xl text-[#2B231F] leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[#6E635B] font-light leading-relaxed pt-1">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Small print below cards */}
        <p className="text-xs text-[#968A80] font-sans font-light italic max-w-3xl leading-relaxed pt-2">
          Research on creative activity and wellbeing is encouraging. Kiiro sessions support relaxation and wellbeing and are not a substitute for medical or mental health care.
        </p>
      </div>
    </section>
  )
}
