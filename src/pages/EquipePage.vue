<template>
  <div class="page">
    <PageHero
      eyebrow="Equipe"
      title="Gente com nome, não"
      accent="plantão."
      lead="Você é atendido pelas mesmas pessoas do início ao fim do tratamento — inclusive na recepção e no financeiro."
    >
      <CtaButton :href="whatsappHref" variant="primary" arrow>
        Agendar avaliação
      </CtaButton>
      <CtaButton to="/contato" variant="ghost">Falar com a clínica</CtaButton>
    </PageHero>

    <MarqueeStrip :items="ticker" />

    <TeamSection
      index="01"
      section-id="time-completo"
      title="O time completo"
      subtitle="Filtre por área e abra a ficha de cada pessoa para ver formação, especialidades e um contato direto."
      :show-cta="false"
    />
  </div>
</template>

<script setup>
import PageHero from '../components/ui/PageHero.vue'
import MarqueeStrip from '../components/ui/MarqueeStrip.vue'
import TeamSection from '../components/sections/TeamSection.vue'
import CtaButton from '../components/ui/CtaButton.vue'
import { clinic, ticker } from '../data/clinic'
import { useWhatsApp } from '../composables/useWhatsApp'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)
</script>
