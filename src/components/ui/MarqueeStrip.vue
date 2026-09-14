<template>
  <div class="marquee" role="presentation">
    <div class="marquee__track" :style="{ '--speed': `${speed}s` }">
      <div v-for="copy in 2" :key="copy" class="marquee__group" aria-hidden="true">
        <span v-for="item in items" :key="`${copy}-${item}`" class="marquee__item">
          {{ item }}
          <span class="marquee__dot">&bull;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  speed: { type: Number, default: 40 },
})
</script>

<style scoped>
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--line);
  padding-block: 1.35rem;
  user-select: none;
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: slide var(--speed) linear infinite;
}

.marquee__group {
  display: flex;
  flex-shrink: 0;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 2.5rem;
  padding-right: 2.5rem;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.2vw, 1.75rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: var(--paper-soft);
  white-space: nowrap;
}

.marquee__item:nth-child(even) {
  font-style: italic;
  color: var(--accent);
}

.marquee__dot {
  font-size: 0.5em;
  color: var(--paper-faint);
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
