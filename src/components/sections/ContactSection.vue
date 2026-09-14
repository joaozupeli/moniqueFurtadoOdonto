<template>
  <section class="contact section" :id="sectionId" ref="rootRef">
    <div class="shell">
      <ChapterHeader
        :index="index"
        eyebrow="Contato"
        :title="title"
        :subtitle="subtitle"
        note="Resposta no mesmo dia"
      />

      <div class="contact__grid">
        <div class="contact__info" ref="infoRef">
          <dl class="contact__list">
            <div>
              <dt class="mono">Endereço</dt>
              <dd>{{ clinic.address.full }}</dd>
            </div>
            <div>
              <dt class="mono">WhatsApp</dt>
              <dd>
                <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
                  {{ clinic.whatsappDisplay }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="mono">E-mail</dt>
              <dd><a :href="`mailto:${clinic.email}`">{{ clinic.email }}</a></dd>
            </div>
            <div>
              <dt class="mono">Horários</dt>
              <dd>
                <span v-for="h in clinic.hours" :key="h.days" class="contact__hour">
                  <span>{{ h.days }}</span>
                  <span class="contact__dots" aria-hidden="true" />
                  <span>{{ h.time }}</span>
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <form class="contact__form" ref="formRef" @submit.prevent="onSubmit">
          <label class="field">
            <span>Nome</span>
            <input v-model="form.name" type="text" name="name" required autocomplete="name" placeholder="Como devemos te chamar" />
          </label>
          <label class="field">
            <span>Telefone</span>
            <input v-model="form.phone" type="tel" name="phone" required autocomplete="tel" placeholder="(00) 00000-0000" />
          </label>
          <label class="field">
            <span>O que você precisa</span>
            <textarea v-model="form.message" name="message" rows="3" required placeholder="Descreva em poucas linhas" />
          </label>

          <div class="contact__actions">
            <CtaButton :href="formWhatsAppHref" variant="wa" block arrow>
              Enviar pelo WhatsApp
            </CtaButton>
            <CtaButton type="submit" variant="ghost" block>
              Registrar pedido de retorno
            </CtaButton>
          </div>

          <p v-if="sent" class="mono contact__sent" role="status">
            Pedido registrado neste protótipo. Para falar agora, use o WhatsApp.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import ChapterHeader from '../ui/ChapterHeader.vue'
import CtaButton from '../ui/CtaButton.vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { revealStagger, revealUp } from '../../animations/motion'
import { useMotion } from '../../composables/useMotion'

defineProps({
  sectionId: { type: String, default: 'contato' },
  index: { type: String, default: '05' },
  title: { type: String, default: 'Comece com uma conversa' },
  subtitle: {
    type: String,
    default:
      'A avaliação inicial é sem compromisso: você sai sabendo o que tem, o que custa e em quanto tempo resolve.',
  },
})

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const form = reactive({ name: '', phone: '', message: '' })
const sent = ref(false)

const rootRef = ref(null)
const infoRef = ref(null)
const formRef = ref(null)

const formWhatsAppHref = computed(() => {
  const lines = [
    clinic.whatsappDefaultMessage,
    '',
    `Nome: ${form.name || '—'}`,
    `Telefone: ${form.phone || '—'}`,
    `Mensagem: ${form.message || '—'}`,
  ]
  return useWhatsApp(clinic.whatsapp, lines.join('\n')).href
})

function onSubmit() {
  // Protótipo sem backend: confirma na tela e direciona para o WhatsApp.
  sent.value = true
}

useMotion(() => {
  revealStagger(infoRef.value, '.contact__list > div', { y: 24, stagger: 0.08 })
  revealStagger(formRef.value, '.field, .contact__actions', { y: 24, stagger: 0.08 })
}, rootRef)
</script>

<style scoped>
.contact__grid {
  display: grid;
  gap: clamp(2.5rem, 6vw, 5rem);
}

@media (min-width: 900px) {
  .contact__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
}

.contact__list {
  margin: 0;
  border-top: 1px solid var(--line);
}

.contact__list > div {
  display: grid;
  gap: 0.5rem;
  padding-block: clamp(1.1rem, 2.5vw, 1.6rem);
  border-bottom: 1px solid var(--line);
}

@media (min-width: 560px) {
  .contact__list > div {
    grid-template-columns: 8.5rem minmax(0, 1fr);
    gap: 1.5rem;
    align-items: baseline;
  }
}

.contact__list dt {
  margin: 0;
}

.contact__list dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  font-weight: 300;
  color: var(--paper);
  line-height: 1.4;
}

.contact__list a {
  border-bottom: 1px solid var(--line-strong);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.contact__list a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.contact__hour {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  font-size: 0.97rem;
  color: var(--paper-soft);
}

.contact__dots {
  flex: 1;
  border-bottom: 1px dotted var(--line-strong);
  transform: translateY(-0.25em);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
}

.contact__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact__sent {
  margin: 0;
  color: var(--mint);
}
</style>
