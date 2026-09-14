<template>
  <section class="quotes section" ref="rootRef">
    <div class="grid-lines" aria-hidden="true" />

    <div class="shell">
      <ChapterHeader
        :index="index"
        eyebrow="Depoimentos"
        title="Na palavra de quem sentou na cadeira"
        note="Relatos reais"
      />

      <div
        class="quotes__stage js-reveal"
        ref="stageRef"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <p class="quotes__mark" aria-hidden="true">&ldquo;</p>

        <Transition :name="transitionName" mode="out-in">
          <figure :key="current.id" class="quotes__item">
            <blockquote>{{ current.text }}</blockquote>
            <figcaption>
              <span class="quotes__name">{{ current.name }}</span>
              <span class="mono">
                {{ current.treatment }} · {{ current.year }} ·
                {{ current.rating }}/5
              </span>
            </figcaption>
          </figure>
        </Transition>
      </div>

      <div class="quotes__bar">
        <p class="mono quotes__count">
          <span class="quotes__now">{{ String(index0 + 1).padStart(2, '0') }}</span>
          <span class="quotes__sep">/</span>
          {{ String(testimonials.length).padStart(2, '0') }}
        </p>

        <div class="quotes__nav">
          <button type="button" class="mono" aria-label="Depoimento anterior" @click="go(-1)">
            ← Anterior
          </button>
          <button type="button" class="mono" aria-label="Próximo depoimento" @click="go(1)">
            Próximo →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ChapterHeader from '../ui/ChapterHeader.vue'
import { testimonials } from '../../data/clinic'
import { reducedMotion, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

defineProps({
  index: { type: String, default: '04' },
})

const rootRef = ref(null)
const stageRef = ref(null)

const index0 = ref(0)
const paused = ref(false)
const direction = ref(1)
let timer
let touchX = 0

const current = computed(() => testimonials[index0.value])
const transitionName = computed(() =>
  direction.value > 0 ? 'quote-next' : 'quote-prev',
)

function go(step) {
  direction.value = step
  index0.value = (index0.value + step + testimonials.length) % testimonials.length
}

function onTouchStart(event) {
  touchX = event.changedTouches[0].clientX
  paused.value = true
}

function onTouchEnd(event) {
  const delta = event.changedTouches[0].clientX - touchX
  if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1)
  paused.value = false
}

useMotion(() => {
  revealUp(stageRef.value, { y: 30 })
}, rootRef)

onMounted(() => {
  if (reducedMotion()) return
  timer = setInterval(() => {
    if (!paused.value) go(1)
  }, 6500)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.quotes {
  position: relative;
}

.quotes__stage {
  position: relative;
  min-height: clamp(16rem, 34vw, 22rem);
  padding-top: clamp(1rem, 3vw, 2rem);
}

.quotes__mark {
  position: absolute;
  top: -0.35em;
  left: -0.06em;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(9rem, 24vw, 18rem);
  line-height: 1;
  color: var(--accent);
  opacity: 0.13;
  pointer-events: none;
  user-select: none;
}

.quotes__item {
  position: relative;
  margin: 0;
  max-width: min(100%, 34rem);
}

@media (min-width: 900px) {
  .quotes__item {
    max-width: min(100%, 46rem);
    margin-left: auto;
    margin-right: 0;
  }
}

.quotes__item blockquote {
  margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.16;
  letter-spacing: -0.03em;
  color: var(--paper);
}

.quotes__item figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 1.15rem;
  border-top: 1px solid var(--line);
  max-width: 26rem;
}

.quotes__name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--paper);
}

.quotes__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.quotes__count {
  margin: 0;
  font-size: 0.8125rem;
}

.quotes__now {
  color: var(--accent);
}

.quotes__sep {
  margin-inline: 0.4rem;
  opacity: 0.5;
}

.quotes__nav {
  display: flex;
  gap: 0.5rem;
}

.quotes__nav button {
  min-height: var(--tap-min);
  padding: 0.5rem 1.1rem;
  background: transparent;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--paper-soft);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.quotes__nav button:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Troca de citação: a nova entra do lado para onde o usuário foi */
.quote-next-enter-active,
.quote-next-leave-active,
.quote-prev-enter-active,
.quote-prev-leave-active {
  transition: opacity 0.4s ease, transform 0.5s var(--ease);
}

.quote-next-enter-from {
  opacity: 0;
  transform: translateX(28px);
}

.quote-next-leave-to {
  opacity: 0;
  transform: translateX(-28px);
}

.quote-prev-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}

.quote-prev-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

@media (prefers-reduced-motion: reduce) {
  .quote-next-enter-active,
  .quote-next-leave-active,
  .quote-prev-enter-active,
  .quote-prev-leave-active {
    transition: none;
  }
}
</style>
