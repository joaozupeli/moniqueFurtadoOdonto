<template>
  <RouterLink :to="to" class="logo" :aria-label="`${clinic.name} — início`">
    <span class="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="1" opacity="0.4" />
        <path
          d="M16 6c-3.6 0-6.2 2.6-6.2 6.4 0 2.6 1.3 4.6 2.8 6.3.9 1 1.3 2 1.4 3.3l.3 3.9h3.4l.3-3.9c.1-1.3.5-2.3 1.4-3.3 1.5-1.7 2.8-3.7 2.8-6.3C22.2 8.6 19.6 6 16 6z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span class="logo__text">
      <span class="logo__name">{{ clinic.name }}</span>
      <span v-if="showSub" class="logo__sub mono">{{ clinic.discipline }}</span>
    </span>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { clinic } from '../../data/clinic'

defineProps({
  to: { type: String, default: '/' },
  showSub: { type: Boolean, default: true },
})
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--accent);
}

.logo__mark {
  display: flex;
  transition: transform 0.5s var(--ease);
}

.logo:hover .logo__mark {
  transform: rotate(-8deg);
}

.logo__text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  line-height: 1;
}

.logo__name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--paper);
}

.logo__sub {
  font-size: 0.5625rem;
  letter-spacing: 0.26em;
}
</style>
