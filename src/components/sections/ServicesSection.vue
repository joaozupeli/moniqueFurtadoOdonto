<template>
  <section class="services section" :id="sectionId" ref="rootRef">
    <div class="shell">
      <ChapterHeader
        :index="index"
        eyebrow="Especialidades"
        :title="title"
        :subtitle="subtitle"
        :note="`${servicesList.length} frentes`"
      />

      <div class="services__list" ref="listRef">
        <RouterLink
          v-for="(service, i) in servicesList"
          :key="service.id"
          class="row"
          :to="{ path: '/servicos', hash: `#${service.id}` }"
        >
          <span class="row__fill" aria-hidden="true" />

          <span class="row__num mono">{{ String(i + 1).padStart(2, '0') }}</span>

          <span class="row__head">
            <span class="row__icon" aria-hidden="true">
              <ServiceIcon :name="service.icon" />
            </span>
            <span class="row__title">{{ service.title }}</span>
          </span>

          <span class="row__desc">{{ service.description }}</span>

          <span class="row__topics mono">{{ service.topics.slice(0, 2).join(' · ') }}</span>

          <span class="row__arrow" aria-hidden="true">
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
        </RouterLink>
      </div>

      <div v-if="showCta" class="stack services__cta js-reveal" ref="ctaRef">
        <CtaButton to="/servicos" variant="ghost">Todas as especialidades</CtaButton>
        <CtaButton :href="whatsappHref" variant="primary" arrow>
          Agendar avaliação
        </CtaButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ChapterHeader from '../ui/ChapterHeader.vue'
import CtaButton from '../ui/CtaButton.vue'
import ServiceIcon from '../ui/ServiceIcon.vue'
import { clinic, services } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { revealStagger, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

const props = defineProps({
  sectionId: { type: String, default: 'servicos' },
  index: { type: String, default: '02' },
  title: { type: String, default: 'O que resolvemos aqui dentro' },
  subtitle: {
    type: String,
    default:
      'Seis frentes que cobrem do check-up anual à reabilitação completa — todas conduzidas pelo mesmo time, no mesmo lugar.',
  },
  limit: { type: Number, default: 0 },
  showCta: { type: Boolean, default: true },
})

const servicesList = computed(() =>
  props.limit > 0 ? services.slice(0, props.limit) : services,
)

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const rootRef = ref(null)
const listRef = ref(null)
const ctaRef = ref(null)

useMotion(() => {
  revealStagger(listRef.value, '.row', { y: 30, stagger: 0.07 })
  revealUp(ctaRef.value, { y: 20 })
}, rootRef)
</script>

<style scoped>
.services__list {
  border-top: 1px solid var(--line);
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-template-areas:
    'num head arrow'
    '.   desc desc'
    '.   topics topics';
  align-items: center;
  gap: 0.35rem clamp(0.85rem, 2.5vw, 2rem);
  padding: clamp(1.35rem, 3vw, 2.1rem) clamp(0.75rem, 2vw, 1.5rem);
  border-bottom: 1px solid var(--line);
  isolation: isolate;
}

/* Preenchimento que varre da esquerda no hover.
   Fica num filho para não competir com o transform do GSAP na .row */
.row__fill {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--paper);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.55s var(--ease);
}

.row:hover .row__fill,
.row:focus-visible .row__fill {
  transform: scaleX(1);
}

.row__num {
  grid-area: num;
  color: var(--accent);
  transition: color 0.35s ease;
}

.row__head {
  grid-area: head;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  min-width: 0;
}

.row__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--paper-soft);
  transition: color 0.35s ease, border-color 0.35s ease;
}

.row__icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.row__title {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.5rem, 4.2vw, 2.6rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--paper);
  transition: color 0.35s ease;
}

.row__desc {
  grid-area: desc;
  color: var(--paper-soft);
  font-size: 0.95rem;
  max-width: 52ch;
  transition: color 0.35s ease;
}

.row__topics {
  grid-area: topics;
  transition: color 0.35s ease;
}

.row__arrow {
  grid-area: arrow;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  color: var(--paper);
  flex-shrink: 0;
  transition: color 0.35s ease, border-color 0.35s ease, transform 0.45s var(--ease);
}

.row:hover .row__arrow {
  transform: translate(3px, -3px);
}

/* Inversão do texto quando o preenchimento claro cobre a linha */
.row:hover .row__title,
.row:hover .row__desc,
.row:hover .row__num,
.row:hover .row__topics,
.row:hover .row__arrow,
.row:hover .row__icon {
  color: var(--ink);
}

.row:hover .row__title {
  font-style: italic;
}

.row:hover .row__arrow,
.row:hover .row__icon {
  border-color: rgba(8, 16, 14, 0.3);
}

@media (min-width: 1024px) {
  .row {
    grid-template-columns: auto minmax(0, 1.05fr) minmax(0, 0.95fr) auto;
    grid-template-areas: 'num head desc arrow';
    gap: clamp(1rem, 3vw, 3rem);
  }

  .row__topics {
    display: none;
  }
}

.services__cta {
  margin-top: clamp(2.5rem, 5vw, 4rem);
}
</style>
