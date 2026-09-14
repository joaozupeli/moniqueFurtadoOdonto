<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="member"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <div class="modal__backdrop" @click="$emit('close')" />

        <div class="modal__panel" ref="panelRef" tabindex="-1">
          <button class="modal__close" type="button" aria-label="Fechar" @click="$emit('close')">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <aside class="modal__aside">
            <div class="modal__portrait">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="`Foto de ${member.name}`"
                width="320"
                height="380"
              />
              <span v-else class="modal__monogram" aria-hidden="true">{{ initials }}</span>
            </div>
            <p class="mono modal__tag">{{ member.tag }}</p>
          </aside>

          <div class="modal__content">
            <p class="mono mono--accent">{{ member.role }}</p>
            <h2 :id="titleId" class="title-md modal__name">{{ member.name }}</h2>
            <p class="modal__bio">{{ member.bio }}</p>

            <dl class="modal__facts">
              <div>
                <dt class="mono">Formação</dt>
                <dd>{{ member.formation }}</dd>
              </div>
              <div>
                <dt class="mono">Especialidades</dt>
                <dd>{{ member.specialties.join(' · ') }}</dd>
              </div>
              <div>
                <dt class="mono">Fora da cadeira</dt>
                <dd>{{ member.funFact }}</dd>
              </div>
            </dl>

            <CtaButton
              v-if="member.showWhatsApp"
              :href="memberWhatsApp"
              variant="wa"
              block
              arrow
            >
              Falar com {{ firstName }}
            </CtaButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick, onUnmounted } from 'vue'
import CtaButton from '../ui/CtaButton.vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { lockScroll, unlockScroll } from '../../animations/smoothScroll'

const props = defineProps({
  member: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const titleId = 'team-modal-title'
const panelRef = ref(null)

const cleanName = (name) => name.replace(/^(Dra?\.|Dr\.)\s+/i, '')

const initials = computed(() => {
  if (!props.member) return ''
  const parts = cleanName(props.member.name).split(' ')
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase()
})

const firstName = computed(() =>
  props.member ? cleanName(props.member.name).split(' ')[0] : '',
)

const memberWhatsApp = computed(() => {
  if (!props.member) return '#'
  const message = `Olá! Gostaria de falar com ${props.member.name}. ${clinic.whatsappDefaultMessage}`
  return useWhatsApp(clinic.whatsapp, message).href
})

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.member,
  async (value) => {
    if (value) lockScroll()
    else unlockScroll()
    if (value) {
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      panelRef.value?.focus()
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onUnmounted(() => {
  unlockScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 210;
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 3vw, 2rem);
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 6, 0.82);
  backdrop-filter: blur(6px);
}

.modal__panel {
  position: relative;
  width: min(100%, 940px);
  max-height: min(92vh, 780px);
  overflow: auto;
  background: var(--ink-raise);
  border: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr;
}

.modal__panel:focus {
  outline: none;
}

@media (min-width: 820px) {
  .modal__panel {
    grid-template-columns: 0.8fr 1.2fr;
  }
}

.modal__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  width: var(--tap-min);
  height: var(--tap-min);
  display: grid;
  place-items: center;
  background: var(--ink);
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--paper);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.modal__close:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.modal__aside {
  padding: clamp(1.25rem, 3vw, 2rem);
  border-bottom: 1px solid var(--line);
}

@media (min-width: 820px) {
  .modal__aside {
    border-bottom: 0;
    border-right: 1px solid var(--line);
  }
}

.modal__portrait {
  aspect-ratio: 4 / 4.4;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(150deg, rgba(224, 184, 114, 0.08), transparent 60%);
  margin-bottom: 1rem;
}

.modal__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal__monogram {
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(3.5rem, 9vw, 5rem);
  color: var(--accent);
  letter-spacing: -0.04em;
}

.modal__tag {
  margin: 0;
}

.modal__content {
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
}

.modal__content > .mono {
  margin: 0 0 0.6rem;
}

.modal__name {
  margin-bottom: 1rem;
}

.modal__bio {
  margin-bottom: 2rem;
  max-width: 52ch;
}

.modal__facts {
  margin: 0 0 2rem;
  display: grid;
  gap: 1.15rem;
  border-top: 1px solid var(--line);
  padding-top: 1.5rem;
}

.modal__facts dt {
  margin-bottom: 0.3rem;
}

.modal__facts dd {
  margin: 0;
  color: var(--paper-soft);
  font-size: 0.97rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal__panel {
  transition: transform 0.45s var(--ease);
}

.modal-enter-from .modal__panel {
  transform: translateY(18px);
}
</style>
