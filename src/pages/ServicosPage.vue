<template>
  <div class="page" ref="pageRef">
    <PageHero
      eyebrow="Serviços"
      title="Tudo resolvido no"
      accent="mesmo lugar."
      lead="Seis especialidades sob o mesmo teto e o mesmo prontuário — você não precisa recontar sua história a cada encaminhamento."
    >
      <CtaButton :href="whatsappHref" variant="primary" arrow>
        Agendar avaliação
      </CtaButton>
      <CtaButton to="/contato" variant="ghost">Falar com a clínica</CtaButton>
    </PageHero>

    <MarqueeStrip :items="ticker" />

    <ServicesSection
      index="01"
      section-id="lista-servicos"
      title="Índice de especialidades"
      subtitle="Toque em qualquer linha para ir direto ao detalhe do tratamento."
      :show-cta="false"
    />

    <section class="section details" ref="detailsRef">
      <div class="shell">
        <ChapterHeader
          index="02"
          eyebrow="Detalhamento"
          title="Como cada frente funciona"
          note="6 especialidades"
        />

        <article
          v-for="(service, i) in services"
          :id="service.id"
          :key="service.id"
          class="detail"
        >
          <div class="detail__aside">
            <span class="detail__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="detail__icon" aria-hidden="true">
              <ServiceIcon :name="service.icon" />
            </span>
          </div>

          <div class="detail__body">
            <h3 class="detail__title">{{ service.title }}</h3>
            <p class="lead">{{ service.description }}</p>
            <p class="detail__text">{{ service.detail }}</p>

            <ul class="detail__topics">
              <li v-for="topic in service.topics" :key="topic" class="mono">
                {{ topic }}
              </li>
            </ul>

            <CtaButton :href="serviceWhatsApp(service.title)" variant="wa" arrow>
              Agendar {{ service.title }}
            </CtaButton>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHero from '../components/ui/PageHero.vue'
import ChapterHeader from '../components/ui/ChapterHeader.vue'
import MarqueeStrip from '../components/ui/MarqueeStrip.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import ServiceIcon from '../components/ui/ServiceIcon.vue'
import CtaButton from '../components/ui/CtaButton.vue'
import { clinic, services, ticker } from '../data/clinic'
import { useWhatsApp } from '../composables/useWhatsApp'
import { revealStagger } from '../animations/motion'
import { useMotion } from '../composables/useMotion'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

function serviceWhatsApp(title) {
  return useWhatsApp(
    clinic.whatsapp,
    `${clinic.whatsappDefaultMessage}\n\nTenho interesse em: ${title}`,
  ).href
}

const pageRef = ref(null)
const detailsRef = ref(null)

useMotion(() => {
  revealStagger(detailsRef.value, '.detail', { y: 34, stagger: 0.06 })
}, pageRef)
</script>

<style scoped>
.detail {
  display: grid;
  gap: clamp(1.25rem, 4vw, 3rem);
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-top: 1px solid var(--line);
  scroll-margin-top: calc(var(--header-h) + 2rem);
}

.detail:last-child {
  border-bottom: 1px solid var(--line);
}

@media (min-width: 900px) {
  .detail {
    grid-template-columns: minmax(0, 0.32fr) minmax(0, 1fr);
  }
}

.detail__aside {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .detail__aside {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    position: sticky;
    top: calc(var(--header-h) + 2rem);
    align-self: start;
  }
}

.detail__num {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--accent);
}

.detail__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--accent);
}

.detail__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 300;
  margin-bottom: 1rem;
}

.detail__body .lead {
  margin-bottom: 1rem;
  color: var(--paper);
  max-width: 44ch;
}

.detail__text {
  max-width: 60ch;
  margin-bottom: 1.75rem;
}

.detail__topics {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 2rem;
  padding: 0;
}

.detail__topics li {
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--paper-soft);
}
</style>
