<template>
  <div class="page">
    <PageHero
      eyebrow="Erro 404"
      title="Essa página não"
      accent="existe."
      lead="O endereço que você abriu não corresponde a nenhuma página do site. Volte para o início ou fale com a gente pelo WhatsApp."
    >
      <CtaButton to="/" variant="primary" arrow>Voltar ao início</CtaButton>
      <CtaButton :href="whatsappHref" variant="ghost">Chamar no WhatsApp</CtaButton>
    </PageHero>
  </div>
</template>

<script setup>
import PageHero from '../components/ui/PageHero.vue'
import CtaButton from '../components/ui/CtaButton.vue'
import { clinic } from '../data/clinic'
import { useWhatsApp } from '../composables/useWhatsApp'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)
</script>
