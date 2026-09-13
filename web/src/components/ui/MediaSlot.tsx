import Image from 'next/image'
import type { MediaAsset } from '@/content/types'

interface MediaSlotProps {
  media?: MediaAsset | null
  className?: string
  label?: string
  priority?: boolean
}

export function MediaSlot({ media, className = '', label, priority }: MediaSlotProps) {
  if (media?.type === 'video' && media.source) {
    return (
      <div className={`relative overflow-hidden bg-[#EAE3D5] ${className}`}>
        <video
          className="h-full w-full object-cover"
          poster={media.poster}
          muted
          playsInline
          controls={false}
          autoPlay
          loop
          aria-label={media.alt}
        >
          <source src={media.source} />
        </video>
      </div>
    )
  }

  if (media?.source) {
    const remote = media.source.startsWith('http')
    return (
      <div className={`relative overflow-hidden bg-[#EAE3D5] ${className}`}>
        <Image
          src={media.source}
          alt={media.alt}
          fill
          priority={priority}
          unoptimized={remote && !media.source.includes('cdn.sanity.io')}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col justify-end bg-[#EAE3D5] border border-[#E8E1D5] ${className}`}
      aria-label={label || 'Media to be supplied'}
    >
      <div className="p-5 text-[10px] uppercase tracking-[0.2em] text-[#968A80]">
        {label || 'Image forthcoming'}
      </div>
    </div>
  )
}
