<template>
  <header class="phero" ref="rootRef">
    <div class="grid-lines" aria-hidden="true" />

    <div class="shell">
      <div class="phero__meta">
        <p class="mono mono--accent">{{ eyebrow }}</p>
        <p class="mono">{{ clinic.name }} — {{ clinic.address.city }}</p>
      </div>

      <h1 class="display phero__title js-reveal" ref="titleRef">
        {{ title }}<em v-if="accent"> {{ accent }}</em>
      </h1>

      <div class="phero__foot">
        <p class="lead js-reveal" ref="leadRef">{{ lead }}</p>
        <div class="stack js-reveal" ref="actionsRef">
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { clinic } from '../../data/clinic'
import { revealLines, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  accent: { type: String, default: '' },
  lead: { type: String, default: '' },
})

const rootRef = ref(null)
const titleRef = ref(null)
const leadRef = ref(null)
const actionsRef = ref(null)

useMotion(() => {
  revealLines(titleRef.value, { scroll: false, delay: 0.1 })
  revealUp([leadRef.value, actionsRef.value], {
    scroll: false,
    y: 24,
    delay: 0.45,
    stagger: 0.1,
  })
}, rootRef)
</script>

<style scoped>
.phero {
  position: relative;
  padding-top: calc(var(--header-h) + clamp(3rem, 10vh, 7rem));
  padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
  overflow: hidden;
}

.phero__meta {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.1rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.75rem);
  border-bottom: 1px solid var(--line);
}

.phero__meta p {
  margin: 0;
}

.phero__meta p:last-child {
  text-align: right;
}

.phero__title {
  position: relative;
  margin: 0;
  max-width: 14ch;
}

.phero__foot {
  position: relative;
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: clamp(2rem, 5vw, 3.5rem);
  padding-top: clamp(1.25rem, 3vw, 2rem);
  border-top: 1px solid var(--line);
}

@media (min-width: 900px) {
  .phero__foot {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
}

.phero__foot .lead {
  max-width: 50ch;
}
</style>
