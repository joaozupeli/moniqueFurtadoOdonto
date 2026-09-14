<template>
  <div class="page">
    <HeroSection />

    <MarqueeStrip :items="ticker" />

    <AboutSection index="01" section-id="a-clinica" />

    <ServicesSection index="02" :limit="6" />

    <TeamSection index="03" :limit="4" />

    <TestimonialsSection index="04" />

    <ContactSection index="05" />
  </div>
</template>

<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import TeamSection from '../components/sections/TeamSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import MarqueeStrip from '../components/ui/MarqueeStrip.vue'
import { ticker } from '../data/clinic'
</script>
