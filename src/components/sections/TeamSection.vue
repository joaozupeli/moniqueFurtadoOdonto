<template>
  <section class="team section" :id="sectionId" ref="rootRef">
    <div class="shell">
      <ChapterHeader
        :index="index"
        eyebrow="Equipe"
        :title="title"
        :subtitle="subtitle"
        :note="`${team.length} pessoas`"
      />

      <div class="team__filters js-reveal" ref="filtersRef" role="group" aria-label="Filtrar equipe">
        <button
          v-for="option in filters"
          :key="option.value"
          type="button"
          class="chip mono"
          :class="{ 'is-active': filter === option.value }"
          :aria-pressed="filter === option.value"
          @click="filter = option.value"
        >
          {{ option.label }}
          <span class="chip__count">{{ countOf(option.value) }}</span>
        </button>
      </div>

      <div class="team__grid" ref="gridRef">
        <TeamCard
          v-for="(member, i) in visibleTeam"
          :key="member.id"
          :member="member"
          :index="i"
          @select="selected = member"
        />
      </div>

      <div v-if="showCta" class="stack team__cta js-reveal" ref="ctaRef">
        <CtaButton to="/equipe" variant="ghost">Ver time completo</CtaButton>
        <CtaButton :href="whatsappHref" variant="primary" arrow>
          Falar com a clínica
        </CtaButton>
      </div>
    </div>

    <TeamModal :member="selected" @close="selected = null" />
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import ChapterHeader from '../ui/ChapterHeader.vue'
import CtaButton from '../ui/CtaButton.vue'
import TeamCard from './TeamCard.vue'
import TeamModal from './TeamModal.vue'
import { clinic, team } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import {
  gsap,
  reducedMotion,
  revealStagger,
  revealUp,
  scheduleRefresh,
} from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

const props = defineProps({
  sectionId: { type: String, default: 'equipe' },
  index: { type: String, default: '03' },
  title: { type: String, default: 'Quem vai cuidar de você' },
  subtitle: {
    type: String,
    default:
      'Clínico e administrativo trabalham na mesma sala. Por isso a agenda, o orçamento e o tratamento falam a mesma língua.',
  },
  limit: { type: Number, default: 0 },
  showCta: { type: Boolean, default: true },
})

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'clinical', label: 'Clínico' },
  { value: 'admin', label: 'Administrativo' },
]

const filter = ref('all')
const selected = ref(null)

const rootRef = ref(null)
const gridRef = ref(null)
const filtersRef = ref(null)
const ctaRef = ref(null)

const filteredTeam = computed(() =>
  filter.value === 'all' ? team : team.filter((m) => m.category === filter.value),
)

const visibleTeam = computed(() =>
  props.limit > 0 ? filteredTeam.value.slice(0, props.limit) : filteredTeam.value,
)

function countOf(value) {
  return value === 'all'
    ? team.length
    : team.filter((m) => m.category === value).length
}

useMotion(() => {
  revealUp(filtersRef.value, { y: 18 })
  revealStagger(gridRef.value, '.tile', { y: 32, stagger: 0.07 })
  revealUp(ctaRef.value, { y: 20 })
}, rootRef)

/* Ao trocar o filtro a grade é outra: reanima e remede o scroll. */
watch(filter, async () => {
  await nextTick()
  const tiles = gridRef.value?.querySelectorAll('.tile')
  if (!tiles?.length) return
  if (!reducedMotion()) {
    gsap.fromTo(
      tiles,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
    )
  }
  scheduleRefresh()
})
</script>

<style scoped>
.team__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: var(--tap-min);
  padding: 0.5rem 1.15rem;
  background: transparent;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--paper-soft);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.chip:hover {
  color: var(--paper);
  border-color: var(--paper-faint);
}

.chip.is-active {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}

.chip__count {
  opacity: 0.55;
}

/* Filetes formam a grade: cada ficha ganha borda pelo container */
.team__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.team__grid > * {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

@media (min-width: 768px) {
  .team__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .team__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.team__cta {
  margin-top: clamp(2.5rem, 5vw, 4rem);
}
</style>
