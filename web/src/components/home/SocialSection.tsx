export function SocialSection() {
  const posts = [
    {
      handle: '@kiiroexperiences',
      tag: '#LivingCraft',
      caption: 'Hands covered in natural terracotta clay during yesterday’s blue pottery masterclass in Jaipur.',
    },
    {
      handle: '@kiiroexperiences',
      tag: '#ArtisanLivelihoods',
      caption: 'Master Craftsman Ramu explaining the ancestral cobalt pigment grinding process.',
    },
    {
      handle: '@kiiroexperiences',
      tag: '#CorporateWellness',
      caption: 'Screen-free team retreat: 40 corporate leaders engaging with Warli ritual canvas art.',
    },
    {
      handle: '@kiiroexperiences',
      tag: '#CulturalLiteracy',
      caption: 'Students discovering botanical dyeing chemistry using natural madder root and organic indigo.',
    },
  ]

  return (
    <section className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-6">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              Community & Dispatches • Section 09
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] mt-1">
              Curated Field Moments
            </h2>
          </div>
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#968A80]">
            Follow @kiiroexperiences
          </span>
        </div>

        {/* Rule-Divided Community Grid (No Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="space-y-4 border-l border-[#E8E1D5] pl-6 first:border-l-0 sm:first:border-l sm:nth-1:border-l-0 lg:first:border-l-0 border-t sm:border-t-0 pt-6 sm:pt-0"
            >
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
                {post.tag}
              </span>
              <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                "{post.caption}"
              </p>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#968A80] pt-2 border-t border-[#E8E1D5]">
                {post.handle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

