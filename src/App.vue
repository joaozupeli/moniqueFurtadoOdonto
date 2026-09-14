<template>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>

  <div class="progress" aria-hidden="true">
    <span class="progress__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>

  <AppHeader />

  <main id="conteudo">
    <RouterView v-slot="{ Component }">
      <Transition
        name="page"
        mode="out-in"
        @before-enter="onPageBeforeIn"
        @after-enter="onPageIn"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <AppFooter />
  <FloatingWhatsApp />

  <div class="grain" aria-hidden="true" />
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Lenis from 'lenis'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp.vue'
import { gsap, ScrollTrigger, revealOrphans, scheduleRefresh } from './animations/motion'
import {
  jumpToTop,
  scrollToTarget,
  setLenis,
} from './animations/smoothScroll'

const progress = ref(0)
const router = useRouter()
const route = useRoute()

let lenis
let stopAfterEach

function updateProgress(scrollY = window.scrollY) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(scrollY / max, 1) : 0
}

function onNativeScroll() {
  updateProgress()
}

function onPageBeforeIn() {
  jumpToTop()
}

function onPageIn() {
  scheduleRefresh()
  if (route.hash) scrollToTarget(route.hash, { immediate: true })
  updateProgress()
  setTimeout(revealOrphans, 1200)
}

function tick(time) {
  lenis?.raf(time * 1000)
}

onMounted(async () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  setLenis(lenis)
  lenis.on('scroll', ScrollTrigger.update)
  lenis.on('scroll', (instance) => {
    updateProgress(instance.animatedScroll ?? instance.scroll ?? window.scrollY)
  })

  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  updateProgress()
  window.addEventListener('scroll', onNativeScroll, { passive: true })
  window.addEventListener('resize', onNativeScroll)

  stopAfterEach = router.afterEach((to, from) => {
    if (to.path === from.path && to.hash) {
      nextTick(() => scrollToTarget(to.hash))
    }
    setTimeout(revealOrphans, 1600)
  })

  if (route.hash) {
    await nextTick()
    scrollToTarget(route.hash, { immediate: true })
  }

  setTimeout(revealOrphans, 1600)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onNativeScroll)
  window.removeEventListener('resize', onNativeScroll)
  stopAfterEach?.()
  gsap.ticker.remove(tick)
  lenis?.destroy()
  setLenis(null)
  lenis = undefined
})
</script>

<style scoped>
main {
  flex: 1;
}

.skip {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 300;
  background: var(--accent);
  color: var(--ink);
  padding: 0.75rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.skip:focus {
  left: 1rem;
  top: 1rem;
}

.progress {
  position: fixed;
  inset: 0 0 auto;
  height: 2px;
  z-index: 120;
  background: transparent;
  pointer-events: none;
}

.progress__bar {
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: 0 50%;
  will-change: transform;
}

.grain {
  position: fixed;
  inset: -50%;
  z-index: 200;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 700ms steps(2) infinite;
}

@keyframes grain {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2%, 1.5%);
  }
  100% {
    transform: translate(1.5%, -1%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grain {
    animation: none;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
