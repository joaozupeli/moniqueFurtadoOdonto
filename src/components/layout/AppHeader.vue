<template>
  <header class="header" :class="{ 'is-solid': scrolled, 'is-open': menuOpen }">
    <div class="header__inner shell">
      <Logo />

      <nav class="header__nav" aria-label="Navegação principal">
        <RouterLink
          v-for="(link, i) in links"
          :key="link.to"
          :to="link.to"
          class="header__link mono"
        >
          <span class="header__num">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header__right">
        <p class="header__status mono">
          <span class="header__dot" aria-hidden="true" />
          Agenda aberta
        </p>
        <CtaButton class="header__cta" :href="whatsappHref" variant="primary">
          Agendar
        </CtaButton>
        <button
          class="header__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="menu-mobile"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <span /><span />
        </button>
      </div>
    </div>

    <div id="menu-mobile" class="drawer" :class="{ 'is-open': menuOpen }">
      <nav class="drawer__nav shell" aria-label="Navegação mobile">
        <RouterLink
          v-for="(link, i) in links"
          :key="link.to"
          :to="link.to"
          class="drawer__link"
        >
          <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="drawer__label">{{ link.label }}</span>
        </RouterLink>
      </nav>

      <div class="drawer__foot shell">
        <div>
          <p class="mono">WhatsApp</p>
          <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
            {{ clinic.whatsappDisplay }}
          </a>
        </div>
        <div>
          <p class="mono">Endereço</p>
          <p class="drawer__addr">{{ clinic.address.full }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Logo from '../ui/Logo.vue'
import CtaButton from '../ui/CtaButton.vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { lockScroll, unlockScroll } from '../../animations/smoothScroll'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'A clínica' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/contato', label: 'Contato' },
]

const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

function onScroll() {
  scrolled.value = window.scrollY > 24
}

watch(menuOpen, (open) => {
  if (open) lockScroll()
  else unlockScroll()
})

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  unlockScroll()
})
</script>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 110;
  transition: background 0.4s ease, border-color 0.4s ease;
  border-bottom: 1px solid transparent;
}

.header.is-solid {
  background: rgba(250, 248, 245, 0.92);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.header.is-open {
  background: var(--ink);
  border-bottom-color: var(--line);
}

.header__inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.header__nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

.header__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--paper-soft);
  transition: color 0.3s ease;
}

.header__num {
  color: var(--paper-faint);
  font-size: 0.5625rem;
  transition: color 0.3s ease;
}

.header__link:hover,
.header__link.router-link-active {
  color: var(--paper);
}

.header__link.router-link-active .header__num {
  color: var(--accent);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header__status {
  display: none;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.header__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 0 rgba(196, 165, 116, 0.6);
  animation: ping 2.4s ease-out infinite;
}

@keyframes ping {
  50% {
    box-shadow: 0 0 0 6px rgba(196, 165, 116, 0);
  }
}

.header__cta {
  display: none;
}

.header__burger {
  width: var(--tap-min);
  height: var(--tap-min);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.header__burger span {
  display: block;
  width: 24px;
  height: 1px;
  background: var(--paper);
  transition: transform 0.35s var(--ease), opacity 0.25s ease;
}

.header.is-open .header__burger span:first-child {
  transform: translateY(3.5px) rotate(45deg);
}

.header.is-open .header__burger span:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}

/* Menu mobile em tela cheia */
.drawer {
  position: fixed;
  inset: var(--header-h) 0 0;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: clamp(2rem, 8vh, 4rem);
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  pointer-events: none;
  transition: clip-path 0.6s var(--ease), opacity 0.3s ease;
}

.drawer.is-open {
  clip-path: inset(0 0 0 0);
  opacity: 1;
  pointer-events: auto;
  overflow-y: auto;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
}

.drawer__link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-block: clamp(0.6rem, 2.2vh, 1.1rem);
  border-bottom: 1px solid var(--line);
  color: var(--paper);
}

.drawer__link .mono {
  color: var(--paper-faint);
}

.drawer__link.router-link-active .mono {
  color: var(--accent);
}

.drawer__label {
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.drawer__link.router-link-active .drawer__label {
  font-style: italic;
  color: var(--accent);
}

.drawer__foot {
  display: grid;
  gap: 1.5rem;
  padding-top: 2rem;
}

.drawer__foot p {
  margin: 0 0 0.35rem;
}

.drawer__foot a {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--paper);
}

.drawer__addr {
  color: var(--paper-soft);
  font-size: 0.95rem;
}

@media (min-width: 600px) {
  .drawer__foot {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .header__nav,
  .header__status,
  .header__cta {
    display: flex;
  }

  .header__burger,
  .drawer {
    display: none;
  }
}
</style>
