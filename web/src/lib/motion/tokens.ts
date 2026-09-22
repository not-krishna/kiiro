export const KIIRO_MOTION = {
  ease: {
    reveal: 'power3.out',
    image: 'power4.out',
    calm: 'sine.inOut',
    page: 'power2.inOut',
  },
  duration: {
    micro: 0.24,
    reveal: 0.78,
    text: 0.82,
    image: 1.18,
    hero: 1.24,
    page: 0.56,
  },
  stagger: {
    word: 0.045,
    item: 0.08,
    card: 0.09,
  },
  distance: {
    reveal: 36,
    text: 24,
    card: 44,
  },
  imageScale: {
    reveal: 1.08,
    hover: 1.04,
    scroll: 1.05,
  },
  scroll: {
    revealStart: 'top 84%',
    imageStart: 'top 88%',
  },
} as const
