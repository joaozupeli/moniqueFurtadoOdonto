<template>
  <div class="page" ref="pageRef">
    <PageHero
      eyebrow="A clínica"
      title="Uma clínica construída ao"
      accent="contrário."
      lead="Começamos pelo diagnóstico e pelo orçamento fechado, e só depois falamos de tratamento. Parece óbvio — mas é o oposto do que a maioria faz."
    >
      <CtaButton :href="whatsappHref" variant="primary" arrow>
        Agendar avaliação
      </CtaButton>
      <CtaButton to="/equipe" variant="ghost">Conhecer o time</CtaButton>
    </PageHero>

    <MarqueeStrip :items="ticker" />

    <AboutSection
      index="01"
      section-id="sobre"
      title="Método antes de aparelho"
      subtitle="Tecnologia sozinha não resolve. O que muda o resultado é ter um processo escrito e alguém responsável por ele do começo ao fim."
      :show-cta="false"
    />

    <section class="section values" ref="valuesRef">
      <div class="shell">
        <ChapterHeader
          index="02"
          eyebrow="Direção"
          title="No que a gente não abre mão"
          note="Missão · Visão · Valores"
        />

        <div class="values__grid">
          <article v-for="(item, i) in values" :key="item.title">
            <span class="mono values__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="title-md">{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHero from '../components/ui/PageHero.vue'
import ChapterHeader from '../components/ui/ChapterHeader.vue'
import MarqueeStrip from '../components/ui/MarqueeStrip.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import CtaButton from '../components/ui/CtaButton.vue'
import { clinic, ticker } from '../data/clinic'
import { useWhatsApp } from '../composables/useWhatsApp'
import { revealStagger } from '../animations/motion'
import { useMotion } from '../composables/useMotion'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const values = [
  {
    title: 'Missão',
    text: 'Entregar odontologia previsível: você sabe o que vai ser feito, quanto custa e quanto tempo leva antes de começar.',
  },
  {
    title: 'Visão',
    text: 'Ser a clínica de Mercês, Curitiba, onde o paciente indica sem precisar ser perguntado — porque a experiência inteira funcionou.',
  },
  {
    title: 'Valores',
    text: 'Ética clínica acima de venda, transparência no orçamento e respeito ao tempo de quem está sentado na cadeira.',
  },
]

const pageRef = ref(null)
const valuesRef = ref(null)

useMotion(() => {
  revealStagger(valuesRef.value, '.values__grid article', { y: 30, stagger: 0.1 })
}, pageRef)
</script>

<style scoped>
.values__grid {
  display: grid;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

@media (min-width: 900px) {
  .values__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.values__grid article {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.values__num {
  display: block;
  color: var(--accent);
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.values__grid h3 {
  margin-bottom: 0.85rem;
}

.values__grid p {
  margin: 0;
  max-width: 40ch;
}
</style>
