import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

ScrollTrigger.config({ ignoreMobileResize: true })

const START = 'top 85%'

export function reducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function toEls(input) {
  if (!input) return []
  return gsap.utils.toArray(input).filter(Boolean)
}

let ready
export function whenReady() {
  if (!ready) {
    const fonts =
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.ready
        : Promise.resolve()
    ready = fonts.then(
      () => new Promise((resolve) => requestAnimationFrame(resolve)),
    )
  }
  return ready
}

export function revealOrphans(root = document) {
  root.querySelectorAll('.js-reveal').forEach((el) => {
    if (!el.style.visibility) el.style.visibility = 'visible'
  })
}

let refreshQueued = false
export function scheduleRefresh() {
  if (refreshQueued) return
  refreshQueued = true
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      refreshQueued = false
      ScrollTrigger.refresh()
    })
  })
}

export function revealUp(targets, options = {}) {
  const els = toEls(targets)
  if (!els.length) return null

  if (reducedMotion()) {
    gsap.set(els, { autoAlpha: 1, y: 0 })
    return null
  }

  const {
    y = 48,
    duration = 1.35,
    stagger = 0.1,
    delay = 0,
    start = START,
    ease = 'expo.out',
    trigger,
    scroll = true,
  } = options

  return gsap.fromTo(
    els,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      overwrite: 'auto',
      scrollTrigger: scroll
        ? { trigger: trigger || els[0], start, once: true }
        : undefined,
    },
  )
}

export function revealStagger(container, selector, options = {}) {
  if (!container) return null
  const children = container.querySelectorAll(selector)
  if (!children.length) return null
  return revealUp(children, { trigger: container, ...options })
}

export function revealLines(target, options = {}) {
  const el = toEls(target)[0]
  if (!el) return null

  if (reducedMotion()) {
    gsap.set(el, { autoAlpha: 1, y: 0 })
    return null
  }

  const {
    duration = 1.45,
    stagger = 0.12,
    delay = 0,
    start = START,
    trigger,
    scroll = true,
  } = options

  let lines
  try {
    lines = new SplitText(el, { type: 'lines', mask: 'lines' }).lines
  } catch {
    return revealUp(el, { y: 24, duration, delay, start, trigger })
  }
  if (!lines?.length) return revealUp(el, { y: 24, duration, delay, start, trigger })

  gsap.set(el, { autoAlpha: 1 })

  return gsap.fromTo(
    lines,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration,
      stagger,
      delay,
      ease: 'expo.out',
      scrollTrigger: scroll ? { trigger: trigger || el, start, once: true } : undefined,
    },
  )
}

export function countTo(el, endValue, options = {}) {
  if (!el) return null
  const { duration = 1.8, decimals = 0 } = options
  const format = (v) =>
    decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('pt-BR')

  if (reducedMotion()) {
    el.textContent = format(endValue)
    return null
  }

  const state = { value: 0 }
  return gsap.fromTo(
    state,
    { value: 0 },
    {
      value: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = format(state.value)
      },
    },
  )
}

export function parallax(target, options = {}) {
  const el = toEls(target)[0]
  if (!el || reducedMotion()) return null

  const {
    from = -60,
    to = 60,
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.1,
  } = options

  return gsap.fromTo(
    el,
    { y: from },
    {
      y: to,
      ease: 'none',
      scrollTrigger: { trigger: trigger || el, start, end, scrub },
    },
  )
}

export { gsap, ScrollTrigger, SplitText }
