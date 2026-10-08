const ADVISORS = [
  { name: 'Dr. T Kundu', initials: 'TK' },
  { name: 'Dr. Shalini Purohit', initials: 'SP' },
  { name: 'Dr. Hrishikesh Jadav', initials: 'HJ' },
  { name: 'Dr. Sanjay Pandey', initials: 'SP' },
  { name: 'Dr. Sham Pahelpakar', initials: 'SP' },
  { name: 'Dr. Sourabh Awati', initials: 'SA' },
]

export function AdvisorySection() {
  return (
    <section
      id="advisory"
      className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10"
      aria-label="Our Distinguished Advisory"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 border-b border-[#E8E1D5] pb-8">
          <span
            className="text-xs uppercase tracking-[0.25em] text-[#4F5B2A] font-semibold flex items-center gap-2"
            data-motion-reveal
            data-motion-distance="14"
          >
            <span className="w-1.5 h-1.5 bg-[#4F5B2A] rounded-full" />
            Advisors & Partners
          </span>
          <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]" data-motion-text>
            Our Distinguished Advisory
          </h2>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6" data-motion-stagger>
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.name}
              className="bg-[#F3EFE6] border border-[#D8CEBE] p-6 flex flex-col items-center text-center justify-between space-y-4 shadow-sm hover:border-[#4F5B2A] transition-all duration-300"
              data-motion-item
              data-motion-card
            >
              <div className="w-16 h-16 rounded-none bg-[#EAE3D5] border border-[#D8CEBE] flex items-center justify-center text-[#4F5B2A] font-display font-medium text-lg shadow-inner">
                {advisor.initials}
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-base md:text-lg text-[#2B231F] font-normal leading-snug">
                  {advisor.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
