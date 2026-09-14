<template>
  <div class="page" ref="pageRef">
    <PageHero
      eyebrow="Contato"
      title="A conversa começa"
      accent="hoje."
      lead="Mande uma mensagem com o que está te incomodando. A gente responde no mesmo dia útil e já sugere um horário."
    >
      <CtaButton :href="whatsappHref" variant="wa" arrow>Abrir WhatsApp</CtaButton>
      <CtaButton to="/servicos" variant="ghost">Ver especialidades</CtaButton>
    </PageHero>

    <MarqueeStrip :items="ticker" />

    <ContactSection
      index="01"
      title="Fale com a Dra. Monique"
      subtitle="Prefira o WhatsApp para agilidade. O formulário abaixo monta a mensagem pronta para você enviar."
    />

    <section class="section visit" ref="visitRef">
      <div class="shell">
        <ChapterHeader
          index="02"
          eyebrow="Visita"
          title="Onde e quando encontrar a gente"
          note="Mercês · Curitiba"
        />

        <div class="visit__grid">
          <div class="visit__map" aria-label="Localização da clínica">
            <div class="visit__map-inner">
              <span class="mono">Mapa</span>
              <p class="visit__addr">{{ clinic.address.full }}</p>
              <span class="mono visit__note">
                Substitua por um embed do Google Maps
              </span>
            </div>
          </div>

          <ul class="visit__hours">
            <li v-for="h in clinic.hours" :key="h.days">
              <span class="mono">{{ h.days }}</span>
              <span class="visit__time">{{ h.time }}</span>
            </li>
          </ul>
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
import ContactSection from '../components/sections/ContactSection.vue'
import CtaButton from '../components/ui/CtaButton.vue'
import { clinic, ticker } from '../data/clinic'
import { useWhatsApp } from '../composables/useWhatsApp'
import { revealUp, revealStagger } from '../animations/motion'
import { useMotion } from '../composables/useMotion'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const pageRef = ref(null)
const visitRef = ref(null)

useMotion(() => {
  revealUp(visitRef.value?.querySelector('.visit__map'), { y: 30 })
  revealStagger(visitRef.value, '.visit__hours li', { y: 20, stagger: 0.08 })
}, pageRef)
</script>

<style scoped>
.visit__grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
}

@media (min-width: 900px) {
  .visit__grid {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
    align-items: start;
  }
}

.visit__map {
  border: 1px solid var(--line);
  min-height: clamp(15rem, 32vw, 22rem);
  display: grid;
  place-items: center;
  padding: 2rem;
  text-align: center;
  background-image: linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 44px 44px;
}

.visit__map-inner {
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.visit__addr {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.5vw, 1.6rem);
  font-weight: 300;
  color: var(--paper);
  max-width: 24ch;
}

.visit__note {
  color: var(--paper-faint);
}

.visit__hours {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.visit__hours li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.15rem;
  border-bottom: 1px solid var(--line);
}

.visit__time {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 300;
  color: var(--paper);
}
</style>
