<template>
  <section class="about section" :id="sectionId" ref="rootRef">
    <div class="shell">
      <ChapterHeader
        :index="index"
        eyebrow="A clínica"
        :title="title"
        :subtitle="subtitle"
        :note="`Est. ${clinic.established}`"
      />

      <blockquote class="about__manifesto js-reveal" ref="manifestoRef">
        {{ clinic.manifesto }}
      </blockquote>

      <ol class="about__principles" ref="principlesRef">
        <li v-for="(item, i) in clinic.principles" :key="item.title">
          <span class="mono about__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="about__ptitle">{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </li>
      </ol>

      <div class="about__stats" ref="statsRef">
        <article v-for="(stat, i) in clinic.stats" :key="stat.label">
          <p class="about__value">
            <span :ref="(el) => setStatEl(el, i)">0</span>{{ stat.suffix }}
          </p>
          <p class="mono">{{ stat.label }}</p>
        </article>
      </div>

      <div v-if="showCta" class="stack about__cta js-reveal" ref="ctaRef">
        <CtaButton :href="whatsappHref" variant="primary" arrow>
          Agendar avaliação
        </CtaButton>
        <CtaButton v-if="!isSobrePage" to="/sobre" variant="ghost">
          Conhecer a clínica
        </CtaButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ChapterHeader from '../ui/ChapterHeader.vue'
import CtaButton from '../ui/CtaButton.vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { countTo, revealLines, revealStagger, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

defineProps({
  sectionId: { type: String, default: 'a-clinica' },
  index: { type: String, default: '01' },
  title: { type: String, default: 'Diagnóstico primeiro, tratamento depois' },
  subtitle: {
    type: String,
    default:
      'Somos uma clínica de bairro com padrão de centro cirúrgico: equipamento novo, protocolo escrito e gente que atende pelo nome.',
  },
  showCta: { type: Boolean, default: true },
})

const route = useRoute()
const isSobrePage = route.name === 'sobre'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const rootRef = ref(null)
const manifestoRef = ref(null)
const principlesRef = ref(null)
const statsRef = ref(null)
const ctaRef = ref(null)
const statEls = ref([])

function setStatEl(el, i) {
  if (el) statEls.value[i] = el
}

useMotion(() => {
  revealLines(manifestoRef.value)
  revealStagger(principlesRef.value, 'li', { y: 28, stagger: 0.1 })
  revealStagger(statsRef.value, 'article', { y: 24, stagger: 0.08 })
  revealUp(ctaRef.value, { y: 20 })
  clinic.stats.forEach((stat, i) => countTo(statEls.value[i], stat.value))
}, rootRef)
</script>

<style scoped>
.about__manifesto {
  margin: 0 0 clamp(3rem, 7vw, 5.5rem);
  max-width: min(100%, 32rem);
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.6rem, 4.2vw, 3.1rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--paper);
  text-indent: 3.5em;
}

@media (min-width: 900px) {
  .about__manifesto {
    max-width: min(100%, 48rem);
    margin-left: auto;
    margin-right: 0;
  }
}

.about__principles {
  list-style: none;
  margin: 0 0 clamp(3rem, 7vw, 5.5rem);
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid var(--line);
}

.about__principles li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(1rem, 4vw, 3rem);
  padding-block: clamp(1.5rem, 3vw, 2.25rem);
  border-bottom: 1px solid var(--line);
}

@media (min-width: 900px) {
  .about__principles {
    grid-template-columns: 1fr 1fr;
    column-gap: clamp(2rem, 5vw, 5rem);
  }
}

.about__num {
  color: var(--accent);
  padding-top: 0.5rem;
}

.about__ptitle {
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  margin-bottom: 0.6rem;
  color: var(--paper);
}

.about__principles p {
  margin: 0;
  font-size: 0.97rem;
  max-width: 44ch;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

@media (min-width: 768px) {
  .about__stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.about__stats article {
  padding: clamp(1.25rem, 3vw, 2rem) clamp(0.85rem, 2vw, 1.5rem);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.about__value {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2.25rem, 6vw, 4rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--paper);
  margin-bottom: 0.75rem;
}

.about__stats .mono {
  margin: 0;
}

.about__cta {
  margin-top: clamp(2.5rem, 5vw, 4rem);
}
</style>
