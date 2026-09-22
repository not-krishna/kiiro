import Link from 'next/link'
import { HOMEPAGE_EXPERIENCES } from '@/content/homepage'

const LABELS: Record<string, string> = {
  'exp-public': 'View events',
  'exp-corporate': 'Browse the catalogue',
  'exp-hospitality': 'See hospitality programmes',
  'exp-schools': 'See school programmes',
}

export function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-[#F3EFE6] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-fluid-3xl font-normal" data-motion-text>What you can participate in</h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed" data-motion-reveal data-motion-distance="18">
            Artforms are the practices. Experiences are the sessions and programmes you actually join.
          </p>
        </div>

        <div className="grid md:grid-cols-2 border-t border-[#D8CEBE]" data-motion-stagger>
          {HOMEPAGE_EXPERIENCES.map((experience) => (
            <article key={experience.id} className="py-10 md:p-8 border-b border-[#D8CEBE] md:odd:border-r" data-motion-item data-motion-card>
              <p className="text-sm text-[#6E635B] mb-3" data-card-meta>
                {experience.audience.join(' · ')}
              </p>
              <h3 className="font-display text-fluid-xl mb-3" data-card-title>{experience.name}</h3>
              <p className="text-sm text-[#6E635B] font-light leading-relaxed mb-6">{experience.description}</p>
              <Link
                href={experience.href}
                className="kiiro-cta text-[15px] font-sans font-medium text-[#2B231F] border-b border-[#2B231F] hover:text-[#C2593F] hover:border-[#C2593F] pb-0.5"
              >
                <span>{LABELS[experience.id] || 'Continue'}</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
