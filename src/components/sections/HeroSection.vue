<template>
  <section class="hero" ref="rootRef">
    <div class="grid-lines" aria-hidden="true" />
    <div class="hero__glow" ref="glowRef" aria-hidden="true" />

    <div class="hero__inner shell">
      <div class="hero__top">
        <p class="mono">
          Est. {{ clinic.established }} — {{ clinic.address.city }},
          {{ clinic.address.state }}
        </p>
        <p class="mono hero__kicker">{{ clinic.hero.kicker }}</p>
      </div>

      <h1 class="display hero__title js-reveal" ref="titleRef">
        <span v-for="line in clinic.hero.lines" :key="line" class="hero__line">
          {{ line }}
        </span>
        <em class="hero__line">{{ clinic.hero.lineAccent }}</em>
      </h1>

      <div class="hero__bottom">
        <div class="hero__pitch">
          <p class="lead js-reveal" ref="leadRef">{{ clinic.hero.lead }}</p>
          <div class="stack js-reveal" ref="actionsRef">
            <CtaButton :href="whatsappHref" variant="primary" arrow>
              Agendar avaliação
            </CtaButton>
            <CtaButton to="/servicos" variant="ghost">Ver especialidades</CtaButton>
          </div>
        </div>

        <ul class="hero__index js-reveal" ref="indexRef">
          <li v-for="(service, i) in services.slice(0, 4)" :key="service.id">
            <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <RouterLink :to="{ path: '/servicos', hash: `#${service.id}` }">
              {{ service.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <a
      class="seal"
      :href="whatsappHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
    >
      <svg viewBox="0 0 120 120" class="seal__ring" aria-hidden="true">
        <defs>
          <path
            id="seal-path"
            d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          />
        </defs>
        <text>
          <textPath href="#seal-path">
            AGENDE SUA AVALIAÇÃO · RESPOSTA NO MESMO DIA ·
          </textPath>
        </text>
      </svg>
      <span class="seal__core" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="15" height="15">
          <path
            d="M3 13L13 3M6 3h7v7"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </a>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import CtaButton from '../ui/CtaButton.vue'
import { clinic, services } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { parallax, revealLines, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const rootRef = ref(null)
const titleRef = ref(null)
const leadRef = ref(null)
const actionsRef = ref(null)
const indexRef = ref(null)
const glowRef = ref(null)

useMotion(() => {
  // O hero já está na tela ao carregar, então toca direto (scroll: false).
  revealLines(titleRef.value, { scroll: false, delay: 0.15, stagger: 0.11 })
  revealUp([leadRef.value, actionsRef.value], {
    scroll: false,
    y: 26,
    delay: 0.55,
    stagger: 0.12,
  })
  revealUp(indexRef.value, { scroll: false, y: 26, delay: 0.75 })
  parallax(glowRef.value, { from: 0, to: 160, trigger: rootRef.value })
}, rootRef)
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-top: calc(var(--header-h) + clamp(2rem, 6vh, 4rem));
  padding-bottom: clamp(2.5rem, 6vh, 4.5rem);
  overflow: hidden;
}

.hero__glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: min(70vw, 680px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(224, 184, 114, 0.16),
    rgba(224, 184, 114, 0) 68%
  );
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vh, 2.75rem);
}

.hero__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--line);
}

.hero__top p {
  margin: 0;
}

.hero__kicker {
  color: var(--accent);
  text-align: right;
}

.hero__title {
  margin: 0;
}

.hero__line {
  display: block;
}

.hero__bottom {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  padding-top: clamp(1rem, 3vh, 2rem);
  border-top: 1px solid var(--line);
}

@media (min-width: 900px) {
  .hero__bottom {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.55fr);
    align-items: start;
  }
}

.hero__pitch .lead {
  max-width: 48ch;
  margin-bottom: 2rem;
}

.hero__index {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.1rem;
}

.hero__index li {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--line);
}

.hero__index a {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 300;
  color: var(--paper-soft);
  transition: color 0.3s ease;
}

.hero__index li:hover a {
  color: var(--accent);
  font-style: italic;
}

/* Selo circular giratório — detalhe de assinatura */
.seal {
  position: absolute;
  right: clamp(1rem, 4vw, 3.5rem);
  top: 32%;
  z-index: 2;
  width: clamp(88px, 11vw, 128px);
  aspect-ratio: 1;
  display: none;
  place-items: center;
  color: var(--paper-soft);
  transition: color 0.35s ease;
}

.seal:hover {
  color: var(--accent);
}

.seal__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: spin 26s linear infinite;
}

.seal__ring text {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.24em;
  fill: currentColor;
  text-transform: uppercase;
}

.seal__core {
  display: grid;
  place-items: center;
  width: 34%;
  aspect-ratio: 1;
  border: 1px solid currentColor;
  border-radius: 50%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .seal__ring {
    animation: none;
  }
}

@media (min-width: 768px) {
  .seal {
    display: grid;
  }
}
</style>
