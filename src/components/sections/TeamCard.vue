<template>
  <article
    class="tile"
    tabindex="0"
    role="button"
    :aria-label="`Ver perfil de ${member.name}`"
    @click="$emit('select', member)"
    @keydown.enter.prevent="$emit('select', member)"
    @keydown.space.prevent="$emit('select', member)"
  >
    <header class="tile__top">
      <span class="mono">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="mono tile__cat">
        {{ member.category === 'clinical' ? 'Clínico' : 'Administrativo' }}
      </span>
    </header>

    <div class="tile__portrait">
      <img
        v-if="member.photo"
        :src="member.photo"
        :alt="`Foto de ${member.name}, ${member.role}`"
        loading="lazy"
        width="320"
        height="380"
      />
      <span v-else class="tile__monogram" aria-hidden="true">{{ initials }}</span>
    </div>

    <footer class="tile__foot">
      <h3 class="tile__name">{{ member.name }}</h3>
      <p class="mono tile__role">{{ member.role }}</p>
      <p class="tile__tag">{{ member.tag }}</p>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  member: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

defineEmits(['select'])

const initials = computed(() => {
  const parts = props.member.name.replace(/^(Dra?\.|Dr\.)\s+/i, '').split(' ')
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase()
})
</script>

<style scoped>
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.1rem, 2.5vw, 1.6rem);
  cursor: pointer;
  background: transparent;
  transition: background 0.45s var(--ease);
}

.tile:hover,
.tile:focus-visible {
  background: var(--ink-raise);
  outline: none;
}

.tile:focus-visible {
  box-shadow: inset 0 0 0 1px var(--accent);
}

.tile__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.tile__top .mono {
  margin: 0;
  color: var(--accent);
}

.tile__cat {
  color: var(--paper-faint);
}

.tile__portrait {
  position: relative;
  aspect-ratio: 4 / 4.4;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(150deg, rgba(224, 184, 114, 0.07), transparent 60%);
}

.tile__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05);
  transition: filter 0.5s ease;
}

.tile:hover .tile__portrait img {
  filter: grayscale(0);
}

.tile__monogram {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(3rem, 7vw, 4.5rem);
  letter-spacing: -0.04em;
  color: var(--paper-faint);
  transition: color 0.45s ease;
}

.tile:hover .tile__monogram {
  color: var(--accent);
  font-style: italic;
}

.tile__foot {
  margin-top: auto;
}

.tile__name {
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  margin-bottom: 0.45rem;
}

.tile__role {
  margin: 0 0 0.6rem;
  color: var(--paper-soft);
}

.tile__tag {
  margin: 0;
  font-size: 0.9rem;
  color: var(--paper-faint);
}
</style>
