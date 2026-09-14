<template>
  <a
    class="fab"
    :class="{ 'is-visible': visible }"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
  >
    <span class="fab__icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="19" height="19">
        <path
          fill="currentColor"
          d="M16.01 3C9.4 3 4 8.35 4 14.9c0 2.1.56 4.14 1.63 5.95L4 29l8.4-2.2a12.2 12.2 0 0 0 3.61.54c6.61 0 12.01-5.35 12.01-11.9S22.62 3 16.01 3zm0 21.7c-1.15 0-2.28-.3-3.27-.86l-.23-.13-4.98 1.3 1.33-4.85-.15-.25a9.6 9.6 0 0 1-1.47-5.1c0-5.3 4.37-9.6 9.76-9.6 5.4 0 9.77 4.3 9.77 9.6 0 5.3-4.38 9.6-9.76 9.6zm5.36-7.2c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.16-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46s1.07 2.86 1.22 3.05c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.73-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z"
        />
      </svg>
    </span>
    <span class="fab__label mono">WhatsApp</span>
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'

const { href } = useWhatsApp(clinic.whatsapp, clinic.whatsappDefaultMessage)

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 320
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.fab {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: 105;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-height: var(--tap-min);
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  color: var(--paper);
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.5s var(--ease),
    border-color 0.3s ease, background 0.3s ease;
}

.fab.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.fab:hover {
  border-color: var(--wa);
  background: rgba(37, 211, 102, 0.12);
}

.fab__icon {
  display: grid;
  place-items: center;
  color: var(--wa);
}

.fab__label {
  color: inherit;
}

@media (max-width: 480px) {
  .fab__label {
    display: none;
  }

  .fab {
    padding: 0.85rem;
  }
}
</style>
