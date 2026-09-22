'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { KIIRO_MOTION } from '@/lib/motion/tokens'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function toArray<T extends Element>(root: ParentNode, selector: string) {
  return Array.from(root.querySelectorAll<T>(selector))
}

function splitWords(element: HTMLElement) {
  if (element.dataset.kiiroSplit === 'true') return

  const text = element.textContent?.replace(/\s+/g, ' ').trim()
  if (!text) return

  element.dataset.kiiroSplit = 'true'
  element.setAttribute('aria-label', text)
  element.textContent = ''

  text.split(' ').forEach((word, index, words) => {
    const wrap = document.createElement('span')
    const inner = document.createElement('span')

    wrap.className = 'kiiro-word-wrap'
    wrap.setAttribute('aria-hidden', 'true')
    inner.className = 'kiiro-word'
    inner.textContent = word
    wrap.appendChild(inner)
    element.appendChild(wrap)

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '))
    }
  })
}

function imageClip(direction?: string) {
  if (direction === 'horizontal') return 'inset(0 100% 0 0)'
  if (direction === 'center') return 'inset(14% 14% 14% 14%)'
  if (direction === 'organic') return 'polygon(8% 10%, 92% 4%, 96% 86%, 4% 94%)'
  return 'inset(100% 0 0 0)'
}

function setupHero(root: ParentNode) {
  const hero = root.querySelector<HTMLElement>('[data-motion-hero]')
  if (!hero) return

  const firstSessionView = !sessionStorage.getItem('kiiro_script_loader_seen')
  const delay = firstSessionView ? 1.62 : 0.08
  const images = toArray<HTMLElement>(hero, '[data-hero-image]')
  const imageMedia = images.flatMap((image) => toArray<HTMLElement>(image, 'img, video'))
  const words = toArray<HTMLElement>(hero, '[data-hero-word]')
  const scrollLine = hero.querySelector<HTMLElement>('[data-hero-scroll-line]')

  gsap.set(images, { clipPath: 'inset(100% 0 0 0)' })
  gsap.set(imageMedia, { scale: KIIRO_MOTION.imageScale.reveal, transformOrigin: '50% 50%' })
  gsap.set(words, { yPercent: 105, autoAlpha: 0 })

  const timeline = gsap.timeline({
    delay,
    defaults: { ease: KIIRO_MOTION.ease.reveal },
  })

  timeline
    .to(images, {
      clipPath: 'inset(0% 0 0 0)',
      duration: KIIRO_MOTION.duration.image,
      stagger: 0.12,
    })
    .to(
      imageMedia,
      {
        scale: 1,
        duration: KIIRO_MOTION.duration.hero,
        stagger: 0.08,
      },
      '<'
    )
    .fromTo(
      hero.querySelectorAll('[data-hero-eyebrow]'),
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.62 },
      0.18
    )
    .to(
      words,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: KIIRO_MOTION.duration.text,
        stagger: KIIRO_MOTION.stagger.word,
      },
      0.32
    )
    .fromTo(
      hero.querySelectorAll('[data-hero-copy]'),
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: KIIRO_MOTION.duration.reveal },
      0.54
    )
    .fromTo(
      hero.querySelectorAll('[data-hero-cta]'),
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.07 },
      0.7
    )
    .fromTo(
      hero.querySelectorAll('[data-hero-meta]'),
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.64, stagger: 0.08 },
      0.86
    )

  if (scrollLine) {
    gsap.to(scrollLine, {
      scaleY: 0.35,
      transformOrigin: 'top center',
      duration: 1.35,
      ease: KIIRO_MOTION.ease.calm,
      repeat: -1,
      yoyo: true,
      delay: delay + 1.1,
    })
  }
}

function setupTextReveals(root: ParentNode) {
  toArray<HTMLElement>(root, '[data-motion-text]').forEach((heading) => {
    splitWords(heading)
    const words = toArray<HTMLElement>(heading, '.kiiro-word')
    if (!words.length || heading.closest('[data-motion-hero]')) return

    gsap.fromTo(
      words,
      { yPercent: 105, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: KIIRO_MOTION.duration.text,
        stagger: KIIRO_MOTION.stagger.word,
        ease: KIIRO_MOTION.ease.reveal,
        scrollTrigger: {
          trigger: heading,
          start: KIIRO_MOTION.scroll.revealStart,
          once: true,
        },
      }
    )
  })
}

function setupPageHeroes(root: ParentNode) {
  const hero = root.querySelector<HTMLElement>('main > section:first-child:not([data-motion-hero])')
  if (!hero) return

  const eyebrow = hero.querySelector<HTMLElement>('span')
  const heading = hero.querySelector<HTMLElement>('h1')
  const copy = hero.querySelector<HTMLElement>('p')
  const media = hero.querySelector<HTMLElement>('img, video')
  const ctas = toArray<HTMLElement>(hero, 'a, button')

  if (heading) splitWords(heading)
  const words = heading ? toArray<HTMLElement>(heading, '.kiiro-word') : []

  if (media) {
    const mediaParent = media.parentElement
    if (mediaParent) {
      gsap.set(mediaParent, { clipPath: 'inset(100% 0 0 0)' })
      gsap.set(media, { scale: KIIRO_MOTION.imageScale.reveal })
    }
  }

  const timeline = gsap.timeline({
    defaults: { ease: KIIRO_MOTION.ease.reveal },
    delay: 0.06,
  })

  if (media?.parentElement) {
    timeline
      .to(media.parentElement, { clipPath: 'inset(0% 0 0 0)', duration: KIIRO_MOTION.duration.image }, 0)
      .to(media, { scale: 1, duration: KIIRO_MOTION.duration.hero }, 0)
  }

  if (eyebrow) {
    timeline.fromTo(eyebrow, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.58 }, 0.08)
  }

  if (words.length) {
    timeline.fromTo(
      words,
      { yPercent: 105, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: KIIRO_MOTION.duration.text,
        stagger: KIIRO_MOTION.stagger.word,
      },
      0.18
    )
  }

  if (copy) {
    timeline.fromTo(copy, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.68 }, 0.4)
  }

  if (ctas.length) {
    timeline.fromTo(ctas, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.58, stagger: 0.06 }, 0.52)
  }
}

function setupGenericSections(root: ParentNode) {
  toArray<HTMLElement>(root, 'main > section:not(:first-child)').forEach((section) => {
    if (section.querySelector('[data-motion-text], [data-motion-reveal], [data-motion-stagger], [data-motion-image]')) return

    const heading = section.querySelector<HTMLElement>('h2, h3')
    const intro = section.querySelector<HTMLElement>('p')
    const cards = toArray<HTMLElement>(
      section,
      'article, li, [class*="bg-white"][class*="border"], [class*="bg-[#F3"][class*="border"]'
    ).slice(0, 12)

    if (heading) {
      splitWords(heading)
      const words = toArray<HTMLElement>(heading, '.kiiro-word')
      if (words.length) {
        gsap.fromTo(
          words,
          { yPercent: 105, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: KIIRO_MOTION.duration.text,
            stagger: KIIRO_MOTION.stagger.word,
            ease: KIIRO_MOTION.ease.reveal,
            scrollTrigger: {
              trigger: heading,
              start: KIIRO_MOTION.scroll.revealStart,
              once: true,
            },
          }
        )
      }
    }

    if (intro) {
      gsap.fromTo(
        intro,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.64,
          ease: KIIRO_MOTION.ease.reveal,
          scrollTrigger: {
            trigger: intro,
            start: KIIRO_MOTION.scroll.revealStart,
            once: true,
          },
        }
      )
    }

    if (cards.length > 1) {
      gsap.fromTo(
        cards,
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: KIIRO_MOTION.duration.reveal,
          stagger: 0.06,
          ease: KIIRO_MOTION.ease.reveal,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }
  })
}

function setupReveals(root: ParentNode) {
  toArray<HTMLElement>(root, '[data-motion-reveal]').forEach((element) => {
    if (element.closest('[data-motion-hero]')) return

    gsap.fromTo(
      element,
      { y: Number(element.dataset.motionDistance || KIIRO_MOTION.distance.reveal), autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: KIIRO_MOTION.duration.reveal,
        ease: KIIRO_MOTION.ease.reveal,
        scrollTrigger: {
          trigger: element,
          start: KIIRO_MOTION.scroll.revealStart,
          once: true,
        },
      }
    )
  })

  toArray<HTMLElement>(root, '[data-motion-stagger]').forEach((container) => {
    const items = toArray<HTMLElement>(container, '[data-motion-item]')
    if (!items.length) return

    gsap.fromTo(
      items,
      { y: KIIRO_MOTION.distance.card, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: KIIRO_MOTION.duration.reveal,
        stagger: KIIRO_MOTION.stagger.card,
        ease: KIIRO_MOTION.ease.reveal,
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      }
    )
  })
}

function setupImageReveals(root: ParentNode) {
  toArray<HTMLElement>(root, '[data-motion-image]').forEach((shell) => {
    if (shell.closest('[data-motion-hero]')) return

    const direction = shell.dataset.motionImage
    const media = shell.querySelector<HTMLElement>('img, video')
    const fromClip = imageClip(direction)
    const toClip = direction === 'organic' ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'inset(0% 0 0 0)'

    gsap.set(shell, { clipPath: fromClip })
    if (media) {
      gsap.set(media, {
        scale: direction === 'organic' ? 1.05 : KIIRO_MOTION.imageScale.reveal,
        transformOrigin: '50% 50%',
      })
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: shell,
        start: KIIRO_MOTION.scroll.imageStart,
        once: true,
      },
    })

    timeline.to(shell, {
      clipPath: toClip,
      duration: direction === 'organic' ? 1.28 : KIIRO_MOTION.duration.image,
      ease: KIIRO_MOTION.ease.image,
    })

    if (media) {
      timeline.to(
        media,
        {
          scale: 1,
          duration: KIIRO_MOTION.duration.hero,
          ease: KIIRO_MOTION.ease.image,
        },
        '<'
      )
    }
  })
}

function setupParallax(root: ParentNode, mm: gsap.MatchMedia) {
  mm.add('(min-width: 768px)', () => {
    toArray<HTMLElement>(root, '[data-parallax]').forEach((element) => {
      const strength = Number(element.dataset.parallax || -8)
      const trigger = element.closest<HTMLElement>('[data-parallax-container]') || element

      gsap.to(element, {
        yPercent: strength,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    })
  })
}

function setupHorizontalStories(root: ParentNode, mm: gsap.MatchMedia) {
  mm.add('(min-width: 1024px)', () => {
    toArray<HTMLElement>(root, '[data-motion-horizontal]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-motion-horizontal-track]')
      if (!track) return

      const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth)
      if (maxScroll() < 96) return

      const proxy = { x: track.scrollLeft }

      gsap.to(proxy, {
        x: () => maxScroll(),
        ease: 'none',
        onUpdate: () => {
          track.scrollLeft = proxy.x
        },
        scrollTrigger: {
          trigger: section,
          start: 'top top+=72',
          end: () => `+=${Math.min(maxScroll() * 1.1, window.innerHeight * 1.35)}`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  })
}

function setupPinnedStories(root: ParentNode, mm: gsap.MatchMedia) {
  mm.add('(min-width: 1024px)', () => {
    toArray<HTMLElement>(root, '[data-motion-pinned-story]').forEach((story) => {
      const bg = story.querySelector<HTMLElement>('[data-story-bg]')
      const copy = toArray<HTMLElement>(story, '[data-story-copy]')

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top top+=72',
          end: '+=68%',
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
        },
      })

      if (bg) {
        timeline.to(bg, { scale: 1.045, yPercent: -4, ease: 'none' }, 0)
      }

      if (copy.length) {
        timeline.to(copy, { y: -18, autoAlpha: 0.94, ease: 'none' }, 0)
      }
    })
  })
}

function setupNavigation(root: ParentNode) {
  const header = root.querySelector<HTMLElement>('[data-site-header]')
  if (!header) return () => undefined

  const navItems = toArray<HTMLElement>(header, '[data-nav-motion]')
  gsap.fromTo(
    navItems,
    { y: -12, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.58,
      stagger: 0.045,
      ease: KIIRO_MOTION.ease.reveal,
      delay: sessionStorage.getItem('kiiro_script_loader_seen') ? 0.05 : 1.72,
    }
  )

  ScrollTrigger.create({
    start: 48,
    end: 999999,
    onEnter: () => header.classList.add('kiiro-nav-scrolled'),
    onLeaveBack: () => header.classList.remove('kiiro-nav-scrolled'),
  })

  return () => header.classList.remove('kiiro-nav-scrolled')
}

function setupCardHover(root: HTMLElement) {
  const animateCard = (card: HTMLElement, entering: boolean) => {
    const media = card.querySelector<HTMLElement>('img, video')
    const title = card.querySelector<HTMLElement>('[data-card-title]')
    const meta = card.querySelector<HTMLElement>('[data-card-meta]')
    const arrow = card.querySelector<HTMLElement>('[data-card-arrow], [data-cta-arrow]')

    if (entering) {
      gsap.to(card, { y: -4, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
      if (media) {
        gsap.to(media, { scale: KIIRO_MOTION.imageScale.hover, x: 3, duration: 0.62, ease: KIIRO_MOTION.ease.image })
      }
      if (title) gsap.to(title, { y: -3, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
      if (meta) gsap.to(meta, { autoAlpha: 0.82, duration: KIIRO_MOTION.duration.micro })
      if (arrow) gsap.to(arrow, { x: 6, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
    } else {
      gsap.to(card, { y: 0, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
      if (media) gsap.to(media, { scale: 1, x: 0, duration: 0.58, ease: KIIRO_MOTION.ease.image })
      if (title) gsap.to(title, { y: 0, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
      if (meta) gsap.to(meta, { autoAlpha: 1, duration: KIIRO_MOTION.duration.micro })
      if (arrow) gsap.to(arrow, { x: 0, duration: KIIRO_MOTION.duration.micro, ease: 'power2.out' })
    }
  }

  const closestCard = (event: Event) => (event.target as Element | null)?.closest<HTMLElement>('[data-motion-card]')

  const onMouseOver = (event: MouseEvent) => {
    if (prefersReducedMotion()) return
    const card = closestCard(event)
    if (!card || card.contains(event.relatedTarget as Node | null)) return
    animateCard(card, true)
  }

  const onMouseOut = (event: MouseEvent) => {
    const card = closestCard(event)
    if (!card || card.contains(event.relatedTarget as Node | null)) return
    animateCard(card, false)
  }

  const onFocusIn = (event: FocusEvent) => {
    if (prefersReducedMotion()) return
    const card = closestCard(event)
    if (card) animateCard(card, true)
  }

  const onFocusOut = (event: FocusEvent) => {
    const card = closestCard(event)
    if (!card || card.contains(event.relatedTarget as Node | null)) return
    animateCard(card, false)
  }

  root.addEventListener('mouseover', onMouseOver)
  root.addEventListener('mouseout', onMouseOut)
  root.addEventListener('focusin', onFocusIn)
  root.addEventListener('focusout', onFocusOut)

  return () => {
    root.removeEventListener('mouseover', onMouseOver)
    root.removeEventListener('mouseout', onMouseOut)
    root.removeEventListener('focusin', onFocusIn)
    root.removeEventListener('focusout', onFocusOut)
  }
}

function setupPageEntry(root: ParentNode) {
  const main = root.querySelector<HTMLElement>('main')
  if (!main) return

  gsap.fromTo(
    main,
    { autoAlpha: 0.98 },
    {
      autoAlpha: 1,
      duration: 0.28,
      ease: KIIRO_MOTION.ease.page,
    }
  )
}

export function SiteMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.body
    const html = document.documentElement
    const cleanupFns: Array<() => void> = []
    let mm: gsap.MatchMedia | undefined
    let context: gsap.Context | undefined
    let refresh: number | undefined

    if (prefersReducedMotion()) {
      html.classList.add('motion-reduced')
      html.classList.remove('motion-enhanced')
      return () => {
        html.classList.remove('motion-reduced')
      }
    }

    html.classList.remove('motion-reduced')

    const start = window.setTimeout(() => {
      html.classList.add('motion-enhanced')
      mm = gsap.matchMedia()
      context = gsap.context(() => {
        setupPageEntry(root)
        setupHero(root)
        setupPageHeroes(root)
        setupTextReveals(root)
        setupGenericSections(root)
        setupReveals(root)
        setupImageReveals(root)
        if (mm) {
          setupParallax(root, mm)
          setupHorizontalStories(root, mm)
          setupPinnedStories(root, mm)
        }
        cleanupFns.push(setupNavigation(root))
        cleanupFns.push(setupCardHover(root))
      }, root)

      refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    }, 80)

    return () => {
      window.clearTimeout(start)
      if (refresh) window.clearTimeout(refresh)
      cleanupFns.forEach((cleanup) => cleanup())
      mm?.revert()
      context?.revert()
      html.classList.remove('motion-enhanced')
    }
  }, [pathname])

  return null
}
