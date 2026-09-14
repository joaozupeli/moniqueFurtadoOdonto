<template>
  <header class="chapter" ref="rootRef">
    <hr class="rule" />
    <div class="chapter__meta">
      <p class="mono mono--accent">
        <span v-if="index">{{ index }}</span>
        <span v-if="index" class="chapter__slash">/</span>
        {{ eyebrow }}
      </p>
      <p v-if="note" class="mono chapter__note">{{ note }}</p>
    </div>

    <div class="chapter__body" :class="{ 'chapter__body--wide': !subtitle }">
      <h2 class="title-lg js-reveal" ref="titleRef">{{ title }}</h2>
      <p v-if="subtitle" class="lead js-reveal" ref="subRef">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { revealLines, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  note: { type: String, default: '' },
})

const rootRef = ref(null)
const titleRef = ref(null)
const subRef = ref(null)

useMotion(() => {
  revealLines(titleRef.value, { trigger: rootRef.value })
  revealUp(subRef.value, { trigger: rootRef.value, y: 22, delay: 0.15 })
}, rootRef)
</script>

<style scoped>
.chapter {
  margin-bottom: clamp(2.5rem, 6vw, 5rem);
}

.chapter__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1rem;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.chapter__meta p {
  margin: 0;
}

.chapter__slash {
  margin-inline: 0.5rem;
  opacity: 0.5;
}

.chapter__note {
  text-align: right;
}

.chapter__body {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
}

@media (min-width: 900px) {
  .chapter__body {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: end;
  }

  .chapter__body--wide {
    grid-template-columns: minmax(0, 1fr);
  }
}

.chapter__body h2 {
  max-width: 16ch;
}

.chapter__body .lead {
  max-width: 46ch;
}
</style>
